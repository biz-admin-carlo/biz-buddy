import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClipLoader from "react-spinners/ClipLoader";

import ProfileDetailsTable from '../Base/ProfileDetailsTable';

import '../../assets/styles/ProfileDetails.css';

import { userDetails, userWorkDetails } from '../../utils/UserUtils';

import icon1 from '../../assets/icons/icon-avatar-001.png';
import icon2 from '../../assets/icons/icon-avatar-002.png';
import icon3 from '../../assets/icons/icon-avatar-003.png';
import icon4 from '../../assets/icons/icon-avatar-004.png';
import icon5 from '../../assets/icons/icon-avatar-005.png';
import icon6 from '../../assets/icons/icon-avatar-006.png';
import icon7 from '../../assets/icons/icon-avatar-007.png';
import icon8 from '../../assets/icons/icon-avatar-008.png';

const getRandomIcon = () => {
    const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };
  
  function ProfileHeader({ icon, name, email, position }) {
    return (
      <div className="profile-header">
        <Avatar
          alt={name}
          src={icon}
          className="profile-header-avatar"
        />
        <div className="profile-header-info">
          <p className='profile-info-label'>Profile</p>
          <h1 className='roboto-medium'>{name}</h1>
          <p className='profile-info-label'>{email}</p>
          <h3 className='roboto-medium'>{position}</h3>
        </div>
      </div>
    );
  }

function ProfileDetails() {
    const [icon, setIcon] = useState(icon1); 
    const [userInfo, setUserInfo] = useState('');
    const [userWorkInfo, setUserWorkInfo] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setIcon(getRandomIcon());
  
      async function fetchUserDetails() {
        const result = await userDetails();
        if (result) {
          setUserInfo(result);
        }
        setLoading(false);
      }
      fetchUserDetails();

      async function fetchUserWorkDetails() {
        const result = await userWorkDetails();
        if (result) {
          setUserWorkInfo(result);
        }
        setLoading(false);
      }
      fetchUserWorkDetails();
    }, []);
  
    const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
    const teamPostion = userInfo.teamRole ? userInfo.teamRole : "-";
    const fetchedBirthDate = userInfo.birthday; 
    const birthDate = fetchedBirthDate 
      ? new Date(fetchedBirthDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : "-";
    const dateString = userInfo.dateJoined;
    const formattedDate = dateString 
      ? new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : "-";
    return (
      <>
        <div className="profile-details-container">
          <div style={{ width: '80%', maxWidth: '400px' }}>
            <ProfileHeader icon={icon} name={fullName} email={userInfo.email} position={'Collection Representative'} />
          </div>
        </div>
        
        <div style={{ width: '80%', maxWidth: '400px' }}></div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="profile-details-content"
            id="profile-details-header"
          >
            <Typography>Profile Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileDetailsTable userInfo={userInfo} userWorkInfo={userWorkInfo} birthDate={birthDate}/>

          </AccordionDetails>
        </Accordion>
  
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="change-password-content"
            id="change-password-header"
          >
            <Typography>Change Password</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="change-password-form">
              <TextField
                margin="dense"
                id="current-password"
                label="Current Password"
                type="password"
                fullWidth
              />
              <TextField
                margin="dense"
                id="new-password"
                label="New Password"
                type="password"
                fullWidth
              />
              <TextField
                margin="dense"
                id="confirm-password"
                label="Confirm New Password"
                type="password"
                fullWidth
              />
              <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Change Password
              </Button>
            </div>
          </AccordionDetails>
        </Accordion> */}
  
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        )}
      </>
    );
  }
  
  export default ProfileDetails;
  