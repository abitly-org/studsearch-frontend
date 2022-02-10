import * as React from 'react';
import cx from 'classnames';

import AppRipples, { RippleColor } from '../components/ripple';

import logo from './logo.svg';
import wavingHand from './wavingHand.png';
import callMeHand from './callMeHand.png';
import thumbsUp from './thumbsUp.png';
import chartIncreasing from './chartIncreasing.png';
import graduationCap from './graduationCap.png';
import moneyWithWings from './moneyWithWings.png';

import './index.scss';
import nextFrame from '../utils/nextFrame';

export const BurgerButton = ({ value, setValue }: {
  value?: boolean,
  setValue?: (v: boolean) => void
}) => {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    if (!value)
      setIndex(i => i + 1);
  }, [ value ]);
  return (
    <div
      className={cx('AppHeaderBurgerButton', { open: value, right: index % 2 == 1 })}
      onClick={() => setValue?.(!value)}
    >
      <span />
      <span />
      <div className='AppHeaderBurgerButton_Background' />
    </div>
  );
}

export const HeaderMenuButton = ({ emoji, name, href, onClick}: { emoji?: any, name: string, href?: string, onClick?: (value: any) => void }) => (
  <a className='AppHeaderMenuButton' href={href} onClick={onClick}>
    <img className='AppHeaderMenuButton_Emoji' src={emoji} alt="emoji"/>
    <span className='AppHeaderMenuButton_Name'>{ name }</span>
    <AppRipples
      color={RippleColor.primary100}
    />
  </a>
);

export const HeaderMenuGroup = ({ buttons }: {
  buttons?: React.ReactNode[]
}) => (
  <div className='AppHeaderMenuGroup'>
    {
      buttons?.map?.((button, i) => 
        <React.Fragment key={i}>
          { i > 0 &&
            <div className='AppHeaderMenuGroup_Separator'>
              <span></span>
            </div>
          }
          { button }
        </React.Fragment>
      )
    }
  </div>
);

export const HeaderMenu = ({ open }: { open?: boolean }) => (
  <div className={cx('AppHeaderMenu', { open })}>
    <div>
      <HeaderMenuGroup
        buttons={[
          <HeaderMenuButton
            emoji={graduationCap}
            name='Спитати у студентів (StudSearch)'
            href={'/'}
          />,
          <HeaderMenuButton
            emoji={chartIncreasing}
            name='Рейтинг університетів'
            href={'/rating'}
          />,
          <HeaderMenuButton
            emoji={thumbsUp}
            name='Наскільки твої бали ЗНО кращі за бали інших'
            href={'/'}
          />
        ]}
      />
      <HeaderMenuGroup
        buttons={[
          <HeaderMenuButton
            emoji={wavingHand}
            name='Про нас'
            href={'/about'}
          />,
          <HeaderMenuButton
            emoji={callMeHand}
            name='Зв’язатись з нами'
            href={'https://t.me/dkaraush'}
          />
        ]}
      />
      <HeaderMenuGroup
        buttons={[
          <HeaderMenuButton
            emoji={moneyWithWings}
            name='Задонатити на сервери'
            href={'https://send.monobank.ua/jar/3UNSF6txsH'}
          />
        ]}
      />
    </div>
  </div>
);

export const useAnimated = (def: boolean, delay: number = 250) => {
  const [state, setState] = React.useState<boolean>(def);
  const [delayedState, setDelayedState] = React.useState(state);
  React.useEffect(() => {
    if (!state) {
      const timeout = setTimeout(() => setDelayedState(state), delay);
      return () => clearTimeout(timeout);
    }
  }, [ state ]);

  return [
    state,
    delayedState,
    (newState: boolean) => {
      if (newState) {
        setDelayedState(true);
        nextFrame(() => setState(newState));
      } else
        setState(newState);
    }
  ] as const;
}

export const Header = () => {
  const [open, openDelayed, setOpen] = useAnimated(false);

  React.useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27)  {
        setOpen(false)
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <div className='AppHeader'>
        <div>
          <a href="/">
            <img src={ logo } />
          </a>
          <BurgerButton
            value={open}
            setValue={setOpen}
          />
        </div>
      </div>
      { (open || openDelayed) && 
        <HeaderMenu open={open} />
      }
    </>
  );
}

export default Header;