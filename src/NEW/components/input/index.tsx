import * as React from 'react';
import cx from 'classnames';

import close from './close.svg';

import './index.scss';

const Input = ({
  name,
  value, onChange,
}: {
  name?: string,
  value?: string,
  onChange?: (newValue: string) => void
}) => (
  <div className={cx('AppInput', { filled: !!value })}>
    <div className='Placeholder'>{name}</div>
    <input
      value={value}
      onChange={e => onChange?.(e?.target?.value)}
    />
    { value && 
      <span
        className='AppInputClear'
        onClick={() => onChange?.('')}
      >
        <img src={close} />
      </span>
    }
  </div>
);

export default Input;