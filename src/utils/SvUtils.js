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