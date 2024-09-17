import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

function createData(name, alias, status, phone, location, rating, review, created, updated) {
    return { name, alias, status, phone, location, rating, review, created, updated };
  }
  
  const rows = [
    createData('Andre Bohbot', 'Andre Bohbot-Highland-California-1', 'Active', '-', '432 N Avenue 66, Highland', 4.5, '-', '5/28/2024, 12:46:34 AM', '6/22/2024, 11:33:37 AM'),
    createData('Zaytoon Mediterranean Restaurant & Bar', 'Zaytoon Mediterranean Restaurant & Bar', 'Active', '(510) 898-1316', '1133 Solano Ave, Albany', '-', '-', '9/4/2024, 9:51:54 AM', '9/4/2024, 10:12:01 AM'),
    createData('Lulu', 'Lulu', 'Active', 'none', '1106 Solano Ave, Albany', '-', '-', '9/4/2024, 9:53:23 AM', '9/4/2024, 10:11:36 AM'),
    createData('Wojia Hunan Cuisine', 'Wojia Hunan Cuisine', 'Active', '(510) 526-9088', '917 San Pablo Ave, Albany', '-', '-', '9/4/2024, 9:54:44 AM', '9/4/2024, 10:11:16 AM'),
    createData('Dolly\'s', 'Dolly\'s', 'Active', '(510) 609-7123', '10172 San Pablo Ave, El Cerrito', '-', '-', '9/4/2024, 9:56:10 AM', '9/4/2024, 10:10:57 AM'),
    createData('Bua Thai Kitchen', 'Bua Thai Kitchen', 'Active', '(510) 705-1060', '1045 San Pablo Ave, Albany', '-', '-', '9/4/2024, 9:57:34 AM', '9/4/2024, 10:10:28 AM'),
    createData('5 Tacos and Beers', '5 Tacos and Beers', 'Active', '(510) 898-1829', '1175 Solano Ave, Albany', '-', '-', '9/4/2024, 9:59:09 AM', '9/4/2024, 10:10:11 AM'),
    createData('Oak Cali Cafe', 'Oak Cali Cafe', 'Active', '(510) 761-7436', '1601 2nd Ave, Oakland', '-', '-', '9/4/2024, 10:00:45 AM', '9/4/2024, 10:09:18 AM'),
    createData('Pochys', 'Pochys', 'Active', '(551) 333-5505', '1019 Camelia St, Berkeley', '-', '-', '9/4/2024, 10:02:18 AM', '9/4/2024, 10:08:58 AM'),
    createData('Korean Superette', 'Korean Superette', 'Active', '(341) 946-1027', '1539 Solano Ave, Berkeley', '-', '-', '9/4/2024, 10:03:41 AM', '9/4/2024, 10:08:39 AM'),
    createData('Aangan', 'Aangan', 'Active', '(510) 524-2220', '856 San Pablo Ave, Albany', '-', '-', '9/4/2024, 10:05:07 AM', '9/4/2024, 10:06:41 AM'),
    
  ];

function Shift() {
    const [ userInfo, setUserInfo ] = useState('');

    return (
        <div style={{ padding: '10vh' }}>
            <div>
                <h1 className="roboto-medium">Biz Solutions | BizNess</h1>
                <h3 className="roboto-light">
                    Welcome {userInfo.firstName}! These are your logged transactions:
                </h3>
            </div>

            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Alias</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Ratings</TableCell>
                            <TableCell align="right">ReviewCount</TableCell>
                            <TableCell align="right">Created</TableCell>
                            <TableCell align="right">Updated</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.alias}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.location}</TableCell>
                            <TableCell align="right">{row.rating}</TableCell>
                            <TableCell align="right">{row.review}</TableCell>
                            <TableCell align="right">{row.created}</TableCell>
                            <TableCell align="right">{row.updated}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
    
}

export default Shift;