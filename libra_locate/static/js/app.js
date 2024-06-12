// Create a new Vue instance
new Vue({
    // Bind the Vue instance to the div element with id 'app'
    el: '#app',
    
    // Define the data properties for the Vue instance
    data: {
        // This will hold the user's search query
        query: '',
        // This will store the books retrieved from the API       
        books: [], 
        // This will hold any error messages that occur during the fetch      
        error: ''        
    },
    
    // Define the methods for the Vue instance
    methods: {
        // Method to search books based on the user's query
        searchBooks() {
            // Use the fetch API to get book data from the backend
            fetch(`/api/search-books/?query=${this.query}`)
                .then(response => response.json())  // Parse the JSON response
                .then(data => {
                    // Check if the backend returned an error
                    if (data.error) {
                        // Set the error message
                        this.error = data.error;  
                        // Clear the books array
                        this.books = [];          
                    } else {
                        // Set the books array to the items returned from the API
                        this.books = data.items || [];
                        // Clear any existing error messages
                        this.error = '';  
                    }
                })
                .catch(error => {
                    // Handle any errors that occur during the fetch
                    this.error = 'Error fetching book details';
                    console.error('Error:', error);
                });
        }
    },
    
    // Define the template for rendering the HTML
    template: `
        <div>
            <!-- Input field for the search query, bound to the 'query' data property -->
            <input v-model="query" placeholder="Search for books by title, genre, or author">
            
            <!-- Button to trigger the searchBooks method -->
            <button @click="searchBooks">Search</button>
            
            <!-- Display an error message if there is an error -->
            <div v-if="error" class="error">{{ error }}</div>
            
            <!-- Display the list of books if there are any -->
            <ul v-if="books.length">
                <!-- Loop through each book in the books array -->
                <li v-for="book in books" :key="book.id">
                    <!-- Display the book title or a fallback message -->
                    <h3>{{ book.volumeInfo.title || 'Title not available' }}</h3>
                    
                    <!-- Display the book description or a fallback message -->
                    <p>{{ book.volumeInfo.description || 'Description not available' }}</p>
                    
                    <!-- Display the authors, joining them with commas, or a fallback message -->
                    <p><strong>Authors:</strong> {{ book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Authors not available' }}</p>
                    
                    <!-- Display the publisher or a fallback message -->
                    <p><strong>Publisher:</strong> {{ book.volumeInfo.publisher || 'Publisher not available' }}</p>
                    
                    <!-- Display the published date or a fallback message -->
                    <p><strong>Published Date:</strong> {{ book.volumeInfo.publishedDate || 'Date not available' }}</p>
                    
                    <!-- Display the book cover image if available, otherwise a fallback message -->
                    <img :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'No image available'" alt="Cover Image">
                    
                    <!-- Display the buy link if available, otherwise a fallback message -->
                    <p><strong>Buy Link:</strong> 
                        <a :href="book.saleInfo && book.saleInfo.buyLink ? book.saleInfo.buyLink : '#'" target="_blank" v-if="book.saleInfo && book.saleInfo.buyLink">Buy here</a>
                        <span v-else>Not available</span>
                    </p>
                    
                    <!-- Display the viewability status or a fallback message -->
                    <p><strong>Viewability:</strong> {{ book.accessInfo.viewability || 'Viewability not available' }}</p>
                    
                    <!-- Display the web reader link if available, otherwise a fallback message -->
                    <p><strong>Web Reader Link:</strong> 
                        <a :href="book.accessInfo && book.accessInfo.webReaderLink ? book.accessInfo.webReaderLink : '#'" target="_blank" v-if="book.accessInfo && book.accessInfo.webReaderLink">Read here</a>
                        <span v-else>Not available</span>
                    </p>
                </li>
            </ul>
        </div>
    `
});
