import React from 'react';
import InputField from '../../components/Base/InputField';
import CustomButton from '../../components/Base/Button';

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

function LoginForm() {
  const handleInputChange = (event) => {
    // console.log(event.target.value);
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
        <h1 className='roboto-medium'>Reset your password</h1>
        <h2 className='roboto-regular' style={{ margin: 0 }}>Enter your email address</h2>
        <InputField
            id="email"
            label="Email Address"
            type="email"
            onChange={handleInputChange}
            required={true} 
            sx={{ pb: 2 }}
            style={{ marginTop: '16px' }}

        />
        <h4 className='roboto-light gray-text'>Already Remembered?</h4>
        <div style={{ textAlign: 'right' }}>
            <CustomButton>
            Reset Password
            </CustomButton>
        </div>
        </div>
    </div>
  );
}

export default LoginForm;
