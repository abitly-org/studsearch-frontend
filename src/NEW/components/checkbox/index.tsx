import * as React from 'react';
import cx from 'classnames';

import check from './check.svg';

import './index.scss';

const Checkbox = ({
  style, className,
  value, onChange, children, radio
}: {
  style?: React.CSSProperties, className?: string,
  value?: boolean,
  onChange?: (value: boolean) => void,
  children?: React.ReactNode,
  radio?: boolean
}) => (
  <div
    className={cx('AppCheckbox', { radio, checked: !!value }, className)}
    style={style}
    onClick={() => onChange?.(!value)}
  >
    <span className='AppCheckboxBox'>
      <img src={check} alt="Checkbox"/>
    </span>
    <span className='AppCheckboxText'>{ children }</span>
  </div>
);

export default Checkbox;