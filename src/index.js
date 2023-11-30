// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');

// Use createRoot from "react-dom/client"
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(<App />);