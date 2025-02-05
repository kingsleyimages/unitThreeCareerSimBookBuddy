import { useState } from 'react';

import Access from './Pages/Access';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Navigations from './components/Navigations/Navigations';
import SingleBook from './Components/SingleBook/SingleBook';
function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <Navigations />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Access token={token} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/book/detail/:id" element={<SingleBook />} />
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
