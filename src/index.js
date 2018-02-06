import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const element = document.getElementById('content');
ReactDOM.render(<App />, element);

document.body.classList.remove('loading');
document.body.style.margin = 0;
