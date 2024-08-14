import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HomePage from '../../components/Layout/Home'

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('bb_session_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div>
        <Helmet>
            <title>BizBuddy | Home</title>
        </Helmet>
        
        <main>
          <HomePage />
        </main>

    </div>
  );
}

export default Home;
