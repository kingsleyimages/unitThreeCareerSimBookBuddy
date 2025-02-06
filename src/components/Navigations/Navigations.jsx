/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigations.module.css';
import bookLogo from '../../assets/books.png';
function Navigations({ token, setToken }) {
  const handleClick = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  return (
    <div>
      <nav className={styles['navigation']}>
        <div className={styles['logo']}>
          <img id="logo-image" src={bookLogo} />
          Douglas County Library System
        </div>

        <ul className={styles['listContainer']}>
          <li className={styles['listItem']}>
            <Link to="/">Home</Link>
          </li>
          {!token && (
            <>
              <li className={styles['listItem']}>
                <Link to="/login">Login</Link>
              </li>
              <li className={styles['listItem']}>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
          {token && (
            <>
              <li className={styles['listItem']}>
                <Link to="/me">Account</Link>
              </li>
              <li className={styles['listItem']}>
                <button onClick={handleClick}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navigations;
