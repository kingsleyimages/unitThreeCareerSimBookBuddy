/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

// use the setToken state from app.jsx to set the token in local storage and state
function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    try {
      e.preventDefault();
      const data = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        {
          email: email,
          password: password,
        }
      );
      console.log(data);
      if (data.data.message === 'Login successful!') {
        // if login was successful, set the token in local storage and state, clear input fields and navigate to the account page
        localStorage.setItem('token', data.data.token);
        setToken(data.data.token);
        setEmail('');
        setPassword('');
        navigate('/me');
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className={styles['formContainer']}>
        <h3>Please login to check out or return books.</h3>
        <form className={styles['form']}>
          <label className={styles['label']}>
            Email:
            <input
              className={styles['input']}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles['label']}>
            Password:
            <input
              className={styles['input']}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className={styles['submitButton']}
            onClick={handleLogin}
            style={{ display: 'block' }}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
