import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const APP_VERSION = '1.3.3.1';

function checkStorageVersion() {
    const storedLocalVersion = localStorage.getItem('appVersion');
    if (storedLocalVersion !== APP_VERSION) {
        localStorage.clear();
        localStorage.setItem('appVersion', APP_VERSION);
    }

    const storedSessionVersion = sessionStorage.getItem('appVersion');
    if (storedSessionVersion !== APP_VERSION) {
        sessionStorage.clear();
        sessionStorage.setItem('appVersion', APP_VERSION);
    }
}

checkStorageVersion();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
