const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  users.push({ username, password });
  res.status(200).json({ message: "User successfully registered" });
});


// Get the book list available in the shop
public_users.get('/', (req, res) => {
  res.status(200).send(JSON.stringify(books, null, 4));
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  res.status(200).json(books[req.params.isbn]);
});

  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  let result = [];

  Object.values(books).forEach(book => {
    if (book.author.toLowerCase() === author) {
      result.push(book);
    }
  });

  res.status(200).json(result);
});


// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  let result = [];

  Object.values(books).forEach(book => {
    if (book.title.toLowerCase() === title) {
      result.push(book);
    }
  });

  res.status(200).json(result);
});


//  Get book review
public_users.get('/review/:isbn', (req, res) => {
  res.status(200).json(books[req.params.isbn].reviews);
});
// TASK 10
// Get all books using Promise / async-await
public_users.get('/async-books', async (req, res) => {
  try {
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        resolve(books);
      });
    };

    const bookList = await getBooks();
    return res.status(200).json(bookList);

  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});



module.exports.general = public_users;
