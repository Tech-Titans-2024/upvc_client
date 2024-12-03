import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './login/login'
import Layout from './layout/layout'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/layout' element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
