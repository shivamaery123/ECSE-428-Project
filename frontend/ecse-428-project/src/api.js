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

export const getUserIdByUsername = async (username) => {
    try {
        const response = await axios.get(`http://localhost:8000/users/user?username=${username}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

export const getGameHistory = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8000/users/game/history?user_id=${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};

export const addGameToHistory = async (userId, game_name) => {
    try {
        const response = await axios.post('http://localhost:8000/users/game/add', { user_id: userId, game_name: game_name });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};

export const removeGameFromHistory = async (userId, game_name) => {
    try {

        const response = await axios.delete(`http://localhost:8000/users/game/remove?user_id=${userId}&game_name=${game_name}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};

export const clearGameHistory = async (userId) => {
    try {
        await axios.delete(`http://localhost:8000/users/game/clear?user_id=${userId}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};


export const getGame = async (game_name) => {
    try {
        const response = await axios.get(`http://localhost:8000/games/get?game_name=${game_name}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data || error.message };
    }
};
