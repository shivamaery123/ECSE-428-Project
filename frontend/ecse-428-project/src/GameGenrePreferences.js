import React, { useState, useContext, useEffect } from 'react';
import { getUserIdByUsername, addGamePreference, removeGamePreference, retrieveGamePreferences} from './api.js';
import './GameGenrePreferences.css';

const GameGenrePreferences = () => {
    const [userId, setUserId] = useState(null);
    const [gamePreferences, setGamePreferences] = useState([]);
    const [message, setMessage] = useState('');
    const [game_preference, setGamePreference] = useState('');

    useEffect(() => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser && loggedInUser.data.username) {
                // Fetch and set user ID based on username
                const fetchUserId = async () => {
                    const response = await getUserIdByUsername(loggedInUser.data.username);
                    if (response.success) {
                        setUserId(response.data.data.user.user_id);
                    } else {
                        console.error('Error fetching user ID:', response.error);
                    }
                };

                fetchUserId();
            } else {
                throw new Error("user is not logged in, cannot access their username");
            }
        } catch (error) {
            console.error(error.message);
            setMessage(error.message);
        }
    }, []);

    const handleRetrieveGamePreferences = async () => {
        if(userId) {
            const response = await retrieveGamePreferences(userId);
            console.log(response);
            if (response.success) {
                let json = response.data.data;
                console.log(response.data.data);
                setGamePreferences([]);
                for(let i = 0; i < json.length; i++) {              
                    setGamePreferences(prevPrefs => [...prevPrefs, json[i]]);
                }
            } else {
                console.error('Error retrieving preferences:', response.error);
            }
        }
    }

    const handleAddPreference = async () => {
        
        const found = gamePreferences.includes(game_preference);

        if (found) {
            setMessage("Game preference already added.");
            return;
        }

        const response = await addGamePreference(userId, game_preference);

        if (response.success) {        
            setGamePreferences(prevPrefs => [...prevPrefs, game_preference]);
            setMessage("Game preference added successfully.");
        } else {
            console.error('Error adding preference:', response.error);
            setMessage("something went wrong dumbass");
        }
    }

    const handleRemovePreference = async () => {
        if (gamePreferences.length === 0) {
            setMessage("No preferences to remove.");
            return;
        }
        const found = gamePreferences.includes(game_preference);

        if (!found) {
            setMessage("Game preference not found.");
            return;
        }

        const response = await removeGamePreference(userId, game_preference);
        if (response.success) {
            const index = gamePreferences.indexOf(game_preference);
            setGamePreferences(gamePreferences.splice(index, 1));
            setMessage("Game preference removed successfully.");
        } else {
            console.error('Error removing game preference:', response.error);
            setMessage("Failed to remove game.");
        }
    };

    return (
        
        <div className="GameGenrePreferences">
            <h1>Game Genre:</h1>
            <div className="GameGenrePreferences-InputSection">
                    <select
                    id="select"
                        value={game_preference}
                        onChange={(e) => setGamePreference(e.target.value)}>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Racing">Racing</option>
                            <option value="Sports">Sports</option>
                            <option value="RPG">RPG</option>
                    </select>
                <button onClick={handleAddPreference}>Add Game Genre</button>
                <button 
                    onClick={handleRemovePreference} 
                >
                    Remove Game Genre
                </button>
            </div>

        {message && <div className="GameGenrePreferences-Message">{message}</div>}

        <div className="GameGenrePreferences-Listing">
            <h3>Game Genres Added:</h3>
            <button onClick={handleRetrieveGamePreferences}>List Added Genres</button>
            <div className="List">
            <ul>
                {gamePreferences.map((preference, index) => (
                <li key={index}>{preference}</li>
                ))}
             </ul>
            </div>
        </div>
    </div>
    );
}  

export default GameGenrePreferences;