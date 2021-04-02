import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Main } from './app/main';
import './app.css';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
    <Router>
        <Main />
    </Router>,
    document.getElementById('root')
);