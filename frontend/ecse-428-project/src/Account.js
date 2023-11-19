import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { getUserIdByUsername } from './api.js';
import './Account.css';

function ViewAccount() {
    const [username, setUsername] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await getUserIdByUsername(username);
        setUsername("");
        if (response.success) {
            console.log('Account retrieved successfully:', response.data);
            localStorage.setItem('userdata', JSON.stringify(response.data)); //added by saif
        } else {
            console.error('Account retrieval failed:', response.error);
        }
    };


    return (
    <div className="ViewAccount">
        <div className="ViewAccount-Title">View Your Account</div>
        <div className="ViewAccount-Fields">
            <h3>Username: </h3>
            <p>{response.username}</p>
            <h3>Password: </h3>
            <p>{response.password}</p>
            <h3>Email: </h3>
            <p>{response.email}</p>
        </div>
    </div>
  );
}

export default ViewAccount;