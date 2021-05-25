import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { P4 } from '../Text';

import Love from './love';
import './index.scss';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="Footer">
      <P4>{t('footer-love')}<Love /></P4>
      <P4>{t('footer-for')}</P4>
    </div>
  )
}

export default Footer;