import './App.css';
import React, { useState } from 'react';
import Auth from './Auth';
import Home from './Home';
import AddTrek from './AddTrek'

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/AddTrek" element={<AddTrek />} />

    </Routes>
  </div>
  );
}

export default App;
