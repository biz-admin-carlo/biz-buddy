import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { RiUserAddFill, RiTeamFill } from "react-icons/ri";
import CreateAccountForm from '../../components/Form/CreateAccountForm';
import CreateTeamForm from '../../components/Form/CreateTeamForm';

const actions = [
  { icon: <RiUserAddFill />, name: 'Create Account', formType: 'account' },
  { icon: <RiTeamFill />, name: 'Create Team', formType: 'team' },
];

export default function BasicSpeedDial() {
  const [openModal, setOpenModal] = React.useState(false);
  const [activeForm, setActiveForm] = React.useState(null);

  const handleOpenModal = (formType) => {
    setActiveForm(formType);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setActiveForm(null);
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
            onClick={() => handleOpenModal(action.formType)}
          />
        ))}
      </SpeedDial>

      {activeForm === 'account' && (
        <CreateAccountForm open={openModal} handleClose={handleCloseModal} />
      )}
      {activeForm === 'team' && (
        <CreateTeamForm open={openModal} handleClose={handleCloseModal} />
      )}
    </>
  );
}
