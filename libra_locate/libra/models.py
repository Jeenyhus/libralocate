from django.db import models

class Book(models.Model):
    """
    Model representing a book.
    
    Attributes:
    title (str): The title of the book.
    author (str): The author of the book.
    isbn (str): The ISBN of the book.
    description (str): The description of the book.
    published_date (date): The published date of the book.
    cover_image (str): The URL of the cover image of the book.
    
    """
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    description = models.TextField(null=True, blank=True)
    published_date = models.DateField(null=True, blank=True)
    cover_image = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title

class Store(models.Model):
    """
    Model representing a store.
    
    Attributes:
    name (str): The name of the store.
    url (str): The URL of the store.
    address (str): The address of the store.
    phone (str): The phone number of the store.
    
    """
    name = models.CharField(max_length=255)
    url = models.URLField()
    address = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.name

class BookStore(models.Model):
    """
    Model representing a book store.
    
    Attributes:
    book (Book): The book available in the store.
    store (Store): The store where the book is available.
    price (Decimal): The price of the book in the store.
    availability (bool): The availability of the book in the store.
    """
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.book.title} at {self.store.name}"
