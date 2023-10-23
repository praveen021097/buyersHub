import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios"
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

axios.defaults.baseURL="http://localhost:5000"
axios.defaults.headers.post["Content-Type"]="application/json";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


