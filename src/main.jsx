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

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://localhost:7177/api' //HTTPS
// axios.defaults.baseURL = 'http://192.168.0.161:5023/api' //HTTP