import * as React from 'react';

import Checkbox from '../../components/checkbox';
import MyRatingHeader from '../../components/myrating-header';
import MyRatingList from '../../components/myrating-list';

import books from './books.png';

import useLocalStorage from '../../utils/localStorage';

const MyRatingSelectSubjectsPage = () => {
  const allSubjects: string[] = [
    'Українська мова і література',
    'Українська мова',
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

  const [subjects, setSubjects] = useLocalStorage('subjects', [allSubjects[0]])
  
  return (
    <>
      <MyRatingHeader
        step={2} stepsCount={3}
        header={`Оберіть предмети, які ви здававали на ЗНО`}
        emoji={books}
        onBack={() => window.history.back()}
      />
      <MyRatingList
        nextLink='/myrating/score/'
        nextDisabled={subjects.length <= 0 || subjects.length > 5}
      >
        { allSubjects?.map?.(subject => 
          <Checkbox
            key={subject}
            
            value={subjects.includes(subject)}
            onChange={v => setSubjects((s: string[]) => v ? [...s, subject] : s.filter((s: string) => s !== subject))}
            children={subject}
          />  
        ) }
      </MyRatingList>
    </>
  );
};

export default MyRatingSelectSubjectsPage;