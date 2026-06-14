# 📚 Library Management System (Node.js)

A full-stack **Library Management System** built using **Node.js, Express, and JavaScript**.
This project allows users to manage books, members, borrowing, and returning operations through a RESTful API and a simple front-end interface.

---

## 🚀 Features

* 📖 Add new books to the library
* 🔍 Search books by ISBN
* 👤 Create and manage members
* 📚 Borrow books
* 🔄 Return books
* ⚠️ Error handling (invalid actions, missing books, etc.)
* 🌐 RESTful API with Express
* 💻 Simple front-end interface (HTML, CSS, JS)

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* JavaScript (ES6)
* HTML5
* CSS3

---

## 📁 Project Structure

```
nodejs-library-api/
│
├── server.js
├── package.json
├── src/
│   ├── library.js
│   └── classes/
│       ├── Book.js
│       └── Member.js
│
├── public/
│   ├── index.html
│   ├── css/
│   └── js/
```

---

## ⚙️ Installation & Run

1. Clone the repository:

```
git clone https://github.com/ftmAzadian/nodejs-library-api.git
```

2. Install dependencies:

```
npm install
```

3. Run the server:

```
node server.js
```

4. Open in browser:

```
http://localhost:3000
```

---

## 📡 API Endpoints

* `POST /addBook` → Add a new book
* `GET /books` → Get all books
* `POST /borrowBook` → Borrow a book
* `POST /returnBook` → Return a book
* `GET /member` → Get member details

---

## 🎯 Project Purpose

This project was developed as a **university assignment** to demonstrate:

* Object-Oriented Programming in JavaScript
* Backend development with Node.js
* API design using Express
* Front-end and back-end integration

---

## 👤 Author

* GitHub: https://github.com/ftmAzadian

---

## 📄 License

This project is licensed under the MIT License.
