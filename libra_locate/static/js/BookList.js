
Vue.component('book-list', {
    template: `
      <div>
        <h1>Book List</h1>
        <ul>
          <li v-for="book in books" :key="book.id">
            {{ book.title }} by {{ book.authors }}
          </li>
        </ul>
      </div>
    `,
    data() {
        return {
            books: []
        };
    },
    created() {
        fetch('/api/libra/')
            .then(response => response.json())
            .then(data => {
                this.books = data;
            });
    }
});
