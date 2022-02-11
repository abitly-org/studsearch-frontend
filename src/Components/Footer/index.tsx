import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { P1, P2, P4 } from '../Text';
import { ReactComponent as InstagramIcon } from '../../Components/StudentCard/instagram.svg';

import Love from './love';
import './index.scss';
import Button from '../Button';
import { HeaderLanguages, HeaderTabs } from '../Header';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="Footer">
      <div className='socials'>
        <div className="nav">
          <HeaderTabs showAll />
          <br />
          <br />
          <HeaderLanguages />
        </div>
        <div>
          <a className='social telegram' href="https://t.me/StudSearch" target="_blank">
            <span className='social-icon'>
            </span>
            <P2>Telegram</P2>
          </a>
          <a className='social instagram' href="https://www.instagram.com/stud_search/" target="_blank">
            <span className='social-icon'>
              <InstagramIcon />
            </span>
            <P2>Instagram</P2>
          </a>
          <P2 style={{ marginTop: 8, fontSize: '80%', lineHeight: '120%' }}>
            Свої ідеї щодо покращення проекту можеш надсилати у Telegram та на пошту:
            <br />
            <br />
            <a href="https://t.me/VladBandurin" target="_blank">@VladBandurin</a>
            <br />
            <a href="https://t.me/dkaraush" target="_blank">@dkaraush</a>
            <br />
            <a href="mailto:studsearch.info@gmail.com" target="_blank">studsearch.info@gmail.com</a>
          </P2>
        </div>
      </div>
      <div className='loveletter'>
        <P4>{t('footer-love')}<Love /></P4>
        <P4>{t('footer-for')}</P4>
      </div>
    </div>
  )
}

export default Footer;
