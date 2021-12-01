import * as React from 'react';
import AppContent from '../../components/app/content';
import Checkbox from '../../components/checkbox';
import MyRatingHeader from '../../components/myrating-header';
import MyRatingList from '../../components/myrating-list';

const MyRatingSelectSubjectsPage = () => {
  const allSubjects = [
    'Українська мова і література',
    'Історія України',
    'Математика',
    'Біологія',
    'Географія',
    'Фізика',
    'Хімія',
    'Англійська мова',
    'Французька мова',
    'Німецька мова',
    'Іспанська мова'
  ];
  const [subjects, setSubjects] = React.useState([ allSubjects[0] ]);

  return (
    <>
      <MyRatingHeader
        step={2} stepsCount={3}
        header={'Оберіть предмети, які ви здававали на ЗНО 📚'}
        onBack={() => window.history.back()}
      />
      <MyRatingList
        nextLink='/myrating/score/'
        nextDisabled={subjects.length <= 0}
      >
        { allSubjects?.map?.(subject => 
          <Checkbox
            key={subject}
            
            value={subjects.includes(subject)}
            onChange={v => setSubjects(s => v ? [...s, subject] : s.filter(s => s !== subject))}
            children={subject}
          />  
        ) }
      </MyRatingList>
    </>
  );
};

export default MyRatingSelectSubjectsPage;