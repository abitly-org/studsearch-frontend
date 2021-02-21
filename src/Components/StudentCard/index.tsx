import * as React from 'react';
import { Courses, Student } from '../../Helpers/api';
import { P1, P2, P3 } from '../Text';

import specialty from './specialty.svg';
import university from './university.svg';
import quote from './quote.svg';
import './index.scss';
import Button from '../Button';
import RippleEffect from '../Button/RippleEffect';

const withFirstLetterUppercase = (str: string) => {
  str = str?.trim?.();
  if (str?.length >= 1)
    return (str?.[0]?.toUpperCase() || '') + str.substring(1);
  return str;
}

const StudentCard = ({ student }: {
  student: Student
}) => (
  <div className="StudentCard">
    <div className="Top">
      <img src={`https://thispersondoesnotexist.com/image?${student?.uuid}`} />
      <div>
        <P1>{student?.name}</P1>
        <span className="Course">
          <P2>{Courses.find(({ id }) => student?.course === id)?.title}</P2>
        </span>
      </div>
    </div>
    <div className="University">
      <img src={university} />
      <P2>{ student?.university }</P2>
    </div>
    <div className="Specialty">
      <img src={specialty} />
      <P2>{ student?.speciality }</P2>
    </div>
    { student?.about &&
      <div className="Bio">
        <img className="Quote" src={quote} />
        <P2>{student?.about}</P2>
      </div>
    }
    <div className="Socials">
      { ([...student?.social, 'instagram', 'viber']).map?.((social, key) => 
        <a className={social} key={key}>
          <RippleEffect />
          <P1>Зв'язатись в {withFirstLetterUppercase(social)}</P1>
        </a>
      )}
    </div>
  </div>
);

export default StudentCard;