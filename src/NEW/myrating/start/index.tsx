import * as React from 'react';
import { Link } from 'react-router-dom';

import AppContent from '../../components/app/content';
import Button from '../../components/button';

import avramenko from './avramenko.svg';
import arrow from './arrow.svg';

import './index.scss';

const MyRatingStart = () => {

  return (
    <AppContent className='MyRatingStart'>
      <h1>Дізнайся наскільки ти краще за інших склав/ла ЗНО?{/* ‍‍🎓*/}</h1>
      <div className='MyRatingStartText'>
        <p>Доведи мамі, що ти крутий!</p>
        <img src={arrow} />
      </div>
      <Link className="AppButtonLink" to="/myrating/year">
        <Button>
          Розрахувати рівень крутості
        </Button>
      </Link>
    </AppContent>
  );
}

export default MyRatingStart;