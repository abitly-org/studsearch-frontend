import * as React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';

import logo from './logo.svg';

import './index.scss';
import Button from '../Button';
import { P2 } from '../Text';
import RippleEffect from '../Button/RippleEffect';
import {useEffect, useState} from "react";
import {ReactComponent as PhotoPlaceholder} from "../StudentCard/photoPlaceholder.svg";
import {fetchSession, fetchUserPhoto} from "../../Helpers/api";

const languages = [
  { text: 'UA', code: 'uk-UA' },
  { text: 'EN', code: 'en-US' },
  { text: 'RU', code: 'ru-RU' }
];

interface userPhoto {
  userImg?: boolean
}

const Header = (props: userPhoto) => {
  const { i18n, t } = useTranslation();

   const [verified, setVerified] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    fetchSession(setVerified);
  }, [verified]);

  const [img, setImg] = useState<string| undefined>(undefined);
  useEffect(() => {
    fetchUserPhoto(setImg)
  }, []);

  const [atTop, setAtTop] = React.useState(true);
  React.useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 25);
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [])

  return (
    <div className={cx("Header", { atTop })}>
      <div>
        <div className="Header_Top">
          <span className="Header_Languages">
            {
              languages.map(({ text, code }) => 
                <span
                  key={code}
                  className={cx({ selected: i18n.language === code })}
                  children={<P2>{text}</P2>}
                  onClick={() => i18n.changeLanguage(code)}
                />
              )
            }
          </span>
          <Link className="Header_Logo" to='/'>
            <img src={logo} />
          </Link>
          <span className="Header_Buttons">
            { (verified == undefined)? null :
                !verified?
                    <>
                      <Button to='/login' outline>
                        <P2>{t('header-login')}</P2>
                      </Button>
                      <Button className="Header_Buttons_Register" to='/sign-up'>
                        <P2>{t('header-register')}</P2>
                      </Button>
                    </>:
                    <Link to={'/personal-area'}>

                      <div className= {cx( "HeaderStudentPhoto ",{
                        "BackgroundColor": props.userImg,
                       })}>
                        {img == undefined? null:
                            (!props.userImg && img ?
                                <img src={img} alt={`photo`} /> :
                                <PhotoPlaceholder />)
                        }
                      </div>
                    </Link>
            }
          </span>
        </div>
        <div className="Header_Bottom">
          <HeaderTabs />
        </div>
      </div>
    </div>
  )
};

export default Header;

const pages = [
  { textKey: 'header-tab-main', path: '/' },
  { textKey: 'header-tab-about', path: '/about' },
  { textKey: 'header-tab-students', path: '/students' }
];

const HeaderTabs = () => {
  const { i18n, t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="HeaderTabs">
      { pages.map(({ textKey, path }, key) => {
        const selected = location.pathname === path;
        return (
          <span key={key} className={cx('HeaderTabs_Tab', { selected })}>
            <span
              onClick={() => {
                history.push(path);
              }}
            >
              <RippleEffect disabled={selected} />
              <P2>{t(textKey)}</P2>
            </span>
          </span>
        );
      }) }
    </div>
  );
}
