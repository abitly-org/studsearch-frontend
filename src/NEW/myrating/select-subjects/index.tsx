import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Checkbox from '../../components/checkbox';
import MyRatingHeader from '../../components/myrating-header';
import MyRatingList from '../../components/myrating-list';

import books from './books.png';

const MyRatingSelectSubjectsPage = () => {
  // const allSubjects: string[] = [
  //   'Українська мова і література',
  //   'Українська мова',
  //   'Історія України',
  //   'Математика',
  //   'Біологія',
  //   'Географія',
  //   'Фізика',
  //   'Хімія',
  //   'Англійська мова',
  //   'Французька мова',
  //   'Німецька мова',
  //   'Іспанська мова'
  // ];
  interface IAllSubjects {
    subject: string,
    subjectEnglish: string,
  }

  const allSubjects: IAllSubjects[] = [
    {
      subject: 'Українська мова і література',
      subjectEnglish: 'Ukrainian literature',
    },
    {
      subject: 'Українська мова',
      subjectEnglish: 'Ukrainian',
    },
    {
      subject: 'Історія України',
      subjectEnglish: 'History of Ukraine',
    },
    {
      subject: 'Математика',
      subjectEnglish: 'Maths',
    },
    {
      subject: 'Біологія',
      subjectEnglish: 'Biology',
    },
    {
      subject: 'Географія',
      subjectEnglish: 'Geography',
    },
    {
      subject: 'Фізика',
      subjectEnglish: 'Physics',
    },
    {
      subject: 'Хімія',
      subjectEnglish: 'Chemistry',
    },
    {
      subject: 'Англійська мова',
      subjectEnglish: 'English',
    },
    {
      subject: 'Французька мова',
      subjectEnglish: 'French',
    },
    {
      subject: 'Німецька мова',
      subjectEnglish: 'German',
    },
    {
      subject: 'Іспанська мова',
      subjectEnglish: 'Spanish',
    }
  ];

  const params: any = useParams()
  const [subjects, setSubjects] = React.useState([allSubjects[0].subject])
  console.log(params)

  return (
    <>
      <MyRatingHeader
        step={2} stepsCount={3}
        header={`Оберіть предмети, які ви здававали на ЗНО`}
        emoji={books}
        onBack={'/myrating/years'}
      />
      <MyRatingList
        nextLink={`/myrating/scores/${params.year}/${JSON.stringify(subjects)}`}
        nextDisabled={subjects.length <= 0}
      >
        { allSubjects?.map?.(({subject}) => 
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