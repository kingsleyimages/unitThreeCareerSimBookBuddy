/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Register({ setToken }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      if (data.data.message === 'Registration successful!') {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      }
      setToken(data.data.token);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" style={{ display: 'block' }}>
          Submit
        </button>
      </form>
    </>
  );
}

export default Register;
