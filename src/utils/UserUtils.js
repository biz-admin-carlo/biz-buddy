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

        console.log(response.data);
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

export async function createUser(data) {
    try {
        const { email, password, firstName, lastName, birthday, teamName, teamRole } = data;

        const url = `${apiUrl}/api/v1/biz-buddy/users/register`;

        const response = await axios.post(url, {
            email,
            password,
            firstName,
            lastName,
            birthday,
            teamName,
            teamRole,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.userId) {
            return true;
        } else {
            return { success: false, message: 'Failed to register user.' };
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'An error occurred during user registration.' };
    }
}

export async function checkTokenActive() {
    try {
        const url = `${apiUrl}/api/v1/biz-buddy/users/check-token`;
        const token = localStorage.getItem('bb_session_token');  

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        if (response.status === 200) {
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        return false; 
    }
};