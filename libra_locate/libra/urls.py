from django.urls import path
from .views import index, BookList, search_books_view

urlpatterns = [
    path('', index, name='index'),
    path('api/libra/', BookList.as_view(), name='book-list'),
    path('api/search-books/', search_books_view, name='search-books'),
]