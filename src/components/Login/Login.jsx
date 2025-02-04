/* TODO - add your code to create a functional React component that renders a login form */
import React from 'react';

function Login(setToken) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        <button type="submit" style={{ display: 'block' }}>
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;
