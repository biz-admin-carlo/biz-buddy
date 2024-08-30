// src/components/EditFormDialog.js

import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditFormDialog({ open, onClose, transaction }) {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    
    // Example of how to access form values
    console.log("Edited Form Data:", formJson);
    
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Edit Shift Details</DialogTitle>
      <DialogContent>
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
          defaultValue={transaction ? new Date(transaction.date).toISOString().substring(0, 10) : ''}
        />

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
          defaultValue={transaction ? transaction.timeIn ? new Date(transaction.timeIn).toLocaleTimeString('en-US', { hour12: false }) : '' : ''}
        />

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
          defaultValue={transaction ? transaction.timeOut ? new Date(transaction.timeOut).toLocaleTimeString('en-US', { hour12: false }) : '' : ''}
        />

        <TextField
          required
          margin="dense"
          id="lunchBreak"
          name="lunchBreak"
          label="Lunch Break (hours)"
          type="number"
          fullWidth
          inputProps={{ min: "0", step: "0.01" }}
          defaultValue={transaction ? transaction.lunchHours : ''}
        />

        <TextField
          required
          margin="dense"
          id="restBreak"
          name="restBreak"
          label="Rest Break (hours)"
          type="number"
          fullWidth
          inputProps={{ min: "0", step: "0.01" }}
          defaultValue={transaction ? transaction.breakHours : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
