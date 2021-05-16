import * as React from 'react';

import { useTranslation } from 'react-i18next';
import Button from '../../Components/Button';
import LoadingSpinner from '../../Components/LoadingSpinner';
import StudentCard from '../../Components/StudentCard';
import StudentsBlock from '../../Components/Students';
import { H1, P2 } from '../../Components/Text';
import { count, getStudents } from '../../Helpers/api';
import useLoad from '../../Helpers/useLoad';

import './index.scss';

var plural = function(k : string, n : number){
  var postfix = '_other';

  var a = (n % 10 === 1);
  var b = (n % 100 !== 11);
  if( a && b ){ postfix = '_one' }

  var c = [2, 3, 4].indexOf(n % 10)     !== -1;
  var d = [12, 13, 14].indexOf(n % 100) === -1;
  if( c && d ){ postfix = '_few' }

  var e = n % 10 === 0;
  var f = [5, 6, 7, 8, 9].indexOf(n % 10)   !== -1;
  var g = [11, 12, 13, 14].indexOf(n % 100) !== -1;
  if( e || f || g ){ postfix = '_many' }

  return k + postfix;
}

const BlockSomeStudents = () => {
  const { t } = useTranslation();
  const stat = useLoad(() => count());
  const firstStudents = useLoad(() => getStudents(3, 0));

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