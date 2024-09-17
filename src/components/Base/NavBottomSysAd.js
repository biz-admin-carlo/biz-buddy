import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../assets/styles/NavButton.css';
import { userDetails } from '../../utils/UserUtils';

function NavBottomSysAd() {
  const isLoggedIn = !!localStorage.getItem('bb_session_token'); 
  const navigate = useNavigate(); 

  const [ userInfo, setUserInfo ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ adminID, setAdminID ] = useState();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await userDetails();
        if (result) {
          setUserInfo(result);
          setAdminID(result.id)
        }
      } catch (error) {
        // console.error('Error fetching user details:', error);
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
    {adminID && (
      <>
        <p className="nav-item roboto-light">
          <Link to={`/${adminID}/buddy`} className="nav-link">BizBuddy</Link>
        </p>
        <span> | </span>
        <p className="nav-item roboto-light">
          <Link to={`/${adminID}/solutions`} className="nav-link">BizSolutions</Link>
        </p>
      </>
    )}
      <p className="nav-item roboto-light">
        <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
      </p>
    </div>
  );
}

export default NavBottomSysAd;