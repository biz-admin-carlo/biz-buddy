import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { createTeam } from '../../utils/SvUtils';

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

export default function CreateTeamModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    teamName: '',
    teamAlias: '',
    teamCode: '',
    ein: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = async () => {
    if (!formData.teamName || !formData.teamAlias || !formData.teamCode || !formData.ein) {
      setErrorMessage('All fields are required.');
      return; 
    }

    const result = await createTeam(formData);
    if (result === true) {
      handleClose();
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(''); 
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Create Team
        </Typography>

        <TextField
          label="Team Name"
          name="teamName"
          fullWidth
          margin="normal"
          value={formData.teamName}
          onChange={handleChange}
          required
          error={!formData.teamName && errorMessage !== ''}
          helperText={!formData.teamName && errorMessage !== '' ? 'This field is required.' : ''}
        />
        <TextField
          label="Team Alias"
          name="teamAlias"
          fullWidth
          margin="normal"
          value={formData.teamAlias}
          onChange={handleChange}
          required
          error={!formData.teamAlias && errorMessage !== ''}
          helperText={!formData.teamAlias && errorMessage !== '' ? 'This field is required.' : ''}
        />
        <TextField
          label="Team Code"
          name="teamCode"
          fullWidth
          margin="normal"
          value={formData.teamCode}
          onChange={handleChange}
          required
          error={!formData.teamCode && errorMessage !== ''}
          helperText={!formData.teamCode && errorMessage !== '' ? 'This field is required.' : ''}
        />
        <TextField
          label="Employer Identification Number (EIN)"
          name="ein"
          fullWidth
          margin="normal"
          value={formData.ein}
          onChange={handleChange}
          required
          error={(formData.ein.length !== 9 && formData.ein.length > 0) || (errorMessage !== '' && !formData.ein)}
          helperText={
            formData.ein.length !== 9 && formData.ein.length > 0
              ? 'EIN must be exactly 9 characters.'
              : errorMessage !== '' && !formData.ein
              ? 'This field is required.'
              : ''
          }
          inputProps={{ maxLength: 9 }} 
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
          Create Team
        </Button>
      </Box>
    </Modal>
  );
}
