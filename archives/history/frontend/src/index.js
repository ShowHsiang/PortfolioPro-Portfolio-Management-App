// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './AppRoutes';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);