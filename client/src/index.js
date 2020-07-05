import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/app-component';
import 'app/app.scss';

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.querySelector('.app-container')
);
