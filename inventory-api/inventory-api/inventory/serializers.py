from rest_framework import serializers

from .models import Category, InventoryChange, Item, Supplier


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ["id", "name", "email", "phone"]


class ItemSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    category_detail = CategorySerializer(source="category", read_only=True)
    supplier_detail = SupplierSerializer(source="supplier", read_only=True)

    class Meta:
        model = Item
        fields = [
            "id",
            "owner",
            "name",
            "description",
            "quantity",
            "price",
            "category",
            "supplier",
            "category_detail",
            "supplier_detail",
            "date_added",
            "last_updated",
        ]
        read_only_fields = ["id", "owner", "date_added", "last_updated"]

    def validate(self, attrs):
        name = attrs.get("name")
        if name is not None and not name.strip():
            raise serializers.ValidationError({"name": "Name is required."})
        if "quantity" in attrs and attrs["quantity"] < 0:
            raise serializers.ValidationError({"quantity": "Quantity cannot be negative."})
        price = attrs.get("price")
        if price is not None and price < 0:
            raise serializers.ValidationError({"price": "Price cannot be negative."})
        return attrs


class InventoryChangeSerializer(serializers.ModelSerializer):
    changed_by = serializers.ReadOnlyField(source="changed_by.username")

    class Meta:
        model = InventoryChange
        fields = [
            "id",
            "item",
            "old_quantity",
            "new_quantity",
            "delta",
            "reason",
            "changed_by",
            "changed_at",
        ]
        read_only_fields = ["id", "old_quantity", "new_quantity", "delta", "changed_by", "changed_at"]
