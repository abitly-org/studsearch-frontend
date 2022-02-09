import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Checkbox from '../../components/checkbox';
import MyRatingHeader from '../../components/myrating-header';
import MyRatingList from '../../components/myrating-list';

import books from './books.png';

const MyRatingSelectSubjectsPage = () => {
  const allSubjects: string[] = [
    // 'Українська мова і література',
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
    // 'Іспанська мова'
  ];

  const params: any = useParams();
  const [subjects, setSubjects] = React.useState([allSubjects[0]]);

  function indexSubjects() {
    let index: string[] = [];
    for (let i = 0; i < subjects.length; i++) {
      index.push(JSON.stringify(allSubjects.indexOf(subjects[i])));
    }
    return index;
  }

  return (
    <>
      <MyRatingHeader
        step={2} stepsCount={3}
        header={`Оберіть предмети, які ви здававали на ЗНО`}
        emoji={books}
        onBack={'/myrating/years'}
      />
      <MyRatingList
        nextLink={`/myrating/scores/${params.year}/${indexSubjects()}`}
        nextDisabled={subjects.length <= 0}
      >
        { allSubjects?.map?.((subject) => 
          <Checkbox
            key={subject}
            limiter={subjects.length >= 4}

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