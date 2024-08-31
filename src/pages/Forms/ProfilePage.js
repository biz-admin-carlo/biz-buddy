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
          <div style={{ padding: '80px', maxWidth: '1200px', margin: '0 auto' }}>
            <Profile />
          </div>
        </main>

      </div>
    );
  }
  
  export default ProfilePage;


