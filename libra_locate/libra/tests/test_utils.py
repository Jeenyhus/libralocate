import unittest
from libra.utils import fetch_book_details

class FetchBookDetailsRealAPITestCase(unittest.TestCase):
    def setUp(self):
        # Using our actual API key here from the .env file
        self.api_key = 'AIzaSyDuDQyf-seKiNg_mu51cgomG6v82fFBbcY'

    def test_fetch_book_details_success(self):
        # Test with a real book title
        result = fetch_book_details('Python programming', self.api_key)
        # Check if the result is not none
        self.assertIsNotNone(result)
        # Check if the results contain the 'items' key
        self.assertIn('items', result)
        # Check if the number of items is greater than 0
        self.assertTrue(len(result['items']) > 0)
        # Check if the first_name contains the 'volumeInfo' key
        first_book = result['items'][0]['volumeInfo']
        # Check if the first book contains the 'title' and 'authors' keys
        self.assertIn('title', first_book)
        self.assertIn('authors', first_book)

    def test_fetch_book_details_no_results(self):
        # Test with a nonexistent book title
        result = fetch_book_details('nonexistentbooktitlewithnorealresults', self.api_key)
        # Check if the result is not none
        self.assertIsNotNone(result)
        self.assertIn('items', result)
        # Check if the number of items is 0
        self.assertEqual(len(result['items']), 0)

if __name__ == '__main__':
    unittest.main()

