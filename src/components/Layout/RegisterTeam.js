import React from 'react';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CustomButton from '../Base/Button';
import Avatar from '@mui/material/Avatar';

import icon from '../../assets/icons/icon-biz-buddy.ico';

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

function RegistrationForm() {
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
  const [ showPassword, setShowPassword ] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = data => {
    // console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh' }}>
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

          <h2 className='roboto-light' style={{ textAlign: 'left' }}>Create Team</h2>
          <p className='roboto-regular' style={{ color: 'gray', textAlign: 'left', fontWeight: 'bold' }}>
                Each Team Manager can register only one Biz Team.
          </p>

        <TextField
          {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" } })}
          helperText={errors.email && errors.email.message}
          fullWidth
          label="Team Name"
          id="fullWidth"
          error={!!errors.email}
          style={{ marginBottom: '16px', marginTop: '8px'}}
        />

        <TextField
          {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" } })}
          helperText={errors.email && errors.email.message}
          fullWidth
          label="Email Address"
          id="fullWidth"
          error={!!errors.email}
          style={{ marginBottom: '16px', marginTop: '8px'}}
        />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CustomButton>
            Create Team
          </CustomButton>
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;
