import * as React from 'react';
import { Link } from 'react-router-dom';
import AppContent from '../../components/app/content';
import Button from '../../components/button';
import Checkbox from '../../components/checkbox';
import MyRatingHeader from '../../components/myrating-header';
import MyRatingList from '../../components/myrating-list';



const MyRatingSelectYearPage = () => {
  const years = [2021, 2020, 2019, 2018];
  const [year, setYear] = React.useState(2021);

  return (
    <>
      <MyRatingHeader
        step={1} stepsCount={3}
        header={'Оберіть рік, коли ви здавали ЗНО'}
        onBack={() => window.history.back()}
      />
      <MyRatingList nextLink='/myrating/subjects/'>
        { years?.map?.(cyear => 
          <Checkbox
            key={cyear}
            
            value={cyear === year}
            onChange={v => setYear(cyear)}
            children={cyear}

            radio
          />  
        ) }
      </MyRatingList>
    </>
  );
};

export default MyRatingSelectYearPage;