import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';
import BizBuddyShifts from '../Pages/BizBuddyShifts';
import BizBuddyUsers from '../Pages/BizBuddyUsers';
import BizBuddyData from '../Pages/BizBuddyData';
import { userDetails } from '../../utils/UserUtils';

import '../../assets/fonts/roboto.css';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Shift() {
    const [ userInfo, setUserInfo ] = useState('');
    const [ value, setValue ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const result = await userDetails();
                if (result) {
                    setUserInfo(result);
                }
            } catch (err) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) return <p className='roboto-regular'>Loading...</p>;
    if (error) return <p className='roboto-regular'>{error}</p>;

    return (
        <div style={{ padding: '5vh' }}>
            <div>
                <h1 className="roboto-medium">Biz Buddy</h1>
                <h3 className="roboto-light">
                    Welcome {userInfo.firstName}!
                </h3>
            </div>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Users" {...a11yProps(0)} />
                    <Tab label="Shifts" {...a11yProps(1)} />
                    <Tab label="Data" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <BizBuddyUsers userFName={userInfo.firstName} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <BizBuddyShifts userFName={userInfo.firstName} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <BizBuddyData />
            </CustomTabPanel>
        </div>
    );
}

export default Shift;
