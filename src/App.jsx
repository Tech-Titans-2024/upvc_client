import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './login/login'
import Layout from './layout/sidebar';
import Menu from './menu/menu';
function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/layout' element={<Layout />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
