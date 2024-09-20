import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Stack, Avatar, MenuItem, FormControl, Select, Pagination } from '@mui/material';
import GenerateShifts from '../Base/GenerateShifts';
import BaseSpeedDial from '../Base/BaseSpeedDial';
import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';
import '../../assets/styles/BizBuddy.css';
import { viewlAllAgentAccounts, retrieveShiftsUsingName } from '../../utils/SvUtils';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'short' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const stringAvatar = (name) => {
  return {
    sx: { bgcolor: stringToColor(name) },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};

const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

function BizBuddyShifts({ userFName }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [accounts, setAccounts] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('Day');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await viewlAllAgentAccounts();
        if (data) {
          setAccounts(data);
        } else {
          setError('Failed to fetch accounts');
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (selectedAvatar) {
      const fetchDetailsUser = async (fullName) => {
        try {
          const data = await retrieveShiftsUsingName({ fullName });
          if (data) {
            setShifts(data);
          } else {
            setError('Failed to fetch shifts');
          }
        } catch (err) {
          setError('An error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchDetailsUser(selectedAvatar);
    }
  }, [selectedAvatar]);

  const handleAvatarClick = (name) => setSelectedAvatar(name);
  const handlePageChange = (event, newPage) => setCurrentPage(newPage);
  const handleChangeDate = (event) => setDate(event.target.value);

  const paginatedShifts = shifts.timeLogs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil((shifts.timeLogs?.length || 0) / itemsPerPage);

  const formattedShifts = (shifts.timeLogs || []).map(shift => ({
    date: shift.timeOut ? formatDate(shift.timeOut) : "",
    timeIn: formatTime(shift.timeIn),
    timeOut: shift.timeOut ? formatTime(shift.timeOut) : "",
    totalBreakTime: shift.totalBreakTime,
    totalLunchBreakTime: shift.totalLunchBreakTime,
    totalShiftTime: shift.totalShiftTime,
    status: shift.status,
  }));

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {accounts.map((account) => (
            <Avatar
              key={account} 
              {...stringAvatar(account)}
              onClick={() => handleAvatarClick(account)}
              sx={{
                cursor: 'pointer',
                bgcolor: stringToColor(account),
                border: selectedAvatar === account ? '5px solid black' : '5px solid transparent',
                borderRadius: '50%',
                transition: 'border 0.3s ease-in-out',
              }}
            />
          ))}
        </Stack>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth size="small">
            <Select
              value={date}
              onChange={handleChangeDate}
              inputProps={{ 'aria-label': 'Select time period' }}
            >
              <MenuItem value={'Day'}>Day</MenuItem>
              <MenuItem value={'Week'}>Week</MenuItem>
              <MenuItem value={'Bi-Monthly'}>Bi-Monthly</MenuItem>
              <MenuItem value={'Monthly'}>Monthly</MenuItem>
              <MenuItem value={'Custom'}>Custom</MenuItem>
              <MenuItem value={'Upcoming'}>Upcoming</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box>
        <p className='roboto-regular'>{selectedAvatar}</p>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Clock-In</TableCell>
              <TableCell align="right">Clock-Out</TableCell>
              <TableCell align="right">Total Break Hours</TableCell>
              <TableCell align="right">Total Lunch Hours</TableCell>
              <TableCell align="right">Total Work Hours</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(paginatedShifts || []).map((log, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {log.timeOut ? formatDate(log.timeOut) : ""}
                </TableCell>
                <TableCell align="right">{formatTime(log.timeIn)}</TableCell>
                <TableCell align="right">
                  {log.timeOut ? formatTime(log.timeOut) : ""}
                </TableCell>
                <TableCell align="right">{log.totalBreakTime}</TableCell>
                <TableCell align="right">{log.totalLunchBreakTime}</TableCell>
                <TableCell align="right">{log.totalShiftTime}</TableCell>
                <TableCell align="right">{log.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>

      <BaseSpeedDial />
      <GenerateShifts
        shifts={formattedShifts} // Pass the formatted shifts
        extractionDate={formatDate(new Date())} // Human-readable extraction date
        userEmail={userFName}
        selected={selectedAvatar}
      />
    </div>
  );
}

export default BizBuddyShifts;
