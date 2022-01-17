import * as React from 'react';

import back from './back.svg';
import './index.scss';

const MyRatingHeader = ({
  step, stepsCount,
  header,
  onBack
}: {
  step?: number,
  stepsCount?: number,
  header?: string,
  onBack?: () => void
}) => (
  <div className='MyRatingHeader'>
    <div>
      <div className='MyRatingHeaderTop'>
        {/* <div className='MyRatingHeaderBack' onClick={onBack}>
          <img src={back} /><span>Назад</span>
        </div> */}
        <button className='MyRatingHeaderSteps' onClick={onBack}>
          <img src={back} />
          <span>Крок {step} з {stepsCount}</span>
        </button>
      </div>
      <div className='MyRatingHeaderBottom'>
        <h1>{header}</h1>
      </div>
    </div>
  </div>
);

export default MyRatingHeader;