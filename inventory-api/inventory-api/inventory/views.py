from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response

from .models import Category, InventoryChange, Item, Supplier
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    CategorySerializer,
    InventoryChangeSerializer,
    ItemSerializer,
    SupplierSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all().order_by("name")
    serializer_class = SupplierSerializer
    permission_classes = [permissions.IsAuthenticated]


class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["category"]
    search_fields = ["name", "description"]
    ordering_fields = ["name", "quantity", "price", "date_added"]
    ordering = ["name"]

    def get_queryset(self):
        return Item.objects.select_related("owner", "category", "supplier")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated])
    def levels(self, request):
        queryset = self.get_queryset()
        category = request.query_params.get("category")
        min_price = request.query_params.get("min_price")
        max_price = request.query_params.get("max_price")
        low_stock = request.query_params.get("low_stock")

        if category:
            queryset = queryset.filter(category_id=category)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if low_stock is not None:
            try:
                threshold = int(low_stock)
            except (TypeError, ValueError):
                threshold = None
            if threshold is not None:
                queryset = queryset.filter(quantity__lt=threshold)

        page = self.paginate_queryset(queryset)
        data = [
            {"id": item.id, "name": item.name, "quantity": item.quantity, "price": str(item.price)}
            for item in (page or queryset)
        ]
        if page is not None:
            return self.get_paginated_response(data)
        return Response(data)

    @action(detail=True, methods=["get"], permission_classes=[permissions.IsAuthenticated])
    def changes(self, request, pk=None):
        item = self.get_object()
        queryset = item.changes.all()
        page = self.paginate_queryset(queryset)
        serializer = InventoryChangeSerializer(page or queryset, many=True)
        if page is not None:
            return self.get_paginated_response(serializer.data)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def adjust(self, request, pk=None):
        item = self.get_object()
        self.check_object_permissions(request, item)

        try:
            delta = int(request.data.get("delta"))
        except (TypeError, ValueError):
            return Response({"detail": "delta must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

        reason = request.data.get("reason", "")

        with transaction.atomic():
            old_quantity = item.quantity
            new_quantity = old_quantity + delta
            if new_quantity < 0:
                return Response(
                    {"detail": "Resulting quantity cannot be negative"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            item.quantity = new_quantity
            item.save(update_fields=["quantity", "last_updated"])
            InventoryChange.objects.create(
                item=item,
                old_quantity=old_quantity,
                new_quantity=new_quantity,
                delta=delta,
                reason=reason,
                changed_by=request.user,
            )

        data = {
            "id": item.id,
            "old_quantity": old_quantity,
            "new_quantity": new_quantity,
            "delta": delta,
            "reason": reason,
        }
        return Response(data, status=status.HTTP_201_CREATED)
