import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../assets/styles/NavButton.css';
import { userDetails } from '../../utils/UserUtils';

function NavBottom() {
  const isLoggedIn = !!localStorage.getItem('bb_session_token'); 
  const navigate = useNavigate(); 

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await userDetails();
        if (result) {
          setUserInfo(result);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bb_session_token');
    setTimeout(() => {
      navigate('/home');
    }, 100);
  };

  if (!isLoggedIn || loading) {
    return null; // Don't render anything if not logged in or loading
  }

  return (
    <div className="nav-container-bottom">
      <p className="nav-item roboto-light">
        <Link to="/" className="nav-link">Home</Link>
      </p>
      <span> | </span>
      <p className="nav-item roboto-light">
        <Link to="/shifts" className="nav-link">Shifts</Link>
      </p>
      <span> | </span>
      <p className="nav-item roboto-light">
        <Link to="/profile" className="nav-link">Profile</Link>
      </p>
      <span> | </span>
      {userInfo && userInfo.isManager && !userInfo.isUser ? (
        <>
          <p className="nav-item roboto-light">
            <Link to="/team" className="nav-link">Team</Link>
          </p>
          <span> | </span>
        </>
      ) : null}
      <p className="nav-item roboto-light">
        <Link to="/leave" className="nav-link">Leaves</Link>
      </p>
      <span> | </span>
      <p className="nav-item roboto-light">
        <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
      </p>
    </div>
  );
}

export default NavBottom;
