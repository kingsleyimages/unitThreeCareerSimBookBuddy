/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './account.module.css';

function Account({}) {
  const [userData, setUserData] = useState([]);
  const [available, setAvailable] = useState([]);

  async function user() {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(data.data);
      setUserData(data.data);
      // setAvailable(data.data.books);
    } catch (err) {
      console.log(err);
    }
  }

  async function getReservations() {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/reservations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(available);
      setAvailable(data.data.reservation);
      console.log(available);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleReturn(bookId) {
    try {
      const data = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/reservations/${bookId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(data);
      await getReservations();
      // take book we returned out of state (available array)
      // setAvailable(available.filter((book) => book.id !== bookId));
    } catch (err) {
      console.log(err);
      a;
    }
  }
  useEffect(() => {
    user();
    getReservations();
  }, []);

  return (
    <>
      <div className={styles['userdata']}>
        <h2 className={styles['username']}>
          Welcome {userData.firstname} {userData.lastname}!
        </h2>
        <h3 className={styles['userEmail']}>{userData.email}</h3>
      </div>
      <h3 className={styles['title']}>Checked out books:</h3>
      {available.length > 0 ? (
        available.map((book) => (
          <div key={book.id}>
            <div className={styles['bookList']}>
              <button
                className={styles['returnBtn']}
                onClick={() => {
                  handleReturn(book.id);
                }}>
                Return
              </button>
              <h3 className={styles['bookInformation']}>
                {book.title}
                {', '} {book.author}{' '}
              </h3>
            </div>
          </div>
        ))
      ) : (
        <p className={styles['noBooks']}>You have no books checked out</p>
      )}
    </>
  );
}
export default Account;
