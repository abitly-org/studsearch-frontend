import * as React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../components/input';
import MyRatingHeader from '../../components/myrating-header';
import MyRatingList from '../../components/myrating-list';

import bullseye from './bullseye.png';

const MyRatingSelectScorePage = () => {
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

  const params: any = useParams();
  const subjects: string[] = (filterSubjects())
  const [scores, setScores] = React.useState(fillingArray(subjects));
  

  function filterSubjects() {
    let index = params.subjects.match(/\d+/g);
    let subjects: string[] = [];
    for (let i = 0; i < index.length; i++) {
      for (let j = 0; j < allSubjects.length; j++) {
        if (j == +index[i]) {
          subjects.push(allSubjects[j])
        }
      }
    }
    return subjects
  }

  function fillingArray(subjects: string[]) {
    let scores: string[] = [];
    for(let i = 0; i < subjects.length; i++) {
      scores.push("");
    }
    return scores;
  }

  // function test() {
  //   for(let i = 0; i < scores.length; i++) {
  //     console.log(scores[i].length,'scores[i].length')
  //     if (scores[i] === "") {
  //       return true
  //     }
  //   }
  //   return false
  // }

  return (
    <>
      <MyRatingHeader
        step={3} stepsCount={3}
        header={'Введіть бали які ви отримали з цих предметів'}
        emoji={bullseye}
        onBack={`/myrating/subjects/${params.year}`}
      />
      <MyRatingList
        nextLink={`/myrating/loading/${params.year}/${params.subjects}/${scores}`}
        nextDisabled={scores.every((s: string) => !s)}
        nextLabel='Розрахувати рівень крутості'
      >
        { subjects?.map?.((subject: string, i: number) => 
          <Input
            key={i}
            name={'Бал з' + ' ' + subject}
            value={scores?.[i]}
            onChange={(value: string) => setScores((s: string[]) => s.map((v: string, j: number) => i === j ? value : v))}
          />
        ) }
      </MyRatingList>
    </>
  );
};

export default MyRatingSelectScorePage;