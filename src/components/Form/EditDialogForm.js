import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import { archivedTransaction } from '../../utils/TimeUtils';

export default function EditFormDialog({ open, onClose, transaction }) {
  const [ loading, setLoading ] = useState(false);
  const [ snackbarState, setSnackbarState ] = useState({
    open: false,
    message: '',
  });
    
  const SlideTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    if (!loading) {
      onClose();
      setSnackbarState({ ...snackbarState, open: false });
    }
  };

  const handleArchive = async () => {
    setLoading(true);
    const result = await archivedTransaction(transaction.id);
    setLoading(false);
    setSnackbarState(prev => ({
      ...prev,
      open: true,
      message: result ? "Transaction archived successfully" : "Failed to archive transaction",
    }));
    
    setTimeout(() => {
      handleClose();
    }, 500); // Adjust delay as needed
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    // console.log("Edited Form Data:", formJson);
    handleClose();
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
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleArchive} disabled={loading}>Archive</Button>
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
