import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignUp from './SignUp.js';
import Login from './Login.js';
import App from './App.js';
import GameHistoryManager from './GameHistoryManager.js';
//import reportWebVitals from './reportWebVitals';
//mport { BrowserRouter } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GameGenrePreferences from './GameGenrePreferences.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/history",
    element: <GameHistoryManager />
  },
  {
    path: "/preferences",
    element: <GameGenrePreferences />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
