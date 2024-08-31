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

function createData(
  name: string,
  calories: string,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Sick Leave', 15, "-", 24, 4.0),
  createData('Emergency Leave', 15, "-", 37, 4.3),
  createData('Birthday Leave', 15, "-", 24, 6.0),
  createData('Vacation Leave', 15, "-", 67, 4.3),
];

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
          icon: <BiSolidEdit />, 
          name: 'File A Leave',
          action: () => setDialogOpen(true)
      }
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
                        <h1 className="roboto-medium">Biz Buddy | Leaves</h1>
                        <h3 className="roboto-light">
                            Welcome {userInfo.firstName}! These are your available leaves credits:
                        </h3>
                    </div>

                    <div>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Types of Leaves</TableCell>
                            <TableCell align="right">Available Leave</TableCell>
                            <TableCell align="right">Consumed Leave</TableCell>
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
                              <TableCell align="right">{row.calories}</TableCell>
                              <TableCell align="right">{row.fat}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </div>

                    <br/>

                    <div>
                    <h3 className="roboto-bold">
                            Approved Leaves
                        </h3>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Requested On</TableCell>
                            <TableCell align="right">Approved On</TableCell>
                            <TableCell align="right">Approved By</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                Friday, August 30, 2024
                              </TableCell>
                              <TableCell align="right">Friday, August 20, 2024</TableCell>
                              <TableCell align="right">Friday, August 25, 2024</TableCell>
                              <TableCell align="right">Carlo Corcuera</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </div>

                    <br/>

                    <div>
                    <h3 className="roboto-bold">
                            Pending Leaves
                        </h3>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Requested On</TableCell>
                            <TableCell align="right">Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                Friday, August 30, 2024
                              </TableCell>
                              <TableCell align="right">Friday, August 20, 2024</TableCell>
                              <TableCell align="right">Requested</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </div>
                    
                    <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 56, right: 56 }}
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

                </>
            )}

        </div>
    );
    
}

export default Shift;
