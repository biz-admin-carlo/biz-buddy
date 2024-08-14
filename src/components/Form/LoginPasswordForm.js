import React from 'react';
import InputField from '../../components/Base/InputField';
import CustomButton from '../../components/Base/Button';

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

function LoginForm() {
  const handleInputChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh' }}>
        <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '20px'
        }}>
        <h1 className='roboto-medium'>What's your password?</h1>
        <h2 className='roboto-regular' sx={{ margin: 0 }}>email.address</h2>
        <InputField
            id="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
            required={true} 
            sx={{ pb: 2 }}
        />
        <h4 className='roboto-light gray-text'>Forgotten your password?</h4>
        <div style={{ textAlign: 'right' }}>
            <CustomButton>
            Sign In
            </CustomButton>
        </div>
        </div>
    </div>
  );
}

export default LoginForm;
