/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(token) {
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
      <form>
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
        <button onClick={handleLogin} style={{ display: 'block' }}>
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;
