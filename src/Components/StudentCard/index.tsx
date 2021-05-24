import * as React from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { Courses, Student, studentLink, studentPhoto, takeString } from '../../Helpers/api';
import { H4, P1, P2, P3 } from '../Text';

import Button from '../Button';
import RippleEffect from '../Button/RippleEffect';

import specialty from './specialty.svg';
import university from './university.svg';
import quote from './quote.svg';
import register from './register.svg';
import { ReactComponent as PhotoPlaceholder } from './photoPlaceholder.svg';
import { ReactComponent as TelegramIcon } from './telegram.svg';
import { ReactComponent as InstagramIcon } from './instagram.svg';
import { ReactComponent as ViberIcon } from './viber.svg';
import './index.scss';
import useLoad from '../../Helpers/useLoad';

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

const imagesCache : {[src: string]: HTMLImageElement} = {};

export const StudentPhoto = ({ uuid, size = 100 } : { uuid: string, size?: number }) => {
  const photoSrc = studentPhoto(uuid);
  const photo = useLoad(() =>
    new Promise<HTMLImageElement>((resolve) => {
      if (imagesCache[photoSrc])
        return resolve(imagesCache[photoSrc]);
      const image = new Image();
      image.src = photoSrc;
      image.onload = () => {
        imagesCache[photoSrc] = image;
        resolve(image);
      };
      return image;
    }),
    [ photoSrc ]
  );

  return (
    <span className={cx("StudentPhoto", {small: size < 50})} style={{ width: size, height: size }}>
      {
        photo ?
          <img src={photoSrc} /> :
          <PhotoPlaceholder />
      }
    </span>
  );
}

export const RegisterCard = () => {
  const { i18n, t } = useTranslation();

  return (
    <div className='RegisterCard'>
      <img src={register} />      
      <H4>{t('register-header')}</H4>
      <P2>{t('register-text')}</P2>
      <Button to="/register/">
        <P2>{t('register-button')}</P2>
      </Button>
    </div>
  )
}

const StudentCard = ({ student }: {
  student: Student
}) => {
  const { i18n, t } = useTranslation();
  
  const socials = [...(student?.social ?? [])];
  // if (Math.random() > 0.5)
  //   socials.push('instagram')
  // if (Math.random() > 0.5)
  //   socials.push('viber')
  // if (Math.random() > 0.5)
  //   socials.push('facebook')

  return (
    <div className="StudentCard">
      <div className="Top">
        <StudentPhoto uuid={student?.uuid} />
        <div>
          <P1>{student?.name}</P1>
          <span className="Course">
            <P2>{t(`student-course-${student?.course}`)}</P2>
          </span>
        </div>
      </div>
      <div className="University">
        <img src={university} />
        <P2>{ takeString(student?.university, i18n.language) }</P2>
      </div>
      <div className="Specialty">
        <img src={specialty} />
        <P2>{ takeString(student?.speciality, i18n.language) }</P2>
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
              rel='noindex nofollow noopener'
            >
              <RippleEffect
                onClick={() => {
                  window.open(studentLink(student?.uuid, social), '_blank');
                }}
              />
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