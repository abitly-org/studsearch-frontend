import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../Components/Button';
import { H1, P1, P2 } from '../../Components/Text';
import { useRegistered } from '../../Helpers/session';

import bg from './bg.png';

import './index.scss';

const BlockDiscover = () => {
  const { t } = useTranslation();
  const registered = useRegistered();
  
  return (
    <div className="BlockDiscover" style={{ backgroundImage: `url(${bg})` }}>
      <div>
        <div className="Info">
          <H1>{t('block-discover-header')}</H1>
          <br />
          <br />
          <ul className='ul'>
            <li><P1>{t('block-discover-question1')}</P1></li>
            <li><P1>{t('block-discover-question2')}</P1></li>
            <li><P1>{t('block-discover-question3')}</P1></li>
            <li><P1>{t('block-discover-question4')}</P1></li>
          </ul>
          <br />
          <P1>{t('block-discover-body1')}</P1>
          <P1>{t('block-discover-body2')}</P1>
          <br />
          <br />
          {/* <Button to="/students">
            <P2>{t('block-discover-button')}</P2>
          </Button> */}
          { !registered &&
            <Button to="/register">
              <P2>{t('block-discover-button-register')}</P2>
            </Button>
          }
        </div>
      </div>
    </div>
  );
}
export default BlockDiscover;