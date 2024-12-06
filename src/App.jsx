import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login/login';
import Layout from './components/layout/sidebar';
import Menu from './components/menu/menu';
import Measure from './components/menu/measurement';
import Calculate from './components/menu/calculation';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/layout' element={<Layout />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/measure' element={<Measure />} />
        <Route path='/calculate' element={<Calculate />} />
      </Routes>
    </Router>
  );
}

export default App;
