import axios from 'axios';

export const signUpUser = async (username, email, password) => {
    try {
        const response = await axios.post('http://localhost:8000/users/create', {
            username,
            email,
            password
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};
