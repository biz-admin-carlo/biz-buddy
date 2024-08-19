import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/Base/InputField';
import CustomButton from '../../components/Base/Button';
import { Typography, Link } from '@mui/material';
import { userLogin } from '../../utils/UserUtils';
import Avatar from '@mui/material/Avatar';

import icon from '../../assets/icons/icon-biz-buddy.ico';
import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleInputChange = (event) => {
    if (event.target.id === 'username') {
      setEmail(event.target.value);
    } else if (event.target.id === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleLogin = async () => {
    const loggedIn = await userLogin(email, password);
    if (loggedIn) {
      navigate('/home');
    } else {
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh' }}>
      <div style={{
              width: '80%',
              maxWidth: '400px',
              border: '1px solid #000', 
              borderRadius: '10px',
              padding: '5vh'
            }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%', maxWidth: '400px' }}>
          <Avatar
            src={icon}
            className="profile-header-avatar"
            style={{ marginRight: '0px' }}
          />
          <h1 className="roboto-medium">BizBuddy</h1>
        </div>
        
        <h2 className='roboto-regular'>Login</h2>
        <InputField
          id="username"
          label="Email"
          value={email}
          onChange={handleInputChange}
          required={true}
          sx={{ pb: 2 }}
        />
        <InputField
          id="password"
          label="Password"
          value={password}
          onChange={handleInputChange}
          required={true}
          sx={{ pb: 2 }}
          type="password"
        />
        <Typography variant="body1" className='roboto-light gray-text' component="h4" sx={{ textDecoration: 'none', color: 'gray', margin: 0 }}>
          By continuing, I agree to BizSolutions'
          {' '}<Link href="/privacy-policy" sx={{ textDecoration: 'underline', color: 'inherit', mx: 0.5 }}>Privacy Policy</Link>
          and
          <Link href="/terms-of-use" sx={{ textDecoration: 'underline', color: 'inherit', ml: 0.5 }}>Terms of Use</Link>.
        </Typography>
        <div style={{ textAlign: 'right' }}>
            <CustomButton onClick={handleLogin}>
              Continue
            </CustomButton>
        </div>
        </div>
    </div>
  );
}

export default LoginForm;
