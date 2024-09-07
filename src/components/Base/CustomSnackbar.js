import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const CustomSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      message={message}
      key={SlideTransition.name}
      autoHideDuration={2000}
    />
  );
};

export default CustomSnackbar;
