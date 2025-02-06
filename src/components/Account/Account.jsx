/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './account.module.css';

function Account({}) {
  const [userData, setUserData] = useState([]);
  const [available, setAvailable] = useState([]);

  // function to get the user information from the user API.  This will be used to display the user's name and email.
  async function user() {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        {
          headers: {
            // pass the token from local storage to the API to authenticate the user and get the user information
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setUserData(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  // async function to get the books that have been checked out by the user.  This will be used to display the books that the user has checked out.
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

      setAvailable(data.data.reservation);
    } catch (err) {
      console.log(err);
    }
  }
  // function for the button to return the book.  This will be used to return the book to the list of available books.
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
      // await the call for get reservations to update the state and rerender the page
      await getReservations();
      
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
      {/* check to see if there are books that have been checked out by the user */}
      {available.length > 0 ? (
        // map over the books that have been checked out by the user and display them
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
          // if no books have been checked out display a message
        <p className={styles['noBooks']}>You have no books checked out</p>
      )}
    </>
  );
}
export default Account;
