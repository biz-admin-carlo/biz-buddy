import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Forms/LoginPage';
import PasswordPage from './pages/Forms/PasswordPage';
import HomePage from './pages/Forms/HomePage';
import ShiftPage from './pages/Forms/ShiftPage';
import RegisterPage from './pages/Forms/RegisterPage';
import ProfilePage from './pages/Forms/ProfilePage';
import LeavePage from './pages/Forms/LeavePage';
import NavbarBottom from './components/Base/NavBottom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<PasswordPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/shifts" element={<ShiftPage />} />
          <Route path="/shifts/:id" element={<ShiftPage />} />
          <Route path="/team" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leave" element={<LeavePage />} />

        </Routes>
        <NavbarBottom />
      </div>
    </Router>
  );
}

export default App;
