from django.contrib import admin

from .models import Category, InventoryChange, Item, Supplier


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "owner",
        "quantity",
        "price",
        "category",
        "supplier",
        "date_added",
        "last_updated",
    )
    search_fields = ("name", "description")
    list_filter = ("category", "supplier")


admin.site.register(InventoryChange)
admin.site.register(Category)
admin.site.register(Supplier)
