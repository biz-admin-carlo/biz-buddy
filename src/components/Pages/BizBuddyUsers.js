import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Generate from '../Base/Generate';
import Pagination from '@mui/material/Pagination';
import BaseSpeedDial from '../Base/UserSpeedDial';
import { FaCircle } from "react-icons/fa";

import { viewAllAccounts } from '../../utils/SvUtils';

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

const getFullName = (account) => `${account.firstName} ${account.lastName}`;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',  
        month: 'short',   
        day: 'numeric',  
        hour: '2-digit',  
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(date);
};

function BizBuddyUsers({ userFName }) {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 5; // Number of rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await viewAllAccounts();
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const extractionDate = new Date().toLocaleString();
    
    // Pagination logic to slice the accounts for current page
    const paginatedAccounts = accounts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">DOB</TableCell>
                            <TableCell align="right">Team</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell align="right">Admin</TableCell>
                            <TableCell align="right">Supervisor</TableCell>
                            <TableCell align="right">Last Access</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedAccounts.map((account, index) => (
                            <TableRow
                                key={account.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#FFFFFF',
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <div className="cell-content">
                                        {getFullName(account)}
                                        <FaCircle
                                            style={{
                                                marginLeft: '4px',
                                                fontSize: '6px',
                                                color: account.isActive ? 'green' : 'red',
                                            }}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell align="right">{account.email || '-'}</TableCell>
                                <TableCell align="right">{account.birthday || '-'}</TableCell>
                                <TableCell align="right">{account.teamName || '-'}</TableCell>
                                <TableCell align="right">{account.teamRole || '-'}</TableCell>
                                <TableCell align="right">{account.isSysAd ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">{account.isSv ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">
                                    {account.loginDetails.length > 0
                                        ? formatDate(account.loginDetails[account.loginDetails.length - 1].timeDateDetails)
                                        : '-'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                <Pagination
                    count={Math.ceil(accounts.length / rowsPerPage)} // Total number of pages
                    page={page}
                    onChange={handleChangePage}
                    shape="rounded"
                />
            </div>

            <BaseSpeedDial />
            <Generate accounts={accounts} extractionDate={extractionDate} userEmail={userFName} />
        </div>
    );
}

export default BizBuddyUsers;
