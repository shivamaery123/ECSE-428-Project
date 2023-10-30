import React, { useState, useEffect } from 'react';
import axios from 'axios';

const gameHistoryManager = () => {
    const { userId } = useContext(UserContext); //NOTE: THIS LINE NEEDS TO BE CHANGED BASED ON HOW THE USER'S INFO IS STORED WHEN THEY LOG IN.
    const [game, setGame] = useState('');
    const [gameHistory, setGameHistory] = useState([]);
    const [message, setMessage] = useState('');

    const handleRetrieveGameHistory = () => {
        if (userId) {
            axios.get(`/user?user_id=${userId}`)
                .then(response => {
                    setGameHistory(JSON.parse(response.data.user.game_history));
                })
                .catch(error => {
                    console.error('Error retrieving game history:', error);
                });
        }
    };

      const handleAddGame = () => {
        axios.post('/addGameToHistory', { user_id: userId, game })
            .then(response => {
                // Update the game history state after successfully adding a game
                setGameHistory(prevHistory => [...prevHistory, game]);
                setMessage("Game added successfully.");
            })
            .catch(error => {
                console.error('Error adding game:', error);
            });
    };

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

export default gameHistoryManager;
