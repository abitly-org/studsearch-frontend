import * as React from 'react';

import { useTranslation } from 'react-i18next';
import Button from '../../Components/Button';
import LoadingSpinner from '../../Components/LoadingSpinner';
import StudentCard from '../../Components/StudentCard';
import StudentsBlock from '../../Components/Students';
import { H1, P2 } from '../../Components/Text';
import { count, getStudents } from '../../Helpers/api';
import plural from '../../Helpers/plural';
import useLoad from '../../Helpers/useLoad';

import './index.scss';

const BlockSomeStudents = () => {
  const { t } = useTranslation();
  const stat = useLoad(() => count());
  const firstStudents = useLoad(() => getStudents(3, 0).then(r => r?.[1]));

  return (
    <div className="BlockSomeStudents">
      <H1>{t('block-some-students-header')}</H1>
      {firstStudents ?
          <StudentsBlock>
            {firstStudents?.map?.(student => <StudentCard key={student?.uuid} student={student} />)}
          </StudentsBlock>
          :
          <LoadingSpinner center-x />
      }
      {stat &&
        <Button to="/students/">
          <P2>{
            t(
              plural('block-some-students-button', stat?.studentsCount - 3), 
              { count: stat?.studentsCount - 3 }
            )
          }</P2>
        </Button>
      }
    </div>
  );
}

export default BlockSomeStudents;