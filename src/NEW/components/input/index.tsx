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
}) => {
  React.useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27)  {
        onChange?.('')
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [])

  return (
    <div className={cx('AppInput', { filled: !!value })}>
      <div className='Placeholder'>{name}</div>
      <input
        maxLength={3} 
        value={value}
        onChange={(e) => (e?.target?.value.replace(/\D/g, '') && e?.target?.value <= '200' ? onChange?.(e?.target?.value) : onChange?.(''))}
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
  )
};

export default Input;