import React, { useState } from 'react';
import './SignUp.css';
import { Link } from "react-router-dom";
import { signUpUser } from './api.js';

function SignUp() {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await signUpUser(username, email, password);
      setUsername("");
      setEmail("");
      setPassword("");
      if (response.success) {
          console.log('Signed in successfully:', response.data);
      } else {
          console.error('Sign in failed:', response.error);
      }

  };

  return (
    <div className="SignUp">
        <div className="SignUp-Title">Create an account</div>
        <div className="SignUp-FormBackground">
            <form className="SignUp-Form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    id="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value="Sign up"
                />

                <p>You already have an account? <Link to="/login">Log in</Link></p>
            </form>

        </div>

    </div>
  );
}

export default SignUp;
