// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap CSS
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
