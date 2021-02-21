import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Courses, Student, studentLink } from '../../Helpers/api';
import { P1, P2, P3 } from '../Text';

import Button from '../Button';
import RippleEffect from '../Button/RippleEffect';

import specialty from './specialty.svg';
import university from './university.svg';
import quote from './quote.svg';
import { ReactComponent as TelegramIcon } from './telegram.svg';
import { ReactComponent as InstagramIcon } from './instagram.svg';
import { ReactComponent as ViberIcon } from './viber.svg';
import './index.scss';

const withFirstLetterUppercase = (str: string) => {
  str = str?.trim?.();
  if (str?.length >= 1)
    return (str?.[0]?.toUpperCase() || '') + str.substring(1);
  return str;
}
const SocialIcons = {
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  viber: ViberIcon
} as {[social: string]: React.ComponentType}

const StudentCard = ({ student }: {
  student: Student
}) => {
  const { t } = useTranslation();
  const socials = [...student?.social];
  if (Math.random() > 0.5)
    socials.push('instagram')
  if (Math.random() > 0.5)
    socials.push('viber')
  if (Math.random() > 0.5)
    socials.push('facebook')
  return (
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
        { socials.map?.((social, key) => {
          const Icon = SocialIcons[social];
          return (
            <a
              key={key}
              className={social}
              target="_blank"
              href={studentLink(student?.uuid, social)}
              rel='nofollow noopener'
            >
              <RippleEffect />
              <P2>
                {t('student-contact')}
                { Icon ? <Icon /> : ' ' }
                {withFirstLetterUppercase(social)}
              </P2>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default StudentCard;