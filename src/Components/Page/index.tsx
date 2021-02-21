import * as React from 'react';
import cx from 'classnames';

import './index.scss';

const Page = ({ children, className, topMargin = true } : {
  children?: React.ReactNode,
  className?: string,
  topMargin?: boolean
}) => 
  <div className={cx('Page', { topMargin }, className)}>
    <div className="Page_Container">
      {children}
    </div>
  </div>;
export default Page;