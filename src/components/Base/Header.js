import React from 'react';
import Avatar from '@mui/material/Avatar';
import icon from '../../assets/icons/icon-biz-buddy.ico';

const Header = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Avatar src={icon} className="profile-header-avatar" />
    <h1 className="roboto-medium">BizBuddy</h1>
  </div>
);

export default Header;
