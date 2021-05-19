import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown2 from '../../Components/Dropdown2';
import useLoadPagination from '../../Components/LoadPagination/useLoadPagination';
import StudentCard from '../../Components/StudentCard';
import TabFilter from '../../Components/TabFilter';
import { addQuery, count, Courses, Faculty, getFaculties, getQuery, getRegions, getSpecialities, getStudents, getUniversities, Region, Speciality, takeString, University } from '../../Helpers/api';
import useLoad, { useDeepCompareMemoize } from '../../Helpers/useLoad';

import specialty from '../../Components/StudentCard/specialty.svg';
import university from '../../Components/StudentCard/university.svg';

import './index.scss';
import { P1, P4 } from '../../Components/Text';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Button from '../../Components/Button';
import { FacultyDropdown, RegionDropdown, SpecialityDropdown, UniversityDropdown } from '../../Components/Dropdown2/custom';

const useQueryState = <T extends unknown>(
  initialState: T,
  queryKey: string,
  toQuery: (value: T) => string | undefined,
  fromQuery: (str: string) => T
) => {
  const initialQuery = React.useMemo(() => {
    const queryValue = getQuery(queryKey);
    if (queryValue !== null)
      return fromQuery(queryValue);
  }, []);
  const [value, setValue] = React.useState(initialQuery ?? initialState);
  React.useEffect(() => {
    window.history.replaceState(
      null,
      window.document.title,
      addQuery(queryKey, toQuery(value))
    )
  }, [ value ]);

  return [value, setValue] as [T, (newValue: T) => void];
}
const useQueryIdName = <T extends { id?: number | any, name?: string | any }[]>(
  initialState: T,
  queryKey: string
) =>
  useQueryState<T>(
    initialState,
    queryKey,
    objs => objs?.map?.(o => `${o?.id},${o?.name}`)?.join?.(';') ?? '',
    str => (str ?? '').split(/\;/g).map(rs => {
      const commaIndex = rs.indexOf(',');
      return { id: parseFloat(rs.substring(0, commaIndex)), name: rs.substring(commaIndex + 1) };
    }) as T
  );
const useOnScroll = (callback: () => void, deps: React.DependencyList = []) => 
  React.useEffect(() => {
    window.addEventListener('scroll', callback);
    return () => window.removeEventListener('scroll', callback);
  }, [ callback, ...deps ]);

const useNotFirstEffect = (callback: React.EffectCallback, deps: React.DependencyList) => {
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      return callback();
    }
  }, deps);
}

const CoursesCount = 7;

const BlockStudents = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;

  const allRegions = useLoad(() => getRegions().then(r => r?.regions));
  const [regions, setRegions] = useQueryIdName<Region[]>([], 'region');
  const [universities, setUniversities] = useQueryIdName<University[]>([], 'university');
  const [specialties, setSpecialities] = useQueryIdName<Speciality[]>([], 'specialty');
  const [faculties, setFaculties] = useQueryIdName<Faculty[]>([], 'faculty');
  const [courses, setCourses] = useQueryState<number[] | undefined>(
    undefined,
    'course',
    c => c === undefined ? undefined : c?.join?.(',') ?? undefined,
    str => {
      if (!str)
        return undefined;
      return (str ?? '').split(/\,/g).map(s => parseInt(s)).filter(n => !isNaN(n))
    }
  );

  useNotFirstEffect(() => setUniversities([]), [ regions ]);
  useNotFirstEffect(() => {
    setSpecialities([]);
    setFaculties([]);
  }, [ universities ]);

  const students = useLoadPagination(
    React.useCallback(
      async (count, offset) =>
        getStudents(
          count, offset,
          regions?.map?.(r => r?.id),
          universities?.map?.(u => u?.id),
          specialties?.map?.(s => s?.id),
          faculties?.map?.(f => f?.id),
          courses
        ),
      useDeepCompareMemoize([ regions, universities, specialties, faculties, courses ])
    ),
    12,
    150
  );

  const stats = useLoad(count, []);

  const lastRender = React.useRef(0);
  React.useEffect(() => { lastRender.current = Date.now() });

  const lastDispatch = React.useRef(0);
  const loadMore = React.useRef<HTMLSpanElement>(null);
  useOnScroll?.(() => {
    if ((students.loading || students.error) && Date.now() - lastRender.current < 1500)
      return;

    const rect = loadMore.current?.getBoundingClientRect?.();
    if (rect &&
        rect?.top >= 0 &&
        rect?.left >= 0 && 
        rect?.bottom <= (window.innerHeight ?? document.documentElement.clientHeight) &&
        rect?.right <= (window.innerWidth ?? document.documentElement.clientWidth)
      ) {
      students?.dispatch?.();
    }
  }, [ students?.dispatch ]);
  
  return (
    <div className='BlockStudents'>
      <div className='Filters'>
        <RegionDropdown
          className='Region'
          name={t('block-students-region')}

          multiple
          value={regions} onChange={setRegions}
        />
        <UniversityDropdown
          className='University'
          name={t('block-students-university')}

          regions={regions}

          multiple
          value={universities}
          onChange={setUniversities}
        />
        <FacultyDropdown
          className='Faculty'
          name={t('block-students-faculty')}

          universities={universities}

          multiple
          value={faculties}
          onChange={setFaculties}
        />
        <SpecialityDropdown
          className='Speciality'
          name={t('block-students-specialty')}
          
          universities={universities}
          
          multiple
          value={specialties}
          onChange={setSpecialities}
        />
        <div className='Bottom'>
          <TabFilter<{ id?: number, name: string }>
            className='Course'
            tabs={[
              { name: t(`student-course-all`), id: undefined },
              ...[...Array(CoursesCount)]
                .map((_, id) => ({ name: t(`student-course-${id}`), id }))
            ]}
            renderItem={c => c?.name}
            isSelected={({ id }) => 
              (id === undefined && courses === undefined) ||
              (id !== undefined && courses !== undefined && courses.includes(id))
            }
            onClick={(value, { id }) => {
              if (id === undefined)
                setCourses(undefined);
              else {
                if (!value) {
                  const newCourses = [...(courses ?? []), id];
                  setCourses(newCourses.length === CoursesCount ? undefined : newCourses);
                } else {
                  const newCourses = (courses ?? []).filter(c => c !== id);
                  setCourses(newCourses.length <= 0 ? undefined : newCourses);
                }
              }
            }}
          />
          { stats &&
            <div className='Stats'>
              <P1>
                {stats?.studentsCount}
                {' '}
                <img className='student' src={specialty} />
                {t('from')}
                {' '}
                {stats?.universitiesCount}
                <img className='university' src={university} />
              </P1>
            </div>
          }
        </div>
      </div>
      <div className='Students'>
        {
          students?.items
            ?.filter?.((item, index, arr) => 
              arr?.findIndex?.(e => e?.uuid === item?.uuid) === index
            )
            ?.map?.((student, key) => 
              <StudentCard
                key={key}
                student={student}
              />
            )
        }
        { students?.loading && !students?.error &&
          <LoadingSpinner className='loading fullrow' center-x />
        }
        { students?.error &&
          <P1 className='fullrow' style={{ textAlign: 'center' }}>
            {t('students-error')}
          </P1>
        }
        <span ref={loadMore} className='fullrow load-more' />
        { students.hasMore && 
          <div className='fullrow space' />
        }
        { !students.hasMore && students.items.length > 0 && 
          <P1 className='fullrow' style={{ textAlign: 'center' }}>
            {t('students-end')}
            <br />
            <br />
            <Button
              children={t('block-stats-register')}
              to='/register/'
            />
          </P1>
        }
        { !students.hasMore && students.items.length === 0 && 
          <P1 className='fullrow' style={{ textAlign: 'center' }}>
            {t('students-empty')}
            <br />
            <br />
            <Button
              children={t('block-stats-register')}
              to='/register/'
            />
          </P1>
        }
      </div>
    </div>
  );
}

export default BlockStudents;