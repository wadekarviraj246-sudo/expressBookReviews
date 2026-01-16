
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

/**
 * Register a new user
 */
public_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered" });
});

/**
 * Task 1: Get all books
 */
public_users.get('/', (req, res) => {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

/**
 * Task 2: Get book by ISBN
 */
public_users.get('/isbn/:isbn', (req, res) => {
  return res.status(200).json(books[req.params.isbn]);
});

/**
 * Task 3: Get books by author
 */
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  let result = [];

  Object.values(books).forEach(book => {
    if (book.author.toLowerCase() === author) {
      result.push(book);
    }
  });

  return res.status(200).json(result);
});

/**
 * Task 4: Get books by title
 */
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  let result = [];

  Object.values(books).forEach(book => {
    if (book.title.toLowerCase() === title) {
      result.push(book);
    }
  });

  return res.status(200).json(result);
});

/**
 * Task 5: Get book reviews
 */
public_users.get('/review/:isbn', (req, res) => {
  return res.status(200).json(books[req.params.isbn].reviews);
});

/**
 * =========================
 * TASK 10
 * Get all books using Promise / async-await
 * =========================
 */
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

/**
 * =========================
 * TASK 11
 * Get book details by ISBN using Promise / async-await
 * =========================
 */
public_users.get('/async-isbn/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;

    const getBookByISBN = (isbn) => {
      return new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject("Book not found");
        }
      });
    };

    const book = await getBookByISBN(isbn);
    return res.status(200).json(book);

  } catch (error) {
    return res.status(404).json({ message: error });
  }
});
/**
 * =========================
 * TASK 12
 * Get book details by Author using Promise / async-await
 * =========================
 */
public_users.get('/async-author/:author', async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();

    const getBooksByAuthor = (author) => {
      return new Promise((resolve, reject) => {
        const result = [];

        Object.values(books).forEach(book => {
          if (book.author.toLowerCase() === author) {
            result.push(book);
          }
        });

        if (result.length > 0) {
          resolve(result);
        } else {
          reject("No books found for this author");
        }
      });
    };

    const booksByAuthor = await getBooksByAuthor(author);
    return res.status(200).json(booksByAuthor);

  } catch (error) {
    return res.status(404).json({ message: error });
  }
});
/**
 * =========================
 * TASK 13
 * Get book details by Title using Promise / async-await
 * =========================
 */
public_users.get('/async-title/:title', async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();

    const getBooksByTitle = (title) => {
      return new Promise((resolve, reject) => {
        const result = [];

        Object.values(books).forEach(book => {
          if (book.title.toLowerCase() === title) {
            result.push(book);
          }
        });

        if (result.length > 0) {
          resolve(result);
        } else {
          reject("No books found with this title");
        }
      });
    };

    const booksByTitle = await getBooksByTitle(title);
    return res.status(200).json(booksByTitle);

  } catch (error) {
    return res.status(404).json({ message: error });
  }
});


module.exports.general = public_users;
