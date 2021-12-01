import * as React from 'react';
import AppContent from '../../components/app/content';

import zhdun from './zhdun.png';

import './index.scss';

const MyRatingLoading = () => {
  return (
    <AppContent className='MyRatingLoading'>
      <div className='MyRatingLoadingSpinner'>
        <span>
          <span />
        </span>
        <img src={zhdun} />
      </div>
    </AppContent>
  );
};

export default MyRatingLoading;