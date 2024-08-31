// src/components/DialogForm.js

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { manualShift } from '../../utils/TimeUtils'; // Import the manualShift function

export default function FormDialog({ open, onClose }) {
  const [timeZone, setTimeZone] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
  });

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const SlideTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    if (!loading) {
      onClose();
      setSnackbarState({ ...snackbarState, open: false });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    // Construct the shiftInfo object
    const shiftInfo = {
      shiftDate: formJson.date,
      clockInTime: formJson.clockIn,
      clockOutTime: formJson.clockOut,
      lunchBreakIn: formJson.lunchBreakIn,
      lunchBreakOut: formJson.lunchBreakOut,
      breakIn: formJson.breakIn,
      breakOut: formJson.breakOut,
      timeZone: timeZone || 'N/A',
    };

    // Call the manualShift function
    const result = await manualShift(shiftInfo);
    setLoading(false);
    setSnackbarState(prev => ({
      ...prev,
      open: true,
      message: result ? "Shift successfully saved" : "Failed to save shift",
    }));

    setTimeout(() => {
      handleClose();
    }, 500); // Adjust delay as needed
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add Shift Details</DialogTitle>
        <DialogContent>
          {/* Date Field */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="date"
            name="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Clock-In Field */}
          <TextField
            required
            margin="dense"
            id="clockIn"
            name="clockIn"
            label="Clock-In Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Clock-Out Field */}
          <TextField
            required
            margin="dense"
            id="clockOut"
            name="clockOut"
            label="Clock-Out Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Lunch Break In Field */}
          <TextField
            required
            margin="dense"
            id="lunchBreakIn"
            name="lunchBreakIn"
            label="Lunch Break Start Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Lunch Break Out Field */}
          <TextField
            required
            margin="dense"
            id="lunchBreakOut"
            name="lunchBreakOut"
            label="Lunch Break End Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Rest Break In Field */}
          <TextField
            required
            margin="dense"
            id="breakIn"
            name="breakIn"
            label="Rest Break Start Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Rest Break Out Field */}
          <TextField
            required
            margin="dense"
            id="breakOut"
            name="breakOut"
            label="Rest Break End Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarState.open}
        onClose={() => setSnackbarState(prev => ({ ...prev, open: false }))}
        TransitionComponent={SlideTransition}
        message={snackbarState.message}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
    </div>
  );
}
