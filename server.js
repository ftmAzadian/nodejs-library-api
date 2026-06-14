const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

const library = require('./src/library');

app.post('/addBook', (req, res) => {
    try {
        const { title, author, isbn } = req.body;
        library.addBook(title, author, isbn);
        res.status(201).send('Book added successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/addMember', (req, res) => {
    try {
        const { name, membershipID } = req.body;
        library.addMember(name, membershipID);
        res.status(201).send('Member added successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/books', (req, res) => {
    try {
        if (library.books.length === 0) {
            return res.status(404).json({ message: 'No books available.' });
        }
        res.json(library.books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/borrowBook', (req, res) => {
    try {
        const { membershipID, isbn } = req.body;
        library.borrowBook(membershipID, isbn);
        res.send('Book borrowed successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/returnBook', (req, res) => {
    try {
        const { membershipID, isbn } = req.body;
        library.returnBook(membershipID, isbn);
        res.send('Book returned successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/member/:id', (req, res) => {
    try {
        const membershipID = req.params.id;
        const memberDetails = library.displayMemberBorrowedBooks(membershipID);
        if (!memberDetails) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(memberDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
