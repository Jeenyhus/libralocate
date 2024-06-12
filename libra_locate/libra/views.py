from django.shortcuts import render
from rest_framework import generics
from .models import Book
from .serializers import BookSerializer
from django.http import JsonResponse
from .utils import fetch_book_details

class BookList(generics.ListCreateAPIView):
    """
    API endpoint that allows books to be viewed or edited.
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializer

def index(request):
    """
    Renders the main Vue.js application.
    """
    return render(request, 'index.html')

def search_books_view(request):
    query = request.GET.get('query')
    if not query:
        return JsonResponse({'error': 'No query provided'}, status=400)
    
    result = fetch_book_details(query)
    if result:
        return JsonResponse(result)
    else:
        return JsonResponse({'error': 'Failed to fetch book details'}, status=500)

def initial_books(request):
    books = Book.objects.all().values('title', 'author', 'categories')
    return JsonResponse({'books': list(books)})

def filter_books_by_category(request):
    category = request.GET.get('category')
    if category:
        # Filter books by category
        books = Book.objects.filter(categories__icontains=category)
        # Serialize books data as JSON
        books_data = [{'title': book.title, 'author': book.author, 'description': book.description} for book in books]
        return JsonResponse({'items': books_data})
    else:
        return JsonResponse({'error': 'Category parameter is missing'}, status=400)