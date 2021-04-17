import * as React from 'react';
import cx from 'classnames';

import './index.scss';

export const H1 = ({ className, ...props } : React.HTMLAttributes<HTMLHeadElement>) => 
  <h1 className={cx('h1', className)} {...props} />;
export const H2 = ({ className, ...props } : React.HTMLAttributes<HTMLHeadElement>) => 
  <h2 className={cx('h2', className)} {...props} />;
export const H3 = ({ className, ...props } : React.HTMLAttributes<HTMLHeadElement>) => 
  <h3 className={cx('h3', className)} {...props} />;
export const P1 = ({ className, ...props } : React.HTMLAttributes<HTMLParagraphElement>) => 
  <p className={cx('p1', className)} {...props} />;
export const P2 = ({ className, ...props } : React.HTMLAttributes<HTMLParagraphElement>) => 
  <p className={cx('p2', className)} {...props} />;
export const P3 = ({ className, ...props } : React.HTMLAttributes<HTMLParagraphElement>) => 
  <p className={cx('p3', className)} {...props} />;
export const P4 = ({ className, ...props } : React.HTMLAttributes<HTMLParagraphElement>) => 
  <p className={cx('p4', className)} {...props} />;