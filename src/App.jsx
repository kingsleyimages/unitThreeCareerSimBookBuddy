import { useState } from 'react';

import Access from './Pages/Access';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Navigations from './components/Navigations/Navigations';
import SingleBook from './Components/SingleBook/SingleBook';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './Pages/Profile';
import { useEffect } from 'react';
function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    console.log('effect running...');
    // if theres a token in the browser, set the token to that token so it can be passed down to the other components.
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
  }, []);
  return (
    <>
      <Navigations token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/login" element={<Access setToken={setToken} />} />
        <Route
          path="/signup"
          element={<Signup setToken={setToken} token={token} />}
        />
        <Route path="/book/detail/:id" element={<SingleBook />} />
        {/* create section for protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/me" element={<Profile token={token} />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
      {/* <p>
        Complete the React components needed to allow users to browse a library
        catalog, check out books, review their account, and return books that
        they've finished reading.
      </p>

      <p>
        You may need to use the `token` in this top-level component in other
        components that need to know if a user has logged in or not.
      </p>

      <p>
        Don't forget to set up React Router to navigate between the different
        views of your single page application!
      </p> */}
    </>
  );
}

export default App;
