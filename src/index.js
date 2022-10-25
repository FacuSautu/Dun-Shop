import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { initializeApp } from "firebase/app";

// Configuracion del Web App de FireBase
const firebaseConfig = {
  apiKey: "AIzaSyDuHqEyPUiiJC4Vu7W6OY_jfj77eHeyUvc",
  authDomain: "dun-shop-8a7a2.firebaseapp.com",
  projectId: "dun-shop-8a7a2",
  storageBucket: "dun-shop-8a7a2.appspot.com",
  messagingSenderId: "379464895655",
  appId: "1:379464895655:web:f157e778a6988e1b27df82"
};

// Inicialización de FireBase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

