import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function splitFullName(fullName) {
    const nameParts = fullName.trim().split(' '); // Split by spaces
    const firstName = nameParts[0]; // First part is the firstName
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''; // Rest is the lastName
    return { firstName, lastName };
}

export async function viewAllAccounts() {
    try {
        const url = `${apiUrl}/api/v1/biz-buddy/sv/view-all-accounts`;
        const token = localStorage.getItem('bb_session_token');  

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        if (response.status === 200) {
            return response.data; 
        } else {
            return false;
        }
    } catch (error) {
        return false; 
    }
}

export async function viewlAllAgentAccounts() {
    try {
        const url = `${apiUrl}/api/v1/biz-buddy/sv/view-all-accounts/name`;
        const token = localStorage.getItem('bb_session_token');  

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        if (response.status === 200) {
            return response.data; 
        } else {
            return false;
        }
    } catch (error) {
        return false; 
    }
}

export async function retrieveShiftsUsingName({ fullName }) {
    // Split the fullName into firstName and lastName
    const { firstName, lastName } = splitFullName(fullName);
    
    const url = `${apiUrl}/api/v1/biz-buddy/sv/shifts/view/${firstName}/${lastName}/`;

    try {
        const token = localStorage.getItem('bb_session_token');
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error retrieving shifts:', error);
        return false;
    }
}

export async function retrieveSceduleUsingName({ fullName }) {
    const { firstName, lastName } = splitFullName(fullName);
    
    const url = `${apiUrl}/api/v1/biz-buddy/sv/view-created-shifts/${firstName}/${lastName}/`;

    try {
        const token = localStorage.getItem('bb_session_token');
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error retrieving shifts:', error);
        return false;
    }
}

export async function retrieveShiftsWeekly({ userID }) {
    const { firstName, lastName } = splitFullName(userID);    
    const url = `${apiUrl}/api/v1/biz-buddy/sv/view/${firstName}/${lastName}/weekly/`;

    try {
        const token = localStorage.getItem('bb_session_token');
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error retrieving shifts:', error);
        return false;
    }
};

export async function retrieveShiftsBiMonthly({ userID }) {
    const { firstName, lastName } = splitFullName(userID);    
    const url = `${apiUrl}/api/v1/biz-buddy/sv/view/${firstName}/${lastName}/bi-monthly/`;

    try {
        const token = localStorage.getItem('bb_session_token');
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error retrieving shifts:', error);
        return false;
    }
}

export async function retrieveShiftsMonthly({ userID }) {
    const { firstName, lastName } = splitFullName(userID);    
    const url = `${apiUrl}/api/v1/biz-buddy/sv/view/${firstName}/${lastName}/monthly/`;

    try {
        const token = localStorage.getItem('bb_session_token');
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error retrieving shifts:', error);
        return false;
    }
}

export async function retrieveShiftsUpcoming({ userID }) {
    const { firstName, lastName } = splitFullName(userID);    
    const url = `${apiUrl}/api/v1/biz-buddy/sv/view/${firstName}/${lastName}/upcoming/`;

    try {
        const token = localStorage.getItem('bb_session_token');
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error retrieving shifts:', error);
        return false;
    }
}

export async function createScheduleShift( formData ) {
    const { agentName, endDate, startDate, supposedClockedIn, supposedClockedOut } = formData;
    const { firstName, lastName } = splitFullName(agentName);

    const url = `${apiUrl}/api/v1/biz-buddy/sv/create-new-shift/${firstName}/${lastName}/`;

    try {
        const token = localStorage.getItem('bb_session_token');
        const response = await axios.post(url, {
            startDate,
            endDate,
            supposedClockedIn,
            supposedClockedOut
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.status === 201 ? true : false;
    } catch (error) {
        // console.error('Error creating schedule shift:', error);
        return false;
    }
}

export async function createTeam( formData ) {
    const { teamName, teamAlias, teamCode } = formData;

    const url = `${apiUrl}/api/v1/biz-buddy/sv/create/team-name/`;

    try {
        const token = localStorage.getItem('bb_session_token');
        const response = await axios.post(url, {
            teamName,
            teamAlias,
            teamCode,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.status === 201 ? true : false;
    } catch (error) {
        // console.error('Error creating schedule shift:', error);
        return false;
    }
}

export async function viewAllTeamNames() {
    try {
        const url = `${apiUrl}/api/v1/biz-buddy/sv/view/team-name/`;
        const token = localStorage.getItem('bb_session_token');  

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        if (response.status === 200) {
            return response.data; 
        } else {
            return false;
        }
    } catch (error) {
        return false; 
    }
}