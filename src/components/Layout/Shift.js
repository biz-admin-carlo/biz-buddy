import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import ClipLoader from "react-spinners/ClipLoader";
import { BiSolidEdit, BiListPlus } from "react-icons/bi";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import FormDialog from '../Form/DialogForm';
import EditDialogForm from '../Form/EditDialogForm'

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

import { userTransactions, userDetails } from '../../utils/UserUtils';

function Shift() {
    const [ page, setPage ] = useState(1);
    const [ userInfo, setUserInfo ] = useState('');
    const [ transactions, setTransactions ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const rowsPerPage = 7;

    const [ dialogOpen, setDialogOpen ] = useState(false);
    const [ editDialogOpen, setEditDialogOpen ] = useState(false);
    const [ currentTransaction, setCurrentTransaction ] = useState(null);
    const [triggerFetch, setTriggerFetch] = useState(false);

    const actions = [
        { 
            icon: <BiListPlus />, 
            name: 'File a Manual Shift',
            action: () => setDialogOpen(true)
        },
        { icon: <BiSolidEdit />, name: 'File A Leave' },

    ];

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        const result = await userTransactions();
        if (result) {
            setTransactions(result);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchTransactions();
        async function fetchUserDetails() {
            const result = await userDetails();
            if (result) {
                setUserInfo(result);
            }
        }
        fetchUserDetails();
    }, [fetchTransactions]);

    const paginatedRows = transactions.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleEditDialogOpen = (transaction) => {
        setCurrentTransaction(transaction);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setCurrentTransaction(null);
        setTriggerFetch(prev => !prev);
    };

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions, triggerFetch]);

    return (
        <div style={{ padding: '10vh' }}>
            {loading ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh'
                }}>
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            ) : (
                <>
                    <div>
                        <h1 className="roboto-medium">Biz Buddy | Shifts</h1>
                        <h3 className="roboto-light">
                            Welcome {userInfo.firstName}! These are your logged transactions:
                        </h3>
                    </div>

                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="right">Scheduled Shift</TableCell>
                                        <TableCell align="right">Clock-In</TableCell>
                                        <TableCell align="right">Clock-Out</TableCell>
                                        <TableCell align="right">Lunch</TableCell>
                                        <TableCell align="right">Break</TableCell>
                                        <TableCell align="right">Working Hours</TableCell>
                                        <TableCell align="right">Edit Shift</TableCell>
                                        <TableCell align="right">Status</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedRows.map((row, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                <Link to={`/shifts/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    {new Date(row.date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                    })}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">-</TableCell>
                                            <TableCell align="right">{row.timeIn ? new Date(row.timeIn).toLocaleTimeString() : '-'}</TableCell>
                                            <TableCell align="right">{row.timeOut ? new Date(row.timeOut).toLocaleTimeString() : '-'}</TableCell>
                                            <TableCell align="right">{row.lunchHours || '-'}</TableCell>
                                            <TableCell align="right">{row.breakHours || '-'}</TableCell>
                                            <TableCell align="right">{row.totalHours}</TableCell>
                                            <TableCell align="right">
                                                <BiSolidEdit 
                                                    size={22} 
                                                    style={{ cursor: 'pointer' }} 
                                                    onClick={() => handleEditDialogOpen(row)} 
                                                />
                                            </TableCell>                                        
                                            <TableCell align="right">Pending</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    {transactions.length > rowsPerPage && (
                        <div style={{ marginTop: '5vh', display: 'flex', justifyContent: 'center' }}>
                            <Pagination
                                count={Math.ceil(transactions.length / rowsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                shape="rounded"
                            />
                        </div>
                    )}
                </>
            )}

            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 56, right: 56 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action} // Handle action click
                    />
                ))}
            </SpeedDial>

            <FormDialog open={dialogOpen} onClose={handleCloseDialog} />
            <EditDialogForm open={editDialogOpen} onClose={handleEditDialogClose} transaction={currentTransaction} />

        </div>
    );
    
}

export default Shift;
