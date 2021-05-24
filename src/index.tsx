import * as React from 'react';
import { render } from 'react-dom';

import i18next, { Resource, i18n } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resources from './locales';

import App from './App';
import './index.scss';
import { getQuery } from './Helpers/api';

const languages = Object.keys(resources ?? {});

const lng = (
  getQuery('lng') ??
  window?.localStorage?.getItem?.('studsearch-lng') ?? 
  // languages.find(l => l.startsWith(window.navigator.language.substring(0, 2))) ??
  'uk-UA'
);
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng,
    keySeparator: false,
    fallbackLng: ['en-US', 'uk-UA'],
    interpolation: {
      escapeValue: false
    }
  });

console.log('%cОтакої, добрий день!', 'font-weight: bold; font-size: 18px;')
console.log('%cЯ бачу ви розробник. Якщо це дійсно так, то ласкаво просимо в нашу команду!', 'font-size: 14px;')
console.log('%chttps://t.me/dkaraush', 'font-size: 14px;')

render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);