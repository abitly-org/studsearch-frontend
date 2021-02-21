import * as React from 'react';
import * as ReactDOM from 'react-dom';

import i18next, { Resource, i18n } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resources from './locales';

import App from './App';
import './index.scss';

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uk-UA',
    keySeparator: false,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false
    }
  });

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);