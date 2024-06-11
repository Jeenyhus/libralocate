import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def fetch_book_details(query):
    api_key = os.getenv('GOOGLE_BOOKS_API')
    url = f'https://www.googleapis.com/books/v1/volumes?q={query}&key={api_key}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

def get_book_availability(book):
    sale_info = book.get('saleInfo', {})
    access_info = book.get('accessInfo', {})

    buy_link = sale_info.get('buyLink', 'Not available')
    viewability = access_info.get('viewability', 'No preview available')
    web_reader_link = access_info.get('webReaderLink', 'Not available')

    return {
        'buy_link': buy_link,
        'viewability': viewability,
        'web_reader_link': web_reader_link
    }

def print_book_details(book):
    volume_info = book.get('volumeInfo', {})
    title = volume_info.get('title', 'Title not available')
    authors = volume_info.get('authors', ['Author not available'])
    description = volume_info.get('description', 'Description not available')
    publisher = volume_info.get('publisher', 'Publisher not available')
    published_date = volume_info.get('publishedDate', 'Date not available')
    page_count = volume_info.get('pageCount', 'Page count not available')
    categories = volume_info.get('categories', ['Category not available'])
    
    print(f"Title: {title}")
    print(f"Authors: {', '.join(authors)}")
    print(f"Description: {description}")
    print(f"Publisher: {publisher}")
    print(f"Published Date: {published_date}")
    print(f"Page Count: {page_count}")
    print(f"Categories: {', '.join(categories)}")
    
    availability = get_book_availability(book)
    print("Availability:")
    print(f"Buy Link: {availability['buy_link']}")
    print(f"Viewability: {availability['viewability']}")
    print(f"Web Reader Link: {availability['web_reader_link']}")
    
    print("\n")

def main():
    print("Search for books by title, genre, or author.")
    search_type = input("Search by (title/genre/author): ").strip().lower()
    query = input(f"Enter the book {search_type}: ").strip()
    
    search_query = f"{search_type}:{query}"
    result = fetch_book_details(search_query)
    
    if result:
        items = result.get('items', [])
        if items:
            for book in items[:5]:  # Show the top 5 results
                print_book_details(book)
            
            # Showing related books based on the first book in the list
            related_books_query = f"related:{items[0]['id']}"
            related_result = fetch_book_details(related_books_query)
            related_items = related_result.get('items', [])
            if related_items:
                print("Related Books:")
                # Show the top 5 related books
                for book in related_items[:15]:
                    print_book_details(book)
            else:
                print("No related books found.")
        else:
            print("No results found.")
    else:
        print("Error fetching book details.")
    
if __name__ == "__main__":
    main()
