

import React, { StrictMode } from 'react';
import  ReactDOM  from 'react-dom';
import App from './App'
import './style.css'

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
)