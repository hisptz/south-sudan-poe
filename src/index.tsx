import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./locales";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from 'recoil';
import {Provider} from '@dhis2/app-runtime';
import Alerts from "./shared/components/Alerts";
import i18n from "@dhis2/d2-i18n";
import {changeLocale} from "./shared/utils/language";

i18n.setDefaultNamespace('default')
const locale = localStorage.getItem('locale') || 'en';
changeLocale(locale);

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
