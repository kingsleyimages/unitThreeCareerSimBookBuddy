/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';

function Register({ setToken }) {
  // set states for the form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // fucntion to handle the submit and post request to the API
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await axios.post(
        // use environment variable (vite specific syntax) to access the API base URL in ``
        `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
        }
      );
      console.log(data.data.message);
      console.log(data);
      // if statement to run if that post was successful.
      if (data.status === 200) {
        // set the token in local storage and state
        localStorage.setItem('token', data.data.token);
        // set token via this function that was passed as prop from app.jsx so that it can be used elsewhere
        setToken(data.data.token);

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* way to add module styles to the from so they only scope to this page. */}
      <div className={styles['formContainer']}>
        <h3>Please create an account to interact with our library.</h3>
        <form className={styles['form']} onSubmit={handleSubmit}>
          <label className={styles['label']}>
            First Name:
            <input
              className={styles['input']}
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className={styles['label']}>
            Last Name:
            <input
              className={styles['input']}
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
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
            type="submit"
            style={{ display: 'block' }}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
