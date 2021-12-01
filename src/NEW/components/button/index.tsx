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
  <div className={cx('AppButton', { disabled }, className)} style={style} onClick={onClick}>
    { children }
  </div>
);

export default Button;