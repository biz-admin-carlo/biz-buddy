import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { BiSolidCoffeeAlt } from 'react-icons/bi';
import { MdLunchDining } from 'react-icons/md';

const ActionButtons = ({ onLunchBreak, onCoffeeBreak }) => {
  const actions = [
    { icon: <BiSolidCoffeeAlt />, name: 'Have your Coffee Break?', action: onCoffeeBreak },
    { icon: <MdLunchDining />, name: 'Want to have your Lunch?', action: onLunchBreak },
  ];

  return (
    <SpeedDial ariaLabel="Break Actions" sx={{ position: 'absolute', bottom: 56, right: 56 }} icon={<SpeedDialIcon />}>
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.action} />
      ))}
    </SpeedDial>
  );
};

export default ActionButtons;
