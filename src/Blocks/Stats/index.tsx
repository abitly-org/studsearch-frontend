import * as React  from 'react';
import { useTranslation } from 'react-i18next/*';
import Button from '../../Components/Button';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { H1, P1, P2 } from '../../Components/Text';
import { count } from '../../Helpers/api';
import useLoad from '../../Helpers/useLoad';

import student1 from './student1.png';
import student2 from './student2.png';
import student3 from './student3.png';
import student4 from './student4.png';
import student5 from './student5.png';
import student6 from './student6.png';

import './index.scss';

const BlockStats = () => {
  const { t } = useTranslation();

  const stat = useLoad(() => count());

  return (
    <div className="BlockStats">
      <div className="Main">
        <div>
          <div>
            <H1>{stat ? stat?.studentsCount : <LoadingSpinner />}</H1>
            <P1>{t('block-stats-students')}</P1>
          </div>
          <div>
            <H1>{stat ? stat?.universitiesCount : <LoadingSpinner />}</H1>
            <P1>{t('block-stats-universities')}</P1>
          </div>
        </div>
        <br />
        <H1>{t('block-stats-header')}</H1>
        <br />
        <br />
        <P2>{t('block-stats-text1')}</P2>
        <br />
        <P2>{t('block-stats-text2')}</P2>
        <br />
        <br />
        <Button to="/register">
          <P2>{t('block-stats-register')}</P2>
        </Button>
      </div>
      <div className="LeftBg">
        <span></span>
        <span><img src={student1}/></span>
        <span></span>
        <span><img src={student2} /></span>
        <span><img src={student3} /></span>
      </div>
      <div className="RightBg">
        <span></span>
        <span><img src={student4}/></span>
        <span></span>
        <span><img src={student5} /></span>
        <span></span>
        <span><img src={student6} /></span>
      </div>
    </div>
  );
}
export default BlockStats;