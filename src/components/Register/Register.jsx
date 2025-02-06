/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';

function Register({ setToken }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      if (data.status === 200) {
        localStorage.setItem('token', data.data.token);
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
