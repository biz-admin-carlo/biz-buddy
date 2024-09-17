import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUser } from '../../utils/UserUtils';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default function CreateAccountModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthday: '',
    teamName: '',
    teamRole: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');  // To display error messages

  const handleCreateAccount = async () => {
    const result = await createUser(formData);
    if (result === true) {
      // Close modal after successful account creation
      handleClose();
    } else {
      // Display error message on failure
      setErrorMessage(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Create Account
        </Typography>

        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Birthday"
          name="birthday"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}  // Ensures the label stays above the input
          value={formData.birthday}
          onChange={handleChange}
        />
        <TextField
          label="Team Name"
          name="teamName"
          fullWidth
          margin="normal"
          value={formData.teamName}
          onChange={handleChange}
        />
        <TextField
          label="Team Role"
          name="teamRole"
          fullWidth
          margin="normal"
          value={formData.teamRole}
          onChange={handleChange}
        />

        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Box>
    </Modal>
  );
}
