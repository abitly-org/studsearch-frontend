import * as React from 'react';
import cx from 'classnames';

import { ReactComponent as CloseIcon } from './close.svg';
import './index.scss';
import { P2 } from '../Text';

export const Chips = ({ children }: { children?: React.ReactNode }) => 
  <span className='Chips' children={children} />;

const Chip = ({ children, onClose }: {
  children?: React.ReactNode,
  onClose?: () => void
}) => (
  <span
    className={cx("Chip", { hasCloseButton: !!onClose })}
  >
    <P2>
      { children }
    </P2>
    { onClose &&
      <span className='CloseButton' onClick={onClose}>
        { <CloseIcon /> }
      </span>
    }
  </span>
)

export default Chip;
