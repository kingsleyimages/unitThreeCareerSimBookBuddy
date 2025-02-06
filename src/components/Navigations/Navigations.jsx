/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigations.module.css';
import bookLogo from '../../assets/books.png';
import { useNavigate } from 'react-router-dom';

// create navigation Bar with links to Home, Login, Signup, Account, and Logout
function Navigations({ token, setToken }) {
  const navigate = useNavigate();

  // create a handle click to remove the token from local storage and set the token to null.  This will log the user out and navigate them to the home page.
  const handleClick = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
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
          {/* conditionally render the login and signup links based on if the user is logged in or not */}
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
          {/* conditionally render the account and logout links based on if the user is logged in or not */}
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
