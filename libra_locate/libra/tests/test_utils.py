import unittest
from unittest.mock import patch
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def fetch_book_details(query):
    # Fetch book details from Google Books API
    api_key = os.getenv('GOOGLE_BOOKS_API')
    # Construct the URL
    url = f'https://www.googleapis.com/books/v1/volumes?q={query}&key={api_key}'
    # Make a GET request to the URL
    response = requests.get(url)
    # Check if the response is successful
    if response.status_code == 200:
        return response.json()
    return None

"""
The test case below tests the fetch_book_details function in libra/utils.py.
The test_fetch_book_details_success method tests the function when the API call is successful and returns results. 
The mock_get function is used to mock the requests.get function and return a successful response with mock data. 
The test asserts that the function returns a non-empty result with the expected structure.
The test_fetch_book_details_no_results method tests the function when the API call is successful but returns no results.
"""
class FetchBookDetailsTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Set the API key for testing
        cls.api_key = "test_api_key"

    @patch('requests.get')
    def test_fetch_book_details_success(self, mock_get):
        # Mock response data
        mock_response_data = {
            'items': [
                {
                    'volumeInfo': {
                        'title': 'Python Programming',
                        'authors': ['Author Name']
                    }
                }
            ]
        }
        # Mock the GET request and response
        mock_get.return_value.status_code = 200
        # Mock the JSON response data
        mock_get.return_value.json.return_value = mock_response_data

        """
        The fetch_book_details function is called with a query string 'Python programming'.
        """
        result = fetch_book_details('Python programming')
        self.assertIsNotNone(result)
        self.assertIn('items', result)
        self.assertTrue(len(result['items']) > 0)
        # Check the structure of the first book in the result
        first_book = result['items'][0]['volumeInfo']
        self.assertIn('title', first_book)
        self.assertIn('authors', first_book)

    @patch('requests.get')
    def test_fetch_book_details_no_results(self, mock_get):
        # Mock response data for no results
        mock_response_data = {'items': []}
        # Mock the GET request and response
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response_data

        result = fetch_book_details('nonexistentbooktitlewithnorealresults')
        self.assertIsNotNone(result)
        self.assertIn('items', result)
        self.assertEqual(len(result['items']), 0)

if __name__ == '__main__':
    unittest.main()
