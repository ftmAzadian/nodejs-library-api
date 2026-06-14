document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('book-form')) {
        document.getElementById('book-form').addEventListener('submit', function(e) {
            e.preventDefault();
            addBook();
        });
    }

    if (document.getElementById('member-form')) {
        document.getElementById('member-form').addEventListener('submit', function(e) {
            e.preventDefault();
            addMember();
        });
    }

    if (document.getElementById('borrow-form')) {
        document.getElementById('borrow-form').addEventListener('submit', function(e) {
            e.preventDefault();
            borrowBook();
        });
    }

    if (document.getElementById('return-form')) {
        document.getElementById('return-form').addEventListener('submit', function(e) {
            e.preventDefault();
            returnBook();
        });
    }

    if (document.getElementById('get-member-details')) {
        document.getElementById('get-member-details').addEventListener('click', function() {
            const memberID = document.getElementById('member-detail-id').value;
            getMemberDetails(memberID);
        });
    }

    if (document.getElementById('books-container-table')) {
        fetchAndDisplayBooks();
    }
});

function clearFormInputs(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  fetch('http://localhost:3000/addBook', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, isbn }),
  })
  .then(response => response.text())
  .then(data => { alert(data);
    clearFormInputs('book-form');})
  .catch(error => alert('Error adding book: ' + error));
}

function addMember() {
  const name = document.getElementById('name').value;
  const membershipID = document.getElementById('membershipID').value;

  fetch('http://localhost:3000/addMember', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, membershipID }),
  })
  .then(response => response.text())
  .then(data => { alert(data);
    clearFormInputs('member-form');})
  .catch(error => alert('Error adding member: ' + error));
}

function borrowBook() {
  const memberID = document.getElementById('borrow-memberID').value;
  const isbn = document.getElementById('borrow-isbn').value;

  fetch('http://localhost:3000/borrowBook', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ membershipID: memberID, isbn }),
  })
  .then(response => response.text())
  .then(data => { alert(data);
    clearFormInputs('borrow-form');})
  .catch(error => alert('Error borrowing book: ' + error));
}

function returnBook() {
  const memberID = document.getElementById('return-memberID').value;
  const isbn = document.getElementById('return-isbn').value;

  fetch('http://localhost:3000/returnBook', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ membershipID: memberID, isbn }),
  })
  .then(response => response.text())
  .then(data => { alert(data);
    clearFormInputs('return-form');})
  .catch(error => alert('Error returning book: ' + error));
}

function getMemberDetails(memberID) {
    fetch(`http://localhost:3000/member/${memberID}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Member not found');
        }
        return response.json();
    })
    .then(data => {
        const detailsDiv = document.getElementById('details');
        detailsDiv.innerHTML = '';
  
        const nameElement = document.createElement('p');
        nameElement.textContent = `Name: ${data.name}`;
        detailsDiv.appendChild(nameElement);
  
        const membershipIDElement = document.createElement('p');
        membershipIDElement.textContent = `Membership ID: ${data.membershipID}`;
        detailsDiv.appendChild(membershipIDElement);
  
        // Extracting and displaying only the ISBNs of the borrowed books
        const borrowedBooksIsbns = data.borrowedBooks.map(book => book.isbn).join(', ');
        const borrowedBooksElement = document.createElement('p');
        borrowedBooksElement.textContent = `Borrowed Books: ${borrowedBooksIsbns}`;
        detailsDiv.appendChild(borrowedBooksElement);
        document.getElementById('member-detail-id').value = '';
    })
    .catch(error => {
        alert('Error fetching member details: ' + error);
        console.log(error);
        const detailsDiv = document.getElementById('details');
        detailsDiv.innerHTML = '';
    });
}



function fetchAndDisplayBooks() {
    fetch('http://localhost:3000/books')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        return response.json();
    })
    .then(data => {
        displayBooks(data);
    })
    .catch(error => {
        console.error('Error fetching books:', error);
        alert(error.message);
    });
}

function displayBooks(books) {
    const container = document.getElementById('books-container-table');

    const table = document.createElement('table');
    table.className = 'table table-responsive table-hover';

    const thead = document.createElement('thead');
    thead.style.cssText += 'color: bisque !important';
    const headerRow = document.createElement('tr');
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Book Name';
    const authorHeader = document.createElement('th');
    authorHeader.textContent = 'author';
    const isbnHeader = document.createElement('th');
    isbnHeader.textContent = 'ISBN';
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(authorHeader);
    headerRow.appendChild(isbnHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    books.forEach(book => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = book.title;
        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        const isbnCell = document.createElement('td');
        isbnCell.textContent = book.isbn;
        row.appendChild(nameCell);
        row.appendChild(authorCell);
        row.appendChild(isbnCell);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);
}





