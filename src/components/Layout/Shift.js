import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

import { userTransactions, userDetails } from '../../utils/UserUtils';

function Shift() {
    const [ page, setPage ] = useState(1);
    const [ userInfo, setUserInfo ] = useState('');
    const [ transactions, setTransactions ] = useState([]);
    const rowsPerPage = 7;

    useEffect(() => {
        async function fetchTransactions() {
            const result = await userTransactions();
            if (result) {
                setTransactions(result); 
            }
        }

        async function fetchUserDetails() {
            const result = await userDetails();
            if(result) {
                setUserInfo(result);
            }
        }

        fetchTransactions();
        fetchUserDetails();
    }, []);

    const paginatedRows = transactions.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <div style={{ padding: '10vh' }}>
                <h1 className="roboto-medium">Biz Buddy | Shifts</h1>
                <h3 className="roboto-light">
                    Welcome {userInfo.firstName}! These are your logged transactions:
                </h3>

                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Clock-In</TableCell>
                                    <TableCell align="right">Clock-Out</TableCell>
                                    <TableCell align="right">Lunch</TableCell>
                                    <TableCell align="right">Break</TableCell>
                                    <TableCell align="right">Working Hours</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedRows.map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {new Date(row.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell align="right">{row.timeIn ? new Date(row.timeIn).toLocaleTimeString() : '-'}</TableCell>
                                        <TableCell align="right">{row.timeOut ? new Date(row.timeOut).toLocaleTimeString() : '-'}</TableCell>
                                        <TableCell align="right">{row.lunchHours || '-'}</TableCell>
                                        <TableCell align="right">{row.breakHours || '-'}</TableCell>
                                        <TableCell align="right">{row.totalHours}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginTop: '5vh', display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={Math.ceil(transactions.length / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        shape="rounded"
                    />
                </div>
            </div>
        </>
    );
}

export default Shift;
