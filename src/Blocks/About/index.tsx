import * as React from 'react';
import { H3, P1 } from '../../Components/Text';

import logo from '../../Components/Header/logo.svg';

import './index.scss';
import { useTranslation } from 'react-i18next';

const BlockAbout = () => {
  const { t } = useTranslation();

  return (
    <div className="BlockAbout">
      <P1><img alt="StudSearch" aria-label="StudSearch" src={logo} />{t('block-about-1-text')}</P1>
      <br />
      <br />
      <br />
      <H3>{t('block-about-2-header')}</H3>
      <br />
      <br />
      <P1>{t('block-about-2-overall')}</P1>
      <br />
      <br />
      <P1>{t('block-about-2-text')}</P1>
    </div>
  );
}


export default BlockAbout;