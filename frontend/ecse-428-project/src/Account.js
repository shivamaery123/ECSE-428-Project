import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { getUserIdByUsername } from './api.js';
import './Account.css';

function ViewAccount() {
    const [username, setUsername] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await getUserIdByUsername(username);
        setUsername("");

        if (result.success) {
            console.log('Account retrieved successfully:', result.data);
            setResponse(result.data); // Update the state with the response
            localStorage.setItem('userdata', JSON.stringify(result.data));
        } else {
            console.error('Account retrieval failed:', result.error);
        }
    };

    return (
        <div className="ViewAccount">
            <div className="ViewAccount-Title">View Your Account</div>
            <div className="ViewAccount-Fields">
                <form onSubmit={handleSubmit}>
                    <label>
                        Enter Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                
                {/* Display response data */}
                {response && (
                    <div>
                        <h3>Username: </h3>
                        <p>{response.username}</p>
                        <h3>Password: </h3>
                        <p>{response.password}</p>
                        <h3>Email: </h3>
                        <p>{response.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewAccount;
