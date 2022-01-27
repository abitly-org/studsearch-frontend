import * as React from 'react';
import cx from 'classnames';

import './index.scss';

const Button = ({
  children,
  className, style,
  disabled,
  onClick
}: {
  className?: string,
  style?: React.CSSProperties,

  disabled?: boolean,
  onClick?: () => void,
  children?: React.ReactNode
}) => (
  <button
    className={cx('AppButton', { disabled }, className)}
    style={style}
    onClick={onClick}
  >
    {/* <div
      className='AppButton_Background'
    /> */}
    { children }
  </button>
);

export default Button;