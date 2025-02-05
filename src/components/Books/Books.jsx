/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Books.css';
import { useNavigate } from 'react-router-dom';

function Books() {
  let navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState([]);
  async function getBooks() {
    try {
      // use environment variable (vite specific syntax) to access the API base URL in ``
      const data = await axios(`${import.meta.env.VITE_API_BASE_URL}/books`);
      setBooks(data.data.books);
      setFilter(data.data.books);
      console.log(books);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getBooks();
  }, []);

  const handleInput = (e) => {
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        book.author.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilter(results);
  };

  return (
    <div className="books">
      <form>
        <label>
          Search:
          <input type="text" onChange={handleInput} />
        </label>
      </form>
      {filter.map((book) => (
        <div key="book.id" className="singleBook">
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <img src={book.coverimage} alt={book.title} />
          <button
            onClick={() => {
              navigate(`/book/detail/${book.id}`);
            }}>
            Book Details
          </button>
        </div>
      ))}
    </div>
  );
}
export default Books;
