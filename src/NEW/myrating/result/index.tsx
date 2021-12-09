import * as React from 'react';
import AppContent from '../../components/app/content';
import Button from '../../components/button';

import fulllogo from '../../header/fulllogo.svg';

import './index.scss';

const ResultCard = ({
  index, count,

  color,

  emoji, header, text
}: {
  index?: number, count?: number,

  color?: string,
  
  emoji?: string,
  header?: string,
  text?: string,

  chart?: React.ReactNode
}) => {

  return (
    <div className='MyRatingResultCard'>
      <div className='MyRatingResultCard_Top'>
        <img src={fulllogo} />
        <span className='MyRatingResultCard_Num'>

        </span>
      </div>
      <div className='MyRatingResultCard_Content'>
        <h2>🔥{emoji}🔥</h2>
        <h2>{header}</h2>
        <p>{text}</p>
      </div>
      <div className='MyRatingResultCard_Chart'>
        <
      </div>
    </div>
  );
}

const MyRatingResult = () => {

  return (
    <AppContent className='MyRatingResult'>
      <div className='MyRatingResult_Cards'>
        
      </div>
      <Button
        onClick={() => {}}
      >
        Поділитись
      </Button>
    </AppContent>
  );
}

export default MyRatingResult;