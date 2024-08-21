import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export async function clockInClockOut() {
    const token = localStorage.getItem('bb_session_token');  
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    try {
        const url = `${apiUrl}/api/v1/biz-buddy/time-logs/clock-in/clock-out`;

        const response = await axios.post(url, {}, { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'TimeZone': timeZone
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
