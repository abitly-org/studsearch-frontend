import * as React from 'react';
import cx from 'classnames';
import { LoadStudentFilters, regionInlined } from '../../Blocks/Students';
import LoadingSpinner from '../../Components/LoadingSpinner';
import useLoadPagination from '../../Components/LoadPagination/useLoadPagination';
import StudentCard from '../../Components/StudentCard';
import { H4, P2 } from '../../Components/Text';
import { Faculty, getQuery, getStudents, makeQuery, Region, Speciality, takeString, University } from '../../Helpers/api';
import useLoad, { useDeepCompareMemoize } from '../../Helpers/useLoad';
import logo from '../../Components/Header/logo.svg';

import './index.scss';
import Button from '../../Components/Button';

const StudentsWidget = ({
  _regions, _specialties, _universities, _faculties
}: {
  _regions: Region[],
  _specialties: Speciality[],
  _universities: University[],
  _faculties: Faculty[]
}) => {
  const count = getQuery('count') ?? 3;

  const courses = getQuery('course')?.split?.(' ');
  const [all, setAll] = React.useState<number | null>(null);
  
  const students = useLoad(async () => {
      const [all, students] = await getStudents(
        count as any, 0,
        _regions?.map?.(r => r?.id),
        _universities?.map?.(u => u?.id),
        _specialties?.map?.(s => s?.id),
        _faculties?.map?.(f => f?.id),
        courses?.map?.(c => Number(c))
      );
      setAll(all);
      return students;
    },
    [ ]
  );

  const universities = (
    _universities?.map?.(u => u?.short ?? takeString(u?.name, 'ua'))?.join(', ')
  );
  const regions = (
    _regions?.map?.(r => regionInlined?.[r?.id])?.filter(r => !!r)?.join(', ')
  );

  const toMainPage = (
    `https://studsearch.org/${makeQuery({ 
      region: getQuery('region'),
      university: getQuery('university'),
      specialty: getQuery('specialty'),
      faculty: getQuery('faculty'),
      course: getQuery('course')
    })}`
  );
  

  const title = all ? (
    `${all} студент${(['ів', '', 'a', 'a', 'ів', 'ів', 'ів', 'ів', 'ів'])[all % 10] ?? ''}` +
    ` готов${all % 10 > 1 ? 'і' : ''} розповісти` + (
      universities ? 
        ` про ${universities}` :
        (
          regions ?
            ` про університет${all > 1 ? 'и' : ''} ${regions}` :
            ` про університет${all > 1 ? 'и' : ''} України`
        )
    )
  ) : '';

  return (
    <div className='StudentsWidget'>
      <span className='Header'>
        <a href={toMainPage} target="_blank">
          <img src={logo} />
        </a>
        <H4>{title}</H4>
      </span>
      <div className={cx('Students', { two: students?.length === 2, one: students?.length === 1 })}>
        { students?.map((student, key) =>
          <StudentCard
            small
            showUniversity={
              _universities?.length !== 1
            }
            student={student}
          />
        ) }
      </div>
      { students === null &&
        <LoadingSpinner center />
      }
      { students !== null && (typeof all === 'number' && students?.length < all) &&
        <div className='LoadMore'>
          <Button
            href={toMainPage}
            target='_blank'
          >
            <P2>Інш{all - students?.length > 1 ? 'і' : 'ий'} {all - students?.length} студент{(all - students?.length) <= 1 ? '' : ((all - students?.length) % 10 < 5 ? 'a' : 'и')}...</P2>
          </Button>
        </div>
      }
      {
        students?.length === 0 &&
          <>
            <P2>От халепа, тут повинні бути студенти, але ми їх не знайшли.</P2>
            <br />
            <br />
            <Button
              href={toMainPage}
              target='_blank'
            >
              <P2>Можливо у вас вийде знайти їх!</P2>
            </Button>
          </>
      }
    </div>
  );
}

export default (() => {
  const bg = getQuery('bg');
  if (bg)
    document.body.style.background = bg;

  return <LoadStudentFilters children={StudentsWidget} />
});