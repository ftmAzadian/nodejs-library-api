const Book = require('./classes/Book');
const Member = require('./classes/Member');

const library = {
  books: [
      new Book("The Great Gatsby", "F. Scott Fitzgerald", "12345890"),
      new Book("1984", "George Orwell", "0987321"),
      new Book("MyLove", "Marosh Da", "6984521"),
  ],
  members: [
      new Member("Sara Doe", "001"),
      new Member("Edward Bolton", "002"),
  ],

    addBook: function(title, author, isbn) {
        if (this.books.some(book => book.isbn === isbn)) {
            throw new Error("A book with this ISBN already exists.");
        }
        const newBook = new Book(title, author, isbn);
        this.books.push(newBook);
    },

    addMember: function(name, membershipID) {
        if (this.members.some(member => member.membershipID === membershipID)) {
            throw new Error("A member with this membership ID already exists.");
        }
        const newMember = new Member(name, membershipID);
        this.members.push(newMember);
    },

    findBookByISBN: function(isbn) {
        const book = this.books.find(book => book.isbn === isbn);
        if (!book) {
            throw new Error("No book found with this ISBN.");
        }
        return book;
    },

    borrowBook: function(membershipID, isbn) {
        const member = this.members.find(m => m.membershipID === membershipID);
        const book = this.books.find(b => b.isbn === isbn);

        if (!member || !book) {
            throw new Error("Member or book not found.");
        }

        member.borrowBook(book);
        this.books = this.books.filter(b => b.isbn !== isbn); // Remove the book from library
    },

    returnBook: function(membershipID, isbn) {
        const member = this.members.find(m => m.membershipID === membershipID);
        if (!member) {
            throw new Error("Member not found.");
        }

        const returnedBook = member.returnBook(isbn);
        if (returnedBook) {
            this.books.push(returnedBook); // Add the book back to the library
        } else {
            throw new Error("Error returning the book.");
        }
    },

    displayMemberBorrowedBooks: function(membershipID) {
      const member = this.members.find(member => member.membershipID === membershipID);
      if (!member) {
        throw new Error("Member not found.");
      }
      return {
          name: member.name,
          membershipID: member.membershipID,
          borrowedBooks: member.borrowedBooks
      };
    }
};

module.exports = library;