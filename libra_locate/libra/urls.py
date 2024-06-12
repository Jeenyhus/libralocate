from django.urls import path
from .views import index, BookList, search_books_view, initial_books, filter_books_by_category

urlpatterns = [
    path('', index, name='index'),
    path('api/libra/', BookList.as_view(), name='book-list'),
    path('api/search-books/', search_books_view, name='search-books'),
    path('api/initial-books/', initial_books, name='initial_books'),
    path('api/filter-books/', filter_books_by_category, name='filter_books_by_category'),
]