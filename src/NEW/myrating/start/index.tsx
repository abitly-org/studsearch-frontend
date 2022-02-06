import * as React from 'react';
import { Link } from 'react-router-dom';

import AppContent from '../../components/app/content';

import './index.scss';

const MyRatingStart = () => {
  return (
    <AppContent className='MyRatingStart'>
      <h1>Дізнайся наскільки твої бали ЗНО кращі за бали інших</h1>
      {/* <div className='MyRatingStartText'>
        <p>Доведи мамі, що ти крутий!</p>
        <img src={arrow} />
      </div> */}
      <Link className="AppButtonLink" to={`/myrating/years`}>
        Розрахувати рівень крутості
      </Link>
    </AppContent>
  );
}

export default MyRatingStart;