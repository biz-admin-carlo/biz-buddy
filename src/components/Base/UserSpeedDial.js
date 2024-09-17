import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { RiUserAddFill, RiTeamFill } from "react-icons/ri";
import CreateAccountForm from '../../components/Form/CreateAccountForm';

const actions = [
  { icon: <RiUserAddFill />  , name: 'Create Account' },
  { icon: <RiTeamFill />  , name: 'Create Team' },
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

        <CreateAccountForm open={openModal} handleClose={handleCloseModal} />
    </>
  );
}

