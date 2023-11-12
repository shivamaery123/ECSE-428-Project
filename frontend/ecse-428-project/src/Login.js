import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { loginUser } from './api.js';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await loginUser(username, password);
        setUsername("");
        setPassword("");
        if (response.success) {
            console.log('Logged in successfully:', response.data);
            localStorage.setItem('loggedInUser', JSON.stringify(response.data)); //added by saif
        } else {
            console.error('Login failed:', response.error);
        }
    };


    return (
    <div className="Login">
        <div className="Login-Title">Create an account</div>
        <div className="Login-FormBackground">
            <form className="Login-Form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  password={true} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    type="submit" 
                    value="Login"
                />
                <p>You don't have an account? <Link to="/signup">Signup</Link></p>

            </form>

        </div>

    </div>
  );
}

export default Login;
