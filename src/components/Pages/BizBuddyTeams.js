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
import { viewAllTeamNames } from '../../utils/SvUtils';

import '../../assets/fonts/roboto.css';
import '../../assets/fonts/color.css';
import '../../assets/styles/LoginForm.css';

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

function BizBuddyTeams({ userFName }) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 5; // Number of rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await viewAllTeamNames();
                if (data.teams) {
                    setTeams(data.teams);
                } else {
                    setError('Failed to fetch teams');
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Pagination logic to slice the teams for current page
    const paginatedTeams = teams.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Team Name</TableCell>
                            <TableCell align="right">Team Unique ID</TableCell>
                            <TableCell align="right">Team Alias</TableCell>
                            <TableCell align="right">Team Code</TableCell>
                            <TableCell align="right">Active Status</TableCell>
                            <TableCell align="right">Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedTeams.map((team, index) => (
                            <TableRow
                                key={team._id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#FFFFFF',
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <div className="cell-content">
                                        {team.teamName}
                                        <FaCircle
                                            style={{
                                                marginLeft: '4px',
                                                fontSize: '6px',
                                                color: team.isActive ? 'green' : 'red',
                                            }}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell align="right">{team.teamUniqueId}</TableCell>
                                <TableCell align="right">{team.teamAlias}</TableCell>
                                <TableCell align="right">{team.teamCode}</TableCell>
                                <TableCell align="right">{team.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell align="right">{formatDate(team.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                <Pagination
                    count={Math.ceil(teams.length / rowsPerPage)} // Total number of pages
                    page={page}
                    onChange={handleChangePage}
                    shape="rounded"
                />
            </div>
        </div>
    );
}

export default BizBuddyTeams;
