import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
axios.defaults.baseURL = process.env.API_URL ?? "https://api.dotforum.nikoloz.xyz:3001/api"

axios.defaults.withCredentials = true
