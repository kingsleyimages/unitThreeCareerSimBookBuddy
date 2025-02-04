/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Books.css';

function Books() {
  const [books, setBooks] = useState([]);
  async function getBooks() {
    try {
      const data = await axios(
        'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books'
      );
      setBooks(data.data.books);
      console.log(books);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="books">
      {books.map((book) => (
        <div key="book.id" className="singleBook">
          <h3>{book.title}</h3>
          <img src={book.coverimage} alt={book.title} />
        </div>
      ))}
    </div>
  );
}
export default Books;
