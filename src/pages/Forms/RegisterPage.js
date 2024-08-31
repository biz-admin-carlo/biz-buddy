import React from 'react';
import { Helmet } from 'react-helmet';
import RegisterUser from '../../components/Layout/RegisterUser';
import RegisterTeam from '../../components/Layout/RegisterTeam';
import useAuthRedirect from '../../hooks/useAuthRedirect';

function RegisterPage() {
    useAuthRedirect();
  
    return (
      <div>
        <Helmet>
          <title>BizBuddy | Register Account</title>
        </Helmet>
        
        <main>
          <RegisterTeam />
        </main>
      </div>
    );
  }
  
  export default RegisterPage;


