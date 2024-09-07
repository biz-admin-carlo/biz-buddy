import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { BiSolidCoffeeAlt } from 'react-icons/bi';
import { MdLunchDining } from 'react-icons/md';

const ActionButtons = ({ onLunchBreak, onCoffeeBreak, lunchLabel, breakLabel, lunchBreakClicks, coffeeBreakClicks,  }) => {
  const actions = [];

  // Only show the lunch break option if it hasn't been clicked twice
  if (lunchBreakClicks < 2) {
    actions.push({ icon: <MdLunchDining />, name: lunchLabel, action: onLunchBreak });
  }

  // Only show the coffee break option if it hasn't been clicked twice
  if (coffeeBreakClicks < 2) {
    actions.push({ icon: <BiSolidCoffeeAlt />, name: breakLabel, action: onCoffeeBreak });
  }

  return (
    <SpeedDial ariaLabel="Break Actions" sx={{ position: 'absolute', bottom: 56, right: 56 }} icon={<SpeedDialIcon />}>
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.action} />
      ))}
    </SpeedDial>
  );
};

export default ActionButtons;
