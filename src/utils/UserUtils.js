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

export async function userDetails(token) {
    try {
        const url = `${apiUrl}/api/v1/biz-buddy/users/details`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        console.log(response.data);
        if (response.status === 200) {
            console.log('User Details:', response.data);
            return response.data; 
        } else {
            return false;
        }
    } catch (error) {
        return false; 
    }
}

export async function userTransactions(token) {
    try {
        const url = `${apiUrl}/api/v1/biz-buddy/users/transactions`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        if (response.status === 200) {
            return response.data; 
        } else {
            return false;  
        }
    } catch (error) {
        return false; 
    }
}