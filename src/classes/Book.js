
class Book {
  constructor(title, author, isbn) {
      if (!title || !author || !isbn) {
          throw new Error("All fields (title, author, isbn) are required to create a book.");
      }
      this.title = title;
      this.author = author;
      this.isbn = isbn;
  }

  displayInfo() {
      return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}`;
  }
}

module.exports = Book;
