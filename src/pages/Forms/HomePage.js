import React from 'react';
import { Helmet } from 'react-helmet';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import HomePage from '../../components/Layout/Home'

function Home() {
  useAuthRedirect();
  
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
