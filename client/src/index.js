import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import translation_ua from './translations/ua/translation.json';
import translation_en from './translations/en/translation.json';

i18next
    .use(initReactI18next)
    .init({
        debug: true,
        lng: 'en',
        interpolation: {
            escapeValue: false
        },
        resources: {
            ua: {
                translation: translation_ua
            },
            en: {
                translation: translation_en
            }
        }
    });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
