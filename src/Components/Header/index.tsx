import * as React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useClickAway } from 'react-use';

import logo from './logo.svg';
import menu from './menu.svg';
import arrow from './arrow.svg';
import close from './close.svg';
import tgPhoto from '../../Pages/Registration/components/RegistrationForm/tgPhoto.svg';
import fbPhoto from '../../Pages/Registration/components/RegistrationForm/fbPhoto.png';

import './index.scss';
import Button from '../Button';
import { H3, P1, P2 } from '../Text';
import RippleEffect from '../Button/RippleEffect';
import useSession, { Session } from '../../Helpers/session';
import LoadingSpinner from '../LoadingSpinner';
import { StudentPhoto } from '../StudentCard';
import { SHOW_FB, takeString } from '../../Helpers/api';

export const HeaderLanguages = () => {
  const { i18n, t } = useTranslation();

  return (
    <span className="Header_Languages">
      {
        languages.map(({ text, code }) => 
          <span
            key={code}
            className={cx({ selected: i18n.language === code })}
            children={<P2>{text}</P2>}
            onClick={() => {
              i18n.changeLanguage(code)
              window?.localStorage?.setItem?.('studsearch-lng', code);
            }}
          />
        )
      }
    </span>
  )
}

const useDeferred = <T extends unknown>(
  value: T,
  ms: number
) => {
  const [state, setState] = React.useState(value);
  React.useEffect(() => {
    let unmounted = false;
    setTimeout(() => {
      if (!unmounted)
        setState(value);
    }, ms);
    return () => { unmounted = true; }
  }, [ value ]);
  return state;
}

const LoginButton = ({
  session, onClick
}: {
  session: ReturnType<typeof useSession>,
  onClick?: () => void
}) => {
  const { t } = useTranslation();

  const ref = React.useRef(null);
  const [dropdown, setDropdown] = React.useState(false);
  const dropdownDeferred = useDeferred(dropdown, 75);

  useClickAway(ref, () => setDropdown(false));
  
  return (
    <div ref={ref} className="Header_Buttons_Login">
      {/* @ts-ignore */}
      <Button
        {...(SHOW_FB ? 
          {} :
          {
            href: session.login.telegram,
            target: '_blank'
          }  
        )}
        onClick={() => {
          if (SHOW_FB)
            setDropdown(d => !d);
          else {
            onClick?.();
          }
        }}
        outline
      >
        <P2>{t('header-login')}</P2>
      </Button>
      { (dropdown || dropdownDeferred) &&
        <div className={cx('Dropdown', { hiding: !dropdown || !dropdownDeferred })}>
          <img src={arrow} className='Arrow' />
          <Button
            href={session.login.telegram}
            color='#68A8E5'
            target='_blank'
            onClick={onClick}
          >
            <img src={tgPhoto} />
            <P2 style={{color: 'white'}}>
              Telegram
            </P2>
          </Button>
          <Button
            href={session.login.facebook}
            color='#1778f2'
            onClick={onClick}
          >
            <img src={fbPhoto} />
            <P2 style={{color: 'white'}}>
              Facebook
            </P2>
          </Button>
        </div>
      }
    </div>
  )
}

const AuthButtons = ({ reverse, session, refreshing, setRefreshing, onClick }: {
  session: ReturnType<typeof useSession>,
  refreshing?: boolean,
  setRefreshing?: (b: boolean) => void,
  reverse?: boolean,
  onClick?: () => void
}) => {
  const { t } = useTranslation();

  const location = useLocation();
  const atCabinet = location.pathname === '/cabinet/';

  return (
    <>
      { session?.loading && !refreshing &&
        <LoadingSpinner size={16} />
      }
      { !session?.verified && (!session?.loading || refreshing) && <>
        { reverse ? 
          <>
            <Button
              className="Header_Buttons_Register"
              to='/register'
              onClick={onClick}
            >
              <P2>{t('header-register')}</P2>
            </Button>
            <LoginButton
              session={session}
              onClick={() => {
                setRefreshing?.(true);
                onClick?.();
              }}
            />
          </> : 
          <>
            <LoginButton
              session={session}
              onClick={() => {
                setRefreshing?.(true);
                onClick?.();
              }}
            />
            <Button
              className="Header_Buttons_Register"
              to='/register'
              onClick={onClick}
            >
              <P2>{t('header-register')}</P2>
            </Button>
          </>
        }
      </> }
      { session?.verified && session?.studentUuid &&
        <Link
          className={cx('CabinetLink', { selected: atCabinet })}
          to='/cabinet/'
            
          onClick={onClick}
        >
          <StudentPhoto
            uuid={session?.studentUuid}
            size={36}
          />
          <P1>{t('header-cabinet')}</P1>
        </Link>
      }
    </>
  )
}

const MobileMenu = ({ closeMenu, session, refreshing, startRefreshing }: {
  closeMenu?: () => void,
  session: ReturnType<typeof useSession>,
  refreshing?: boolean,
  startRefreshing?: () => void
}) => {
  const { i18n, t } = useTranslation();
  const history = useHistory(),
        location = useLocation();
  const atCabinet = location.pathname === '/cabinet/';

  const closeAndScroll = () => {
    window?.scrollTo?.(0, 0);
    closeMenu?.();
  }

  return (
    <div className="Header_Menu">
      <Link className="Header_Logo" to='/' onClick={closeAndScroll}>
        <img alt="StudSearch" aria-label="StudSearch" src={logo} />
      </Link>
      <span className="Header_CloseButton" onClick={closeMenu}>
        <RippleEffect onClick={closeMenu} />
        <img src={close} />
      </span>
      <div className="Buttons">
        { pages?.map?.((page, key) => 
          React.createElement(
            page?.path ? 'div' : 'a',
            {
              key,
              className: cx('Page', { selected: location?.pathname === page?.path, black: page?.black }),
              onClick: ((page) => () => {
                if (page?.path) {
                  history.push(page?.path, location?.state);
                  closeAndScroll?.();
                }
              })(page),
              ...(page?.url ? {
                href: page?.url,
                target: '_blank'
              } : {}),
              children: <>
                <RippleEffect onClick={((page) => () => {
                  if (page?.path) {
                    history.push(page?.path, location?.state);
                    closeAndScroll?.();
                  }
                })(page)} />
                <H3>{t(page?.textKey)}</H3>
              </>
          })
        ) }
        <div className="LoginButtons">
          <AuthButtons
            session={session}
            refreshing={refreshing}
            setRefreshing={startRefreshing}
            reverse
            onClick={closeAndScroll}
          />
        </div>
        <HeaderLanguages />
      </div>
    </div>
  );
}

const languages = [
  { text: 'UA', code: 'uk-UA' },
  { text: 'EN', code: 'en-US' },
  { text: 'RU', code: 'ru-RU' }
];
const MIN_TIMEOUT = 1000;
const Header = () => {
  const { i18n, t } = useTranslation();

  const history = useHistory();
  const session = useSession();

  const [atTop, setAtTop] = React.useState(true);
  React.useEffect(() => {
    const onScroll = () =>
      setAtTop(window.scrollY < 25);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lastRefreshed = React.useRef<number | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (refreshing && !session?.verified) {
      const timeout = Math.max(MIN_TIMEOUT, Date.now() - (lastRefreshed?.current ?? (Date.now() - MIN_TIMEOUT)));
      setTimeout(() => {
        if (Date.now() - (lastRefreshed?.current ?? 0) < MIN_TIMEOUT)
          return;
        lastRefreshed.current = Date.now();
        session?.refresh?.();
      }, timeout);
    }
  }, [ refreshing, session?.refreshId ]);

  const [mobileMenu, setMobileMenu] = React.useState<JSX.Element | null>(null);
  const openMobileMenu = () => {
    setMobileMenu(
      <MobileMenu
        closeMenu={() => setMobileMenu(null)}
        session={session}
        refreshing={refreshing}
        startRefreshing={() => setRefreshing(true)}
      />
    );
  }

  return (
    <>
      <div className={cx("Header", { atTop })}>
        <div>
          <div className="Header_Top">
            <HeaderLanguages />
            <Link className="Header_Logo" to='/'>
              <img alt="StudSearch" aria-label="StudSearch" src={logo} />
            </Link>
            <span
              className="Header_MenuButton"
              onClick={openMobileMenu}
            >
              <RippleEffect
                onClick={openMobileMenu}
              />
              <img src={menu} />
            </span>
            <span className="Header_Buttons">
              <AuthButtons
                session={session}
                refreshing={refreshing}
                setRefreshing={setRefreshing}
              />
            </span>
          </div>
          <div className="Header_Bottom">
            <HeaderTabs />
          </div>
        </div>
      </div>
      { mobileMenu }
    </>
  )
};

export default Header;

const pages = [
  { textKey: 'header-tab-main', path: '/' },
  { textKey: 'header-tab-rating', path: '/rating' },
  { textKey: 'header-tab-about', path: '/about', hideInMobile: true },
  { textKey: 'header-tab-donate', url: 'https://send.monobank.ua/jar/3UNSF6txsH', hideInMobile: true, black: true }
  // { textKey: 'header-tab-help', path: '/help', hideInMobile: true }
  // { textKey: 'header-tab-students', path: '/students' }
];

export const HeaderTabs = ({ showAll = false }: { showAll?: boolean }) => {
  const { i18n, t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="HeaderTabs">
      { pages.map(({ textKey, path, url, hideInMobile, black }, key) => {
        const selected = location.pathname === path;
        return (
          React.createElement(
            path ? 'span' : 'a',
            {
              key,
              className: cx('HeaderTabs_Tab', { selected, hideInMobile: hideInMobile && !showAll, black }),
              ...(url ? {
                href: url,
                target: '_blank'
              } : {}),
              children: (
                <span onClick={() => {
                  if (path) {
                    history.push(path);
                    window?.scrollTo?.(0, 0);
                  }
                }}>
                  <RippleEffect
                    onClick={() => {
                      if (path) {
                        history.push(path);
                        window?.scrollTo?.(0, 0);
                      }
                    }}
                    disabled={selected}
                  />
                  <P2>{t(textKey)}</P2>
                </span>
              )
            }
          )
        );
      }) }
    </div>
  );
}
