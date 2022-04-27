import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from 'recoil';
import {Provider} from '@dhis2/app-runtime';
import Alerts from "./shared/components/Alerts";
import "./locales"

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <Provider config={{baseUrl: process.env.REACT_APP_BASEURL ?? "", apiVersion: 33}}>
                <App/>
                <Alerts/>
            </Provider>
        </RecoilRoot>

    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
