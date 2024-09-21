import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, } from '@mui/material';
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
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = async () => {
    const result = await createTeam(formData);
    if (result === true) {
      handleClose();
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        />
        <TextField
          label="Team Alias"
          name="teamAlias"
          fullWidth
          margin="normal"
          value={formData.teamAlias}
          onChange={handleChange}
        />
        <TextField
          label="Team Code"
          name="teamCode"
          fullWidth
          margin="normal"
          value={formData.teamCode}
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
