import React from 'react';
import { ReactDOM } from 'react-dom/client';

let el = document.getElementById('root');

const root = ReactDOM.createRoot(el);

const App = require('./app')

root.render(
    <App/>
)
