import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { H1, P2 } from '../../Components/Text';
import step1 from './step1.png';
import step2 from './step2.png';
import step3 from './step3.png';
import step4 from './step4.png';
import './index.scss';

const BlockHowItWorks = () => {
  const { t } = useTranslation();
  return (
    <div className="BlockHowItWorks">
      <H1>{t('block-how-it-works-header')}</H1>
      <div className="Steps">
        <div>
          <img src={step1} />
          <P2>{t('block-how-it-works-step1')}</P2>
        </div>
        <div>
          <img src={step2} />
          <P2>{t('block-how-it-works-step2')}</P2>
        </div>
        <div>
          <img src={step3} />
          <P2>{t('block-how-it-works-step3')}</P2>
        </div>
        <div>
          <img src={step4} />
          <P2>{t('block-how-it-works-step4')}</P2>
        </div>
      </div>
    </div>
  );
}
export default BlockHowItWorks;