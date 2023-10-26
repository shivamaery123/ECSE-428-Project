import React, { useState } from 'react';
import { loginUser } from './api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await loginUser(username, password);
        
        if (response.success) {
            console.log('Logged in successfully:', response.data);
        } else {
            console.error('Login failed:', response.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
