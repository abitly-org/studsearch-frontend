import * as React from 'react';
import { Link } from 'react-router-dom';

import back from './back.svg';
import './index.scss';

const MyRatingHeader = ({
  step, stepsCount,
  header,
  emoji,
  onBack
}: {
  step?: number,
  stepsCount?: number,
  emoji?: any,
  header?: string,
  onBack?: string,
}) => (
  <div className='MyRatingHeader'>
    <div>
      <div className='MyRatingHeaderTop'>
        {/* <div className='MyRatingHeaderBack' onClick={onBack}>
          <img src={back} /><span>Назад</span>
        </div> */}
        <Link className='MyRatingHeaderSteps' to={`${onBack}`}>
          <img src={back} />
          <span>Крок {step} з {stepsCount}</span>
        </Link>
      </div>
      <div className='MyRatingHeaderBottom'>
        <h1>{header}<img src={emoji} alt='emoji'/></h1>
      </div>
    </div>
  </div>
);

export default MyRatingHeader;