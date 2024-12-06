import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './login/login';
import Layout from './layout/sidebar';
import Menu from './menu/menu';
import Measure from './menu/measurement';
import Submit from './menu/submitpage'; 

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/layout' element={<Layout />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/measure' element={<Measure />} />
        <Route path='/submitted' element={<Submit />} /> 
      </Routes>
    </Router>
  );
}

export default App;
