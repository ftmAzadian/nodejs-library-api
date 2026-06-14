
class Member {
  constructor(name, membershipID) {
      if (!name || !membershipID) {
          throw new Error("We need both name and membershipID to create a member.");
      }

      this.name = name;
      this.membershipID = membershipID;
      this.borrowedBooks = [];
  }

  borrowBook(isbn) {
      if (!isbn) {
          throw new Error("We need a correct ISBN to borrow a book.");
      }
      if (this.borrowedBooks.includes(isbn)) {
          throw new Error("Already borrowed");
      }
      this.borrowedBooks.push(isbn);
  }

  returnBook(isbn) {
    if (!isbn) {
        throw new Error("We need a correct ISBN to return a book.");
    }
    const index = this.borrowedBooks.findIndex(book => book.isbn === isbn);
    if (index === -1) {
        throw new Error("we didn't borrow this ISBN");
    }

    // Return the book object
    return this.borrowedBooks.splice(index, 1)[0];
}

  displayBorrowedBooks() {
      if (this.borrowedBooks.length === 0) {
          return "No book borrowed!!";
      }
      return `Borrowed Books: ${this.borrowedBooks.join(', ')}`;
  }
}

module.exports = Member;
