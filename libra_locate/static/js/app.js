// Create a new Vue instance
new Vue({
    // Bind the Vue instance to the div element with id 'app'
    el: '#app',
    
    // Define the data properties for the Vue instance
    data:  {
        query: '',
        books: [],
        error: '',
        selectedCategory: '',
        categories: ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Biography', 'Fantasy'],
        sortBy: '', // Store the selected sorting criteria
        sortOptions: [ // Define the available sorting options
            { value: 'title', text: 'Title' },
            { value: 'author', text: 'Author' },
            { value: 'publishedDate', text: 'Publication Date' }, 
            { value: 'rating', text: 'Rating' }
        ],
        searching: false
    },
    methods: {
        searchBooks() {
            this.searching = true;
            fetch(`/api/search-books/?query=${this.query}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        this.error = data.error;
                        this.books = [];
                    } else {
                        this.books = data.items || [];
                        this.error = '';
                    }
                })
                .catch(error => {
                    this.error = 'Error fetching book details';
                    console.error('Error:', error);
                })
                .finally(() => {
                    this.searching = false;
                });
        },
        getThumbnailUrl(book) {
            return book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://').replace('&edge=curl', '') : 'https://via.placeholder.com/128x192?text=No+Image';
        },
        fetchInitialBooks() {
            fetch('/api/initial-books')
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        this.error = data.error;
                        this.books = [];
                    } else {
                        this.books = data.items || [];
                        this.error = '';
                    }
                })
                .catch(error => {
                    this.error = 'Error fetching initial books';
                    console.error('Error:', error);
                });
        },
        filterByCategory() {
            if (this.selectedCategory) {
                fetch(`/api/filter-books/?category=${this.selectedCategory}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            this.error = data.error;
                            this.books = [];
                        } else {
                            this.books = data.items || [];
                            this.error = '';
                        }
                    })
                    .catch(error => {
                        this.error = 'Error fetching filtered books';
                        console.error('Error:', error);
                    });
            } else {
                this.fetchInitialBooks();
            }
        },
        sortBooks() {
            if (this.sortBy === 'title') {
                this.books.sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
            } else if (this.sortBy === 'author') {
                this.books.sort((a, b) => a.volumeInfo.authors[0].localeCompare(b.volumeInfo.authors[0]));
            } else if (this.sortBy === 'publishedDate') {
                this.books.sort((a, b) => new Date(a.volumeInfo.publishedDate) - new Date(b.volumeInfo.publishedDate));
            } else if (this.sortBy === 'rating') {
                this.books.sort((a, b) => (a.volumeInfo.averageRating || 0) - (b.volumeInfo.averageRating || 0));
            }
        }
    },
    created() {
        this.fetchInitialBooks();
    },
    
    // Define the template for rendering the HTML
    template: `
                <div id="app" class="container mt-5">
                    <h2 class="text-center mb-4">LibraLocate</h2>
                    
                    <!-- Search form with loading indicator -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-md-6">
                            <div class="input-group">
                                <input v-model="query" @keyup.enter="searchBooks" class="form-control" placeholder="Search for books by title, genre, or author">
                                <div class="input-group-append">
                                    <button @click="searchBooks" class="btn btn-primary" :disabled="searching">
                                        <span v-if="searching" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span v-else>Search</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Category filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-md-4">
                            <select v-model="selectedCategory" @change="filterByCategory" class="form-control">
                                <option value="">All Categories</option>
                                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Sorting options -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-md-4">
                            <select v-model="sortBy" @change="sortBooks" class="form-control">
                                <option value="" disabled selected>Sort by</option>
                                <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Display an error message if there is an error -->
                    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>
                    
                    <!-- Display the list of books if there are any -->
                    <div v-if="books.length" class="row">
                        <div v-for="book in books" :key="book.id" class="col-md-4 mb-4">
                            <div class="card h-100">
                                <img :src="getThumbnailUrl(book)" class="card-img-top" alt="Cover Image">
                                <div class="card-body">
                                    <h5 class="card-title">{{ book.volumeInfo.title || 'Title not available' }}</h5>
                                    <p class="card-text">{{ book.volumeInfo.description || 'Description not available' }}</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><strong>Authors:</strong> {{ book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Authors not available' }}</li>
                                    <li class="list-group-item"><strong>Categories:</strong> {{ book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Categories not available' }}</li>
                                    <li class="list-group-item"><strong>Publisher:</strong> {{ book.volumeInfo.publisher || 'Publisher not available' }}</li>
                                    <li class="list-group-item"><strong>Published Date:</strong> {{ book.volumeInfo.publishedDate || 'Date not available' }}</li>
                                </ul>
                                <div class="card-body">
                                    <a :href="book.saleInfo && book.saleInfo.buyLink ? book.saleInfo.buyLink : '#'" target="_blank" class="btn btn-primary mr-2" v-if="book.saleInfo && book.saleInfo.buyLink">Buy</a>
                                    <a :href="book.accessInfo && book.accessInfo.webReaderLink ? book.accessInfo.webReaderLink : '#'" target="_blank" class="btn btn-secondary" v-if="book.accessInfo && book.accessInfo.webReaderLink">Read</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center">
                        <p class="text-muted">No books found.</p>
                    </div>
                </div>

    `
});
