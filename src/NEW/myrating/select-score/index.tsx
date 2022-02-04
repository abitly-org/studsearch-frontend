import * as React from 'react';

import Input from '../../components/input';
import MyRatingHeader from '../../components/myrating-header';
import MyRatingList from '../../components/myrating-list';

import bullseye from './bullseye.png';

import useLocalStorage from '../../utils/localStorage';

const MyRatingSelectScorePage = () => {
  const subjects: string[] = JSON.parse(localStorage.getItem('subjects') || '[]');
  const [scores, setScores] = useLocalStorage('scores', ["","","","",""]);

  // React.useEffect(() => {
  //   fillingArray(subjects);
  // }, []);
  
  //function fillingArray(subjects: string[]) {
  //  let scores: string[] = [];
  //  for(let i = 0; i < subjects.length; i++) {
  //    scores.push("");
  //  }
  //  return scores;
  //}

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
        onBack={() => window.history.back()}
      />
      <MyRatingList
        nextLink='/myrating/loading/'
        nextDisabled={scores.every((s: string) => !s)}
        nextLabel='Розрахувати рівень крутості'
      >
        { subjects?.map?.((subject, i) => 
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