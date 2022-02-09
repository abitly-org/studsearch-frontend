import * as React from 'react';
import cx from 'classnames';

import check from './check.svg';

import './index.scss';
import Ripples, { RippleColor } from '../ripple';

const Checkbox = ({
  style, className,
  value, onChange, children, radio, limiter
}: {
  style?: React.CSSProperties, className?: string,
  value?: boolean,
  limiter?: boolean,
  onChange?: (value: boolean) => void,
  children?: React.ReactNode,
  radio?: boolean
}) => (
  <div
    className={cx('AppCheckbox', { radio, checked: value, limiter: limiter }, className)}
    style={style}
    onClick={() => onChange?.(!value)}
  >
    <span className='AppCheckboxBox'>
      <img src={check} alt="Checkbox"/>
      <span />
    </span>
    <span className='AppCheckboxText'>{ children }</span>
    <Ripples
      color={RippleColor.primary100}
    />
  </div>
);

export default Checkbox;