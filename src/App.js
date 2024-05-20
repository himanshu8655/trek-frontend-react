import './App.css';
import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Home from './pages/home/Home';
import TrekForm from './pages/trek-form/TrekForm';
import SignUp from './pages/authentication/SignUp';

function App() {
  return (
    <div className="App">
    <Routes>
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/trek" element={<TrekForm />} />
      <Route path="/register" element={<SignUp />} />
      </Route>
    </Routes>
  </div>
  );
}

export default App;
