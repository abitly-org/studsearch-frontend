import * as React from 'react';
import cx from 'classnames';

import logo from './logo.svg';
import './index.scss';

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
    <span />
  </div>
);

const Header = () => {

  const [open, setOpen] = React.useState(false);

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
      { open && 
        <div className='AppHeaderMenu' />
      }
    </>
  );
}

export default Header;