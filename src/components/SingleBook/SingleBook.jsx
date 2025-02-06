/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styles from './SingleBook.module.css';

function SingleBook({}) {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await axios(
          `${import.meta.env.VITE_API_BASE_URL}/books/${id}`
        );
        console.log(data.data.book);
        setBook(data.data.book);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, []);
  return (
    <div className={styles['container']}>
      <div className={styles['singleImages']}>
        <img src={book?.coverimage} alt={book?.name} />
      </div>
      <div className={styles['singleDetails']}>
        <h2 className={styles['title']}>{book?.title} </h2>
        <h4 className={styles['author']}>{book?.author}</h4>

        <p className={styles['description']}>{book?.description}</p>
        <h5 className={styles['available']}>
          {book?.available === true
            ? 'Status: Available for Checkout'
            : 'Status: Out on Loan'}
        </h5>
        <button className={styles['returnButton']}>
          <Link to="/"> Return to Book List</Link>
        </button>
      </div>
    </div>
  );
}

export default SingleBook;
