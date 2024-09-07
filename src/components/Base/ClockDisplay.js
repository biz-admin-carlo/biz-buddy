import React from 'react';

const ClockDisplay = ({ isClockedIn, currentTime, elapsedTime }) => {
  return (
    <h2 className="homeform-time">{isClockedIn ? elapsedTime : currentTime}</h2>
  );
};

export default ClockDisplay;
