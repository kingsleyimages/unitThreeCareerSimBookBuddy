/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigations.css';
import bookLogo from '../../assets/books.png';
function Navigations() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <img id="logo-image" src={bookLogo} />
            Library<br />App
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigations;
