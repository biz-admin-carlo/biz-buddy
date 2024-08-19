import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../assets/styles/NavButton.css';

function NavBottom() {
  const isLoggedIn = !!localStorage.getItem('bb_session_token'); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('bb_session_token');
    setTimeout(() => {
      navigate('/home');
    }, 100);
  };

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <div className="nav-container-bottom">
      <p className="nav-item roboto-light">
        <Link to="/" className="nav-link">Home</Link>
      </p>
      {/* <span> | </span>
      <p className="nav-item roboto-light">
        <Link to="/shifts" className="nav-link">Shifts</Link>
      </p>
      <span> | </span>
      <p className="nav-item roboto-light">
        <Link to="/profile" className="nav-link">Profile</Link>
      </p>
      <span> | </span>
      <p className="nav-item roboto-light">
        <Link to="/register" className="nav-link">Register</Link>
      </p> */}
      <span> | </span>
      <p className="nav-item roboto-light">
        <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
      </p>
    </div>
  );
}

export default NavBottom;
