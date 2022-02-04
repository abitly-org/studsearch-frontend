import * as React from 'react';

import Checkbox from '../../components/checkbox';
import MyRatingHeader from '../../components/myrating-header';
import MyRatingList from '../../components/myrating-list';

import spiralCalendar from './spiralCalendar.png'

import useLocalStorage from '../../utils/localStorage';

const MyRatingSelectYearPage = () => {
  const years = [2021, 2020, 2019, 2018];
  const [year, setYear] = useLocalStorage('year', 2021) 

  return (
    <>
      <MyRatingHeader
        step={1} stepsCount={3}
        header={'Оберіть рік, коли ви здавали ЗНО'}
        emoji={spiralCalendar}
        onBack={() => window.history.back()}
      />
      <MyRatingList nextLink='/myrating/subjects/'>
        { years?.map?.(cyear => 
          <Checkbox
            key={cyear}
            
            value={cyear === year}
            onChange={() => setYear(cyear)}
            children={cyear}

            radio
          />  
        ) }
      </MyRatingList>
    </>
  );
};

export default MyRatingSelectYearPage;