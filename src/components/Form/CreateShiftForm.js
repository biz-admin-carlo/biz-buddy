import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { createUser } from '../../utils/UserUtils';
import { LocalizationProvider, DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { viewlAllAgentAccounts, createScheduleShift } from '../../utils/SvUtils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

export default function CreateShiftModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    supposedClockedIn: '',
    supposedClockedOut: '',
    agentName: '', // Added field for agent selection
  });
  const [accounts, setAccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await viewlAllAgentAccounts();
        if (data) {
          setAccounts(data);
        } else {
          setErrorMessage('Failed to fetch accounts');
        }
      } catch (err) {
        setErrorMessage('An error occurred');
      }
    };
    fetchAccounts();
  }, []);

  const handleCreateShift = async () => {
    const result = await createScheduleShift(formData);
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
        Create Shift
        </Typography>

        <Box sx={{ minWidth: 120, mb: 2 }}>
        <FormControl fullWidth>
            <InputLabel id="agent-select-label">Agent Name</InputLabel>
            <Select
            labelId="agent-select-label"
            id="agent-select"
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
            >
            {accounts.map((account, index) => (
                <MenuItem key={index} value={account}>
                {account}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ mb: 2, width: '100%' }}>
            <DatePicker
            fullWidth
            label="Start Date"
            value={formData.startDate ? dayjs(formData.startDate) : null}
            onChange={(newValue) => setFormData({ ...formData, startDate: newValue?.toISOString() })}
            />
        </Box>

        <Box sx={{ mb: 2, width: '100%' }}>
            <DatePicker
            fullWidth
            label="End Date"
            value={formData.endDate ? dayjs(formData.endDate) : null}
            onChange={(newValue) => setFormData({ ...formData, endDate: newValue?.toISOString() })}
            />
        </Box>

        <Box sx={{ mb: 2, width: '100%' }}>
            <DesktopTimePicker
            label="Supposed Clocked In"
            value={formData.supposedClockedIn ? dayjs(formData.supposedClockedIn) : null}
            onChange={(newValue) => setFormData({ ...formData, supposedClockedIn: newValue?.toISOString() })}
            />
        </Box>

        <Box sx={{ mb: 2, width: '100%' }}>
            <DesktopTimePicker
            label="Supposed Clocked Out"
            value={formData.supposedClockedOut ? dayjs(formData.supposedClockedOut) : null}
            onChange={(newValue) => setFormData({ ...formData, supposedClockedOut: newValue?.toISOString() })}
            />
        </Box>
        </LocalizationProvider>

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
        onClick={handleCreateShift}
        >
        Create Shift
        </Button>
    </Box>
    </Modal>

  );
}
