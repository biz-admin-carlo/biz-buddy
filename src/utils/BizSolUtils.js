import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const uniformNovember = 'biz.solutions@mail.com';
const papa = 'mike123mike123';
const sierra = 'https://bizsolutions-api-production.onrender.com';

export async function userLogin(email, password) {
    try {
        // /api/v1/users/login
        const url = `${sierra}/api/v1/users/login`;

        const response = await axios.post(url, {
            email: uniformNovember,
            password: papa
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

userLogin();