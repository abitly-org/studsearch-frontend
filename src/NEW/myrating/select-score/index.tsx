import * as React from 'react';
import AppContent from '../../components/app/content';
import Input from '../../components/input';
import MyRatingHeader from '../../components/myrating-header';
import MyRatingList from '../../components/myrating-list';

const MyRatingSelectScorePage = () => {
  const subjects = [
    'Бал з Української мови (ЗНО)',
    'Бал з Математики (ЗНО)',
    'Бал з Географії (ЗНО)'
  ];
  const [scores, setScores] = React.useState(['', '', '']);
  
  return (
    <>
      <MyRatingHeader
        step={3} stepsCount={3}
        header={'Введіть бали які ви отримали з цих предметів 🎯'}
        onBack={() => window.history.back()}
      />
      <MyRatingList
        nextLink='/myrating/loading/'
        nextDisabled={scores.every(s => !s)}
      >
        { subjects?.map?.((subject, i) => 
          <Input
            key={i}
            name={subject}
            value={scores?.[i]}
            onChange={value => setScores(s => s.map((v, j) => i === j ? value : v))}
          />
        ) }
      </MyRatingList>
    </>
  );
};

export default MyRatingSelectScorePage;