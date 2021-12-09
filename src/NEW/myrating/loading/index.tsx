import * as React from 'react';
import AppContent from '../../components/app/content';

import zhdun from './zhdun.png';

import './index.scss';
import { useHistory } from 'react-router';

const MyRatingLoading = () => {
  const history = useHistory();
  
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      history.push('/myrating/result')
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

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