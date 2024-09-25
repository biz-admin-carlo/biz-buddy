import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBottomSysAd from './NavBottomSysAd';
import NavBottomUser from './NavBottomUser';

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
        // You might want to handle errors here, e.g., showing a notification
        // console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserDetails();
    } else {
      setLoading(false); // Ensure loading is false if not logged in
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('bb_session_token');
    navigate('/home');
  };

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading spinner or message
  }

  if (!isLoggedIn) {
    return null; // Optionally, render a message or redirect if not logged in
  }

  if (userInfo?.isSysAd) {
    return <NavBottomSysAd />;
  }

  if (userInfo?.isUser) {
    return <NavBottomUser />;
  }

  return (
    <div className="nav-container-bottom">
      <p className="nav-item roboto-light">
        <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
      </p>
    </div>
  );
}

export default NavBottom;