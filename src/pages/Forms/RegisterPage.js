import React from 'react';
import { Helmet } from 'react-helmet';
import Registration from '../../components/Layout/Registration'
import useAuthRedirect from '../../hooks/useAuthRedirect';

function RegisterPage() {
    useAuthRedirect();
  
    return (
      <div>
        <Helmet>
          <title>BizBuddy | Register Account</title>
        </Helmet>
        
        <main>
          <Registration />
        </main>
      </div>
    );
  }
  
  export default RegisterPage;


