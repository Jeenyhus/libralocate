from django.contrib import admin
from .models import Book, Store, BookStore

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    """Admin class for Book model."""
    list_display = ('title', 'author', 'isbn', 'published_date')
    search_fields = ('title', 'author', 'isbn')

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    """
    Admin class for Store model.
    """
    list_display = ('name', 'url', 'address', 'phone')
    search_fields = ('name', 'url')

@admin.register(BookStore)
class BookStoreAdmin(admin.ModelAdmin):
    """
    Admin class for BookStore model.
    """
    list_display = ('book', 'store', 'price', 'availability')
    search_fields = ('book__title', 'store__name')
    list_filter = ('availability',)
