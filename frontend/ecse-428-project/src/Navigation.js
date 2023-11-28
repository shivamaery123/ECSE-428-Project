import './Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="Navigation">
      <Link to="/">Home</Link>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/account">Account</Link>
      <Link to="/history">Game History</Link>
    </div>
  );
}

export default Navigation;
