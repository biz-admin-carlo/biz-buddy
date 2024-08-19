import React, { useState } from 'react';
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

function createData(name, timeIn, timeOut, totalTime, breakHours) {
    return { name, timeIn, timeOut, totalTime, breakHours };
}

const rows = [
    createData('Saturday, August 17, 2024', '09:53:16', '17:30:16', '8.5', '1.0'),
    createData('Friday, August 16, 2024', '10:00:00', '19:00:00', '9.0', '1.5'),
    createData('Thursday, August 15, 2024', '08:30:00', '17:30:00', '8.0', '1.0'),
    createData('Wednesday, August 14, 2024', '-', '-', '-', '-'),
    createData('Tuesday, August 13, 2024', '08:45:00', '17:15:00', '8.0', '1.0'),
    createData('Monday, August 12, 2024', '08:30:00', '17:30:00', '8.5', '1.0'),
    createData('Sunday, August 11, 2024', '09:00:00', '18:00:00', '8.0', '1.0'),
    createData('Saturday, August 10, 2024', '09:30:00', '17:00:00', '7.5', '0.5'),
    createData('Saturday, August 17, 2024', '09:53:16', '17:30:16', '8.5', '1.0'),
    createData('Friday, August 16, 2024', '10:00:00', '19:00:00', '9.0', '1.5'),
    createData('Thursday, August 15, 2024', '08:30:00', '17:30:00', '8.0', '1.0'),
    createData('Wednesday, August 14, 2024', '-', '-', '-', '-'),
    createData('Tuesday, August 13, 2024', '08:45:00', '17:15:00', '8.0', '1.0'),
    createData('Monday, August 12, 2024', '08:30:00', '17:30:00', '8.5', '1.0'),
    createData('Sunday, August 11, 2024', '09:00:00', '18:00:00', '8.0', '1.0'),
    createData('Saturday, August 10, 2024', '09:30:00', '17:00:00', '7.5', '0.5'),
    createData('Saturday, August 17, 2024', '09:53:16', '17:30:16', '8.5', '1.0'),
    createData('Friday, August 16, 2024', '10:00:00', '19:00:00', '9.0', '1.5'),
    createData('Thursday, August 15, 2024', '08:30:00', '17:30:00', '8.0', '1.0'),
    createData('Wednesday, August 14, 2024', '-', '-', '-', '-'),
    createData('Tuesday, August 13, 2024', '08:45:00', '17:15:00', '8.0', '1.0'),
    createData('Monday, August 12, 2024', '08:30:00', '17:30:00', '8.5', '1.0'),
    createData('Sunday, August 11, 2024', '09:00:00', '18:00:00', '8.0', '1.0'),
    createData('Saturday, August 10, 2024', '09:30:00', '17:00:00', '7.5', '0.5'),
    createData('Saturday, August 17, 2024', '09:53:16', '17:30:16', '8.5', '1.0'),
    createData('Friday, August 16, 2024', '10:00:00', '19:00:00', '9.0', '1.5'),
    createData('Thursday, August 15, 2024', '08:30:00', '17:30:00', '8.0', '1.0'),
    createData('Wednesday, August 14, 2024', '-', '-', '-', '-'),
    createData('Tuesday, August 13, 2024', '08:45:00', '17:15:00', '8.0', '1.0'),
    createData('Monday, August 12, 2024', '08:30:00', '17:30:00', '8.5', '1.0'),
    createData('Sunday, August 11, 2024', '09:00:00', '18:00:00', '8.0', '1.0'),
    createData('Saturday, August 10, 2024', '09:30:00', '17:00:00', '7.5', '0.5'),
    
];

function Shift() {
    const [page, setPage] = useState(1);
    const rowsPerPage = 7;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const paginatedRows = rows.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    return (
        <>
            <div style={{ padding: '10vh' }}>
                <h1 className="roboto-medium">Biz Buddy | Shifts</h1>
                <h3 className="roboto-light">
                    Welcome token.userData.firstName! These are your logged transactions:
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
                                {paginatedRows.map((row) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.timeIn}</TableCell>
                                        <TableCell align="right">{row.timeOut}</TableCell>
                                        <TableCell align="right">{row.breakHours}</TableCell>
                                        <TableCell align="right">{row.breakHours}</TableCell>
                                        <TableCell align="right">{row.totalTime}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginTop: '5vh', display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
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