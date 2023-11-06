import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext'; //see comment on line 6
import { getGameHistory, addGameToHistory, removeGameFromHistory, clearGameHistory } from './api';
import './GameHistoryManager.css';

const GameHistoryManager = () => {
    const { userId } = useContext(UserContext); // not sure how to implement this line
    const [game, setGame] = useState('');
    const [gameHistory, setGameHistory] = useState([]);
    const [message, setMessage] = useState('');

    const handleRetrieveGameHistory = async () => {
        if (userId) {
            const response = await getGameHistory(userId);
            if (response.success) {
                setGameHistory(response.data.user.game_history);
            } else {
                console.error('Error retrieving game history:', response.error);
            }
        }
    };

    const handleAddGame = async () => {
        const response = await addGameToHistory(userId, game);
        if (response.success) {
            setGameHistory(prevHistory => [...prevHistory, game]);
            setMessage("Game added successfully.");
        } else {
            console.error('Error adding game:', response.error);
        }
    };


    const handleRemoveGame = async () => {
        if (gameHistory.length === 0) {
            setMessage("No games in your history to remove.");
            return;
        }
        if (!gameHistory.includes(game)) {
            setMessage("Game not found in history.");
            return;
        }

        const response = await removeGameFromHistory(userId, game);
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
        <div>
            {/* Removed the User ID input as it's now obtained from context */}
            <div>
                <label>Game:</label>
                <input type="text" value={game} onChange={e => setGame(e.target.value)} />
                <button onClick={handleAddGame}>Add Game</button>
                <button onClick={handleRemoveGame}>Remove Game</button>
            </div>

            <button onClick={handleRetrieveGameHistory}>Retrieve Game History</button>
            <button onClick={handleClearHistory}>Clear Game History</button>

            <div>
                <h3>Game History:</h3>
                <ul>
                    {gameHistory.map((g, index) => <li key={index}>{g}</li>)}
                </ul>
            </div>
        </div>
    );
};


export default gameHistoryManager;


'''
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
'''
