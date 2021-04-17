import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../Components/Button';

import Page from '../../Components/Page';
import { H1, P1, P2 } from '../../Components/Text';

import bg from './bg.png';
import step1 from './step1.png';
import step2 from './step2.png';
import step3 from './step3.png';
import step4 from './step4.png';
import student1 from './student1.png';
import student2 from './student2.png';
import student3 from './student3.png';
import student4 from './student4.png';
import student5 from './student5.png';
import student6 from './student6.png';
import './index.scss';

import { count, getStudents } from '../../Helpers/api';
import useLoad from '../../Helpers/useLoad';
import StudentsBlock from '../../Components/Students';
import StudentCard from '../../Components/StudentCard';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Header from "../../Components/Header";

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

const MainPage = () => {
  const { i18n, t } = useTranslation();

  const stat = useLoad(() => count());
  const firstStudents = useLoad(() => getStudents(3, 0));

  return (
      <div className="MainPage">
        <Header/>
        <div className="First" style={{ backgroundImage: `url(${bg})` }}>
          <div>
            <div className="Info">
              <H1>{t('main-first-header')}</H1>
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
              <br />
              <br />
              <Button to="/students">
                <P2>{t('main-first-button')}</P2>
              </Button>
            </div>
          </div>
        </div>
        <div className="Second">
          <H1>{t('main-second-header')}</H1>
          <div className="Steps">
            <div>
              <img src={step1} />
              <P2>{t('main-second-step1')}</P2>
            </div>
            <div>
              <img src={step2} />
              <P2>{t('main-second-step2')}</P2>
            </div>
            <div>
              <img src={step3} />
              <P2>{t('main-second-step3')}</P2>
            </div>
            <div>
              <img src={step4} />
              <P2>{t('main-second-step4')}</P2>
            </div>
          </div>
        </div>
        <div className="Third">
          <H1>{t('main-third-header')}</H1>
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
              t(plural('main-third-button', stat?.studentsCount - 3), { count: stat?.studentsCount - 3 })
            }</P2>
          </Button>
          }
        </div>
        <div className="Fourth">
          <div className="Main">
            <div>
              <div>
                <H1>{stat ? stat?.studentsCount : <LoadingSpinner />}</H1>
                <P1>{t('main-fourth-students')}</P1>
              </div>
              <div>
                <H1>{stat ? stat?.universitiesCount : <LoadingSpinner />}</H1>
                <P1>{t('main-fourth-universities')}</P1>
              </div>
            </div>
            <br />
            <H1>{t('main-fourth-header')}</H1>
            <br />
            <br />
            <P2>{t('main-fourth-text1')}</P2>
            <br />
            <P2>{t('main-fourth-text2')}</P2>
            <br />
            <br />
            <Button to="/register">
              <P2>{t('main-fourth-register')}</P2>
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
      </div>
  );
}

export default MainPage;
