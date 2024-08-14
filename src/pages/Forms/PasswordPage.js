import React from 'react';
import { Helmet } from 'react-helmet';
import LoginPasswordForm from '../../components/Form/LoginPasswordForm'

function Login() {

  return (
    <div>
        <Helmet>
            <title>BizBuddy | Login</title>
        </Helmet>
        
        <main>
          <LoginPasswordForm />
        </main>

    </div>
  );
}

export default Login;
