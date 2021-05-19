import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../Components/Button';
import { H2, H3, H4, P1, P2, P3 } from '../../Components/Text';

import './index.scss';

const HelpPage = () => {
  const { t } = useTranslation();

  return (
    <div className='HelpPage'>
      <div className='Content'>
        <H2>{t('help-header')}</H2>
        <br />
        <br />
        <br />
        <div className='HelpBlocks'>
          {/* <div className='HelpBlock students'>
            <H4>Зарегистрируйтесь студентом-волонтёром</H4>
            <br />
            <br />
            <P2>Если вы уже студент или имеете высшее образование, зарегистрируйтесь волонтёром на StudSearch!</P2>
            <br />
            <P2>Делитесь вашим личным опытом с абитуриентами, отвечая на вопросы о вашем ВУЗе. Вы можете порекомендовать специальность или факультет, ведь вы уже прошли через этот выбор.</P2>
            <br />
            <br />
            <br />
            <Button to="/register">
              <P2>Зарегистрироваться</P2>
            </Button>
          </div> */}
          <div className='HelpBlock ad'>
            <H4>{t('help-ad-header')}</H4>
            <br />
            <br />
            <P2>{t('help-ad-text1')}</P2>
            <br />
            <P2>{t('help-ad-text2')}</P2>
            <br />
            <br />
            <Button href="https://t.me/VladBandurin">
              <P2>{t('help-ad-button')}</P2>
            </Button>
          </div>
          <div className='HelpBlock money'>
            <H4>{t('help-money-header')}</H4>
            <br />
            <br />
            <P2>{t('help-money-text1')}</P2>
            <br />
            <P2>{t('help-money-text2')}</P2>
            <br />
            <Button href="https://t.me/VladBandurin">
              <P2>{t('help-money-button')}</P2>
            </Button>
          </div>
          <div className='HelpBlock volunteers'>
            <H4>{t('help-volunteers-header')}</H4>
            <br />
            <br />
            <P2>{t('help-volunteers-text')}</P2>
            <br />
            <P2>
              <b>{t('help-volunteers-marketing')}</b>
            </P2>
            <P2>
              <b>{t('help-volunteers-developers')}</b>
              <br />
              <span style={{ fontSize: '12px', lineHeight: '8px' }}>{t('help-volunteers-developers-note')}</span>
            </P2>
            <P2>
              <b>{t('help-volunteers-designers')}</b>
            </P2>
            <P3 style={{ lineHeight: 1, marginTop: 16 }}>
              {t('help-volunteers-note')}
            </P3>
            <br />
            <br />
            <Button href="https://t.me/VladBandurin">
              <P2>{t('help-volunteers-button')}</P2>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage;