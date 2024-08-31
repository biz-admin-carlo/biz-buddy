import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export async function userLogin(email, password) {
    try {
        const url = `${apiUrl}/api/v1/biz-buddy/users/login`;

        const response = await axios.post(url, {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.accessToken) {
            localStorage.setItem('bb_session_token', response.data.accessToken); 
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function userDetails() {
    try {
        const url = `${apiUrl}/api/v1/biz-buddy/users/details`;
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

export async function userWorkDetails() {
    try {
        const url = `${apiUrl}/api/v1/biz-buddy/users/work-details`;
        const token = localStorage.getItem('bb_session_token');  

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        if (response.status === 200) {
            return response.data.workDetails; 
        } else {
            return false;
        }
    } catch (error) {
        return false; 
    }
}

export async function userTransactions() {
    try {
        const token = localStorage.getItem('bb_session_token');  
        const url = `${apiUrl}/api/v1/biz-buddy/users/transactions`;
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

export async function checkExistingTransactions() {
    const token = localStorage.getItem('bb_session_token');  

    try {
        const url = `${apiUrl}/api/v1/biz-buddy/users/check-transactions`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.data) { 
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        // console.error('Error during clock-in/clock-out:', error); 
        return false;
    }
}