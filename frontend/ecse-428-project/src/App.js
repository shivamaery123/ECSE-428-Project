import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="MainPage">
      <header className="App-header">
        <h1>Game History Application</h1>
      </header>

      <div className="Links">
        <Link to="/login">Log In</Link> <br />
        <Link to="/signup">Sign Up</Link> <br />
        <Link to="/account">Account</Link> <br />
        <Link to="/history">Game History</Link> <br />
      </div>
    </div>
  );
}

export default App;
