import * as React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import bg from './bg.png';

import './index.scss';
import { H1, P1 } from '../../Components/Text';
import AutoScrollable from '../../Components/AutoScrollable';
import { Students } from '../../Helpers/api';
import StudentCard from '../../Components/StudentCard';
import StudentsBlock from '../../Components/Students';

const StudentsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="StudentsPage">
      <div className="Brief" style={{ backgroundImage: `url(${bg})` }}>
        <div>
          <div className="Info">
            <H1>{t('students-first-header')}</H1>
            <br />
            <br />
            <ul>
              <li><P1>{t('main-first-question1')}</P1></li>
              <li><P1>{t('main-first-question2')}</P1></li>
              <li><P1>{t('main-first-question3')}</P1></li>
              <li><P1>{t('main-first-question4')}</P1></li>
            </ul>
            <br />
            <P1>{t('main-first-body1')}</P1>
            <P1>{t('main-first-body2')}</P1>
          </div>
        </div>
      </div>
      <StudentsBlock>
        <AutoScrollable
          data={React.useMemo(() => Students(), [])}
          template={student => 
            <StudentCard
              key={student?.uuid}
              student={student}
            />
          }
        />
      </StudentsBlock>
    </div>
  );
}

export default StudentsPage;
