```
# LibraLocate App

## Overview

The LibraLocate App is a web application that allows users to search for books by title, genre, or author using the Google Books API. The frontend is built using Vue.js, providing a dynamic and responsive user interface.

## Features

- Search for books by title, genre, or author.
- Display detailed information about each book, including title, authors, description, publisher, published date, and cover image.
- Provide links to buy or read the book online if available.
- Handle errors and missing data gracefully.

## Technologies Used

- **Frontend**: Vue.js
- **Backend**: Python, Django
- **API**: Google Books API

## Installation

### Prerequisites

- Python 3.11
- pip (Python package installer)
- Vue CLI (optional, for advanced development)

### Clone the Repository

```bash
git clone git@github.com:Jeenyhus/libralocate.git
cd libralocate
```

### Backend Setup

1. **Create a virtual environment** (optional but recommended):

    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

2. **Install the required Python packages**:

    ```bash
    pip install -r requirements.txt
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add your Google Books API key:

    ```
    GOOGLE_BOOKS_API=your_google_books_api_key
    ```

4. **Apply migrations**:

    ```bash
    python manage.py migrate
    ```

5. **Run the Django development server**:

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. **Navigate to the `static` directory**:

    ```bash
    cd static
    ```

## Usage

1. Open your browser and navigate to `http://localhost:8000` to access the LibraLocate App.
2. Enter a search query (title, genre, or author) in the input field and click the "Search" button.
3. Browse through the search results to see detailed information about each book.
4. Click on available links to buy or read the book online.


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Django](https://www.djangoproject.com/)
- [Google Books API](https://developers.google.com/books/docs/overview)
```