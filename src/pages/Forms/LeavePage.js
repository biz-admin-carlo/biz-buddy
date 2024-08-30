import React from 'react';
import { Helmet } from 'react-helmet';
import Leave from '../../components/Layout/Leave'
import useAuthRedirect from '../../hooks/useAuthRedirect';

function ProfilePage() {
    useAuthRedirect();
  
    return (
      <div>
        <Helmet>
          <title>BizBuddy | My Leaves</title>
        </Helmet>
        
        <main>
          <Leave />
        </main>
      </div>
    );
  }
  
  export default ProfilePage;


