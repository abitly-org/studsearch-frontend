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

const Item = ({ children, studentsCount, universitiesCount, inDropdown }: {
  children: React.ReactNode,
  studentsCount?: number,
  universitiesCount?: number,
  inDropdown: boolean
}) : JSX.Element =>
  inDropdown ? 
    <P4 className='DropdownItem'>
      {children}
      { (studentsCount || universitiesCount) &&
        <span className="Stat">
          { studentsCount && 
            <span className='StudentsCount'>
              <img src={specialty} />
              <P4>{studentsCount}</P4>
            </span>
            || null
          }
          { universitiesCount && 
            <span className='UniversitiesCount'>
              <img src={university} />
              <P4>{universitiesCount}</P4>
            </span>
            || null
          }
        </span>
        || null
      }
    </P4>
    :
    <P4>{children}</P4>

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
    if (students.loading && Date.now() - lastRender.current < 1500)
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
        <Dropdown2<Region>
          className='Region'
          name='Регіон'
          withShadow
          renderItem={(r, inDropdown) => 
            <Item
              children={r?.name}
              studentsCount={Number(r?.studentsCount)}
              universitiesCount={Number(r?.universitiesCount)}
              inDropdown={inDropdown}
            />
          }

          values={allRegions ?? []}
          loading={allRegions === null}

          multiple
          value={regions}
          onChange={setRegions}
        />
        <Dropdown2<University>
          className='University'
          name='Вищій навчальний заклад'
          withShadow
          renderItem={(r, inDropdown) => 
            <Item
              children={takeString(r?.name, lng)}
              studentsCount={Number(r?.studentsCount)}
              inDropdown={inDropdown}
            />
          }

          pagination={React.useCallback((count, offset, query) => 
            getUniversities(query, regions?.map?.(r => r?.id), count, offset),
            [ regions ]
          )}

          multiple
          value={universities}
          onChange={setUniversities}
        />
        <Dropdown2<Speciality>
          className='Speciality'
          name='Спеціальність'
          withShadow
          renderItem={(s, inDropdown) => 
            <Item
              children={takeString(s?.name, lng)}
              studentsCount={Number(s?.studentsCount)}
              inDropdown={inDropdown} 
            />
          }

          pagination={React.useCallback(async (count, offset, query) => 
            universities?.length > 0 ? 
              getSpecialities(query, universities?.map?.(u => u?.id), count, offset)
              :
              [],
            [ universities ]
          )}
          disabled={universities?.length === 0}

          multiple
          value={specialties}
          onChange={setSpecialities}
        />
        <Dropdown2<Faculty>
          className='Faculty'
          name='Факультет'
          withShadow
          renderItem={(s, inDropdown) => 
            <Item
              children={takeString(s?.name, lng)}
              studentsCount={Number(s?.studentsCount)}
              inDropdown={inDropdown}
            />
          }

          pagination={React.useCallback(async (count, offset, query) => 
            universities?.length > 0 ? 
              getFaculties(query, universities?.map?.(u => u?.id), count, offset)
              :
              [],
            [ universities ]
          )}
          disabled={universities?.length === 0}

          multiple
          value={faculties}
          onChange={setFaculties}
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
        </div>
      </div>
      <div className='Students'>
        {
          students?.items?.map?.((student, key) => 
            <StudentCard
              key={key}
              student={student}
            />
          )
        }
        { students?.loading &&
          <LoadingSpinner center-x />
        }
        <span ref={loadMore} className='load-more' />
      </div>
    </div>
  );
}

export default BlockStudents;