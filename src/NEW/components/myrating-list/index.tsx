import * as React from 'react';
import { Link } from 'react-router-dom';
import AppContent from '../app/content';
import Button from '../button';

import './index.scss';

const MyRatingList = ({
  children,
  nextLink, nextDisabled, nextLabel = 'Далі'
}: {
  children?: React.ReactNode,
  nextLink: string,
  nextDisabled?: boolean,
  nextLabel?: string
}) => (
  <AppContent className='MyRatingList'>
    <div>
      { children }
    </div>
    <Link
      className="AppButtonLink"
      to={ !nextDisabled ? nextLink : '#' }
    >
      <Button disabled={nextDisabled}>{ nextLabel }</Button>
    </Link>
  </AppContent>
);

export default MyRatingList;