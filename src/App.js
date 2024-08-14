import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Forms/LoginPage';
import PasswordPage from './pages/Forms/PasswordPage';
import HomePage from './pages/Forms/HomePage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-password" element={<PasswordPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
