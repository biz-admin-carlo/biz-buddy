// src/components/base/Button.js
import React from 'react';
import Button from '@mui/material/Button';

function CustomButton({ children, onClick, style, ...props }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: 'black', // Sets the button color to black
        color: 'white', // Text color
        borderRadius: '50px', // Rounded shape
        '&:hover': {
          backgroundColor: '#333333', // Darker shade for hover state
        },
        ...props.sx // Allows for overriding or extending styles externally if needed
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
