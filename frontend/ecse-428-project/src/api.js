import axios from 'axios';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8000/users/login', {
            username,
            password
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};

export const signUpUser = async (username, email, password) => {
    try {
        const response = await axios.post('http://localhost:8000/users/register', {
            username,
            email,
            password
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};

export const getGameHistory = async (userId) => {
    try {
        const response = await axios.get(`/user?user_id=${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};

export const addGameToHistory = async (userId, game) => {
    try {
        const response = await axios.post('/addGameToHistory', { user_id: userId, game });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};

export const removeGameFromHistory = async (userId, game) => {
    try {
        const response = await axios.post('/removeGameFromHistory', { user_id: userId, game });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};

export const clearGameHistory = async (userId) => {
    try {
        await axios.post('/ClearGameHistory', { user_id: userId });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};
