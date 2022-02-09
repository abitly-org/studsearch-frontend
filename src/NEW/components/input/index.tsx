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
  onChange: (newValue: string) => void
}) => {

  const handleEsc = (event: any) => {
    if (event.keyCode === 27)  {
      event.preventDefault();
      onChange?.('')
    }
  };

  // const debounce = (func: any, wait: number) => {
    // let timeout: any;

    // return function executedFunction(...args: any[]) {
      // const later = () => {
        // timeout = null;
        // func(...args);
      // };
      // clearTimeout(timeout);
      // 
      // timeout = setTimeout(later, wait);
    // };
  // };
 
  // const handleInput = (event: any) => {
    // console.log(,'shsdfhsldkjf;sd')
    // onChange(event.nativeEvent.data)    
  // }
 
  // let returnedFunction = debounce(handleInput, 250)
 
  return (
    <div className={cx('AppInput', { filled: !!value })}>
      <div className='Placeholder'>{name}</div>
      <input
        type='number'
        onKeyDown={handleEsc}
        value={value}
        onChange={(e) => {onChange(e.target.value)}}
      />
      { value && 
        <span
          className='AppInputClear'
          onClick={() => onChange('')}
        >
          <img src={close} />
        </span>
      }
    </div>
  )
};

export default Input;