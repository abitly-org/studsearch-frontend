import * as React from 'react';
import cx from 'classnames';

import './index.scss';

const AppContent : React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className, style }) => {
  return (
    <div
      className={cx('AppContent', className)}
      style={style}
    >
      <div>
        { children }
      </div>
    </div>
  );
};

export default AppContent;