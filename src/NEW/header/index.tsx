import * as React from 'react';
import cx from 'classnames';

import AppRipples, { RippleColor } from '../components/ripple';

import logo from './logo.svg';
import './index.scss';
import nextFrame from '../utils/nextFrame';

export const BurgerButton = ({ value, setValue }: {
  value?: boolean,
  setValue?: (v: boolean) => void
}) => (
  <div
    className={cx('AppHeaderBurgerButton', { open: value })}
    onClick={() => setValue?.(!value)}
  >
    <span />
    <span />
  </div>
);

export const HeaderMenuButton = ({ emoji, name }: { emoji: string, name: string }) => (
  <div className='AppHeaderMenuButton'>
    <span className='AppHeaderMenuButton_Emoji'>{ emoji }</span>
    <span className='AppHeaderMenuButton_Name'>{ name }</span>
    <AppRipples
      color={RippleColor.primary100}
    />
  </div>
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
            emoji='🎓'
            name='Спитати у студентів (StudSearch)'
          />,
          <HeaderMenuButton
            emoji='📈'
            name='Рейтинг університетів'
          />,
          <HeaderMenuButton
            emoji='👍'
            name='Наскільки твої бали ЗНО кращі за бали інших'
          />
        ]}
      />
      <HeaderMenuGroup
        buttons={[
          <HeaderMenuButton
            emoji='👋'
            name='Про нас'
          />,
          <HeaderMenuButton
            emoji='🤙'
            name='Зв’язатись з нами'
          />
        ]}
      />
      <HeaderMenuGroup
        buttons={[
          <HeaderMenuButton
            emoji='💸'
            name='Задонатити на сервери'
          />
        ]}
      />
    </div>
  </div>
);

const useAnimated = (def: boolean, delay: number = 250) => {
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

const Header = () => {

  const [open, openDelayed, setOpen] = useAnimated(false);

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