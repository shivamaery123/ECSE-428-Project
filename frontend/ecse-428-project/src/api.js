import axios from 'axios';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('/login', {
            username,
            password
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};
