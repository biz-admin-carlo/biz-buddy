import React from 'react';
import { Helmet } from 'react-helmet';
import Profile from '../../components/Layout/Profile'
import useAuthRedirect from '../../hooks/useAuthRedirect';

function ProfilePage() {
    useAuthRedirect();
  
    return (
      <div>
        <Helmet>
          <title>BizBuddy | My Profile</title>
        </Helmet>
        
        <main>
          <Profile />
        </main>
      </div>
    );
  }
  
  export default ProfilePage;


