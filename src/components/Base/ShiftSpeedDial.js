import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { RiTimeFill } from "react-icons/ri";
import CreateShiftModal from '../Form/CreateShiftForm';

const actions = [
  { icon: <RiTimeFill />  , name: 'Create Upcoming Shift' },
];

export default function BasicSpeedDial() {
    const [ openModal, setOpenModal ] = React.useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

  return (
    <>
        <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
            position: 'fixed', 
            bottom: '9vh', 
            left: '12vh', 
            zIndex: 1300, 
        }}
        icon={<SpeedDialIcon />}
        >
        {actions.map((action) => (
            <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleOpenModal}
            />
        ))}
        </SpeedDial>

        <CreateShiftModal open={openModal} handleClose={handleCloseModal} />
    </>
  );
}

