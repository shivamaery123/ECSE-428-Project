import React, { useState, useContext, useEffect } from 'react';
import { getUserIdByUsername, getGameHistory, addGameToHistory, removeGameFromHistory, clearGameHistory, getGame } from './api.js';
import './GameHistoryManager.css';

const GameHistoryManager = () => {
    const [userId, setUserId] = useState(null);
    const [game_name, setGameName] = useState('');
    const [gameHistory, setGameHistory] = useState([]);
    const [message, setMessage] = useState('');
    
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
                throw new Error("user is not logged in, cannot access their username in GameHistoryManager");
            }
        } catch (error) {
            console.error(error.message);
            setMessage(error.message);
        }
    }, []);
    
    
    const handleRetrieveGameHistory = async () => {
        if (userId) {
            const response = await getGameHistory(userId);
            if (response.success) {
                console.log(response);
                setGameHistory(response.data.data);
            } else {
                console.error('Error retrieving game history:', response.error);
            }
        }
    };

    const handleAddGame = async () => {
        const response = await addGameToHistory(userId, game_name);
        const game_resp = await getGame(game_name);
        const game = game_resp.data.game;
        if (response.success) {
            setGameHistory(prevHistory => [...prevHistory, game]);
            setMessage("Game added successfully.");
        } else {
            console.error('Error adding game:', response.error);
        }
    };


    const handleRemoveGame = async () => {
        const response1 = await getGame(game_name);
        const game = response1.data.game;
        if (gameHistory.length === 0) {
            setMessage("No games in your history to remove.");
            return;
        }
        if (!gameHistory.includes(game)) {
            setMessage("Game not found in history.");
            return;
        }

        const response = await removeGameFromHistory(userId, game_name);
        if (response.success) {
            setGameHistory(prevHistory => prevHistory.filter(g => g !== game));
            setMessage("Game removed successfully.");
        } else {
            console.error('Error removing game:', response.error);
            setMessage("Failed to remove game.");
        }
    };

    const handleClearHistory = async () => {
        if (gameHistory.length === 0) {
            setMessage("No games in your history to clear.");
            return;
        }

        const response = await clearGameHistory(userId);
        if (response.success) {
            setGameHistory([]);
            setMessage("Game history cleared successfully.");
        } else {
            console.error('Error clearing game history:', response.error);
            setMessage("Failed to clear game history.");
        }
    };
    
    return (
    <div className="GameHistoryManager">
        <div className="GameHistoryManager-InputSection">
            <label>Game:</label>
            <input 
              type="text" 
              value={game_name} 
              onChange={e => setGameName(e.target.value)} 
            />
            <button onClick={handleAddGame}>Add Game</button>
            <button 
              onClick={handleRemoveGame} 
              disabled={gameHistory.length === 0}
            >
              Remove Game
            </button>
        </div>

        <button onClick={handleRetrieveGameHistory}>Retrieve Game History</button>
        <button 
          onClick={handleClearHistory} 
          disabled={gameHistory.length === 0}
        >
          Clear Game History
        </button>

        {message && <div className="GameHistoryManager-Message">{message}</div>}

        <div className="GameHistoryManager-History">
            <h3>Game History:</h3>
            <ul>
                {gameHistory.map((g, index) => <li key={index}>{g}</li>)}
            </ul>
        </div>
    </div>
);

}
export default GameHistoryManager;

/*
    const handleRemoveGame = () => {
        if (gameHistory.length === 0) {
            setMessage("No games are in your game history.");
            return;
        }
        if (!gameHistory.includes(game)) {
            setMessage("Game not found in history.");
            return;
        }

        axios.post('/removeGameFromHistory', { user_id: userId, game })
            .then(response => {
                // Update the game history state after successfully removing a game
                setGameHistory(prevHistory => prevHistory.filter(g => g !== game));
                setMessage("Game removed successfully.");
            })
            .catch(error => {
                console.error('Error removing game:', error);
            });
    };

    const handleClearHistory = () => {

          if (gameHistory.length === 0) {
            setMessage("No games are in your game history.");
            return;
        }
        axios.post('/ClearGameHistory', { user_id: userId })
            .then(() => {
                setGameHistory([]);
                setMessage("Game history cleared successfully.");
            })
            .catch(error => {
                console.error('Error clearing game history:', error);
            });
    };
*/

