import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from '@dhis2/app-runtime';

const appConfig:any = {
  baseUrl: process.env.REACT_APP_BASEURL,
  apiVersion: process.env.REACT_APP_APIVERSION ,
}

ReactDOM.render(
  <React.StrictMode>
    <Provider config={appConfig}>
    <App />
    </Provider>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
