import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import '../../assets/styles/ProfileDetails.css';

import { userDetails } from '../../utils/UserUtils';

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

function ProfileInfo({ label, value }) {
  return (
    <div className="profile-info-item">
      <p className="profile-info-label">{label}:</p>
      <h3 className="profile-info-value">{value}</h3>
    </div>
  );
}

function ProfileDetails() {
  const [ icon, setIcon ] = useState(icon1); 
  const [ userInfo, setUserInfo ] = useState('');

  useEffect(() => {
    setIcon(getRandomIcon());

    async function fetchUserDetails() {
      const result = await userDetails();
      if(result) {
          setUserInfo(result);
      }
  }
    fetchUserDetails();

  }, []);

  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
  const teamPostion = userInfo.teamPosition ? userInfo.teamPosition : "-";
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
          <ProfileHeader icon={icon} name={fullName} email={userInfo.email} position={teamPostion} />
        </div>
      </div>
      <div className="profile-info-container">
        <div style={{ width: '30%', maxWidth: '200px' }}>
          <ProfileInfo label="Name" value={fullName} />
          <ProfileInfo label="Email" value={userInfo.email} />
          <ProfileInfo label="Birthday" value={birthDate} />
          <ProfileInfo label="Team Manager" value={teamPostion} />
          <ProfileInfo label="Joined On" value={formattedDate} />
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
