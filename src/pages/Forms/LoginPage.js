import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from '../../components/Form/LoginForm'

function Login() {

  return (
    <div>
        <Helmet>
            <title>BizBuddy | Login</title>
        </Helmet>
        
        <main>
          <LoginForm />
        </main>

    </div>
  );
}

export default Login;
