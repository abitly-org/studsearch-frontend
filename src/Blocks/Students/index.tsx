import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown2 from '../../Components/Dropdown2';
import useLoadPagination from '../../Components/LoadPagination/useLoadPagination';
import StudentCard, { RegisterCard } from '../../Components/StudentCard';
import TabFilter from '../../Components/TabFilter';
import { addQuery, count, Courses, Faculty, getFaculties, getFilterNames, getQuery, getRegions, getSpecialities, getStudents, getUniversities, Region, Speciality, Student, takeString, University } from '../../Helpers/api';
import useLoad, { useDeepCompareMemoize } from '../../Helpers/useLoad';

import specialty from '../../Components/StudentCard/specialty.svg';
import university from '../../Components/StudentCard/university.svg';

import './index.scss';
import { H2, H3, P1, P4 } from '../../Components/Text';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Button from '../../Components/Button';
import { FacultyDropdown, RegionDropdown, SpecialityDropdown, UniversityDropdown } from '../../Components/Dropdown2/custom';
import { useRegistered } from '../../Helpers/session';
import useTitle, { useDescription } from '../../Helpers/useTitle';
import plural from '../../Helpers/plural';

export const regionInlined = {
  1: "в Запорізькій обл.",
  2: "в Полтавській обл.",
  3: "в Сумській обл.",
  4: "у Києві",
  5: "у Кіровоградській обл.",
  6: "в Хмельницькій обл.",
  7: "в Одеській обл.",
  8: "у Миколаївській обл.",
  9: "в Дніпропетровській обл.",
  10: "у Херсонській обл.",
  11: "у Житомирській обл.",
  12: "в Черкаській обл.",
  13: "у Рівненській обл.",
  14: "у Львівській обл.",
  15: "у Волинській обл.",
  16: "у Вінницькій обл.",
  17: "в Харківській обл.",
  18: "в Івано-Франківській обл.",
  19: "в Донецькій обл.",
  20: "у Київській обл.",
  21: "в Луганській обл.",
  22: "в Чернігівській обл.",
  23: "у Тернопільській обл.",
  24: "у Чернівецькій обл.",
  25: "у Закарпатській обл.",
  27: "у Закарпатській обл."
} as Record<number, string>;

export const useQueryState = <T extends unknown>(
  initialState: T,
  queryKey: string,
  toQuery: (value: T) => string | undefined,
  fromQuery: (str: string) => T,
  preferInitial?: boolean
) => {
  const initialQuery = React.useMemo(() => {
    const queryValue = getQuery(queryKey);
    if (queryValue !== null)
      return fromQuery(queryValue);
  }, []);
  const [value, setValue] = React.useState<T>(
    preferInitial ?
      (initialState ?? initialQuery) as T :
      (initialQuery ?? initialState)
  );
  React.useEffect(() => {
    window.history.replaceState(
      null,
      window.document.title,
      addQuery(queryKey, toQuery(value))
    )
  }, [ value ]);

  return [value, setValue] as [T, (newValue: T) => void];
}
export const useQueryIdName = <T extends { id?: number | any, name?: string | any }[]>(
  initialState: T,
  queryKey: string,
  preferInitial?: boolean
) =>
  useQueryState<T>(
    initialState,
    queryKey,
    objs => objs?.map?.(o => `${o?.id},${o?.name}`)?.join?.(';') ?? '',
    str => (str ?? '').split(/\;/g).map(rs => {
      const commaIndex = rs.indexOf(',');
      return { id: parseFloat(rs.substring(0, commaIndex)), name: rs.substring(commaIndex + 1) };
    }) as T,
    preferInitial
  );
export const useQueryId = <T extends { id?: number | any }[] = { id?: number | any }[]>(
  initialState: T,
  queryKey: string,
  preferInitial?: boolean
) =>
  useQueryState<T>(
    initialState,
    queryKey,
    objs => objs?.map?.(o => String(o?.id))?.join?.(',') ?? '',
    str => (str ?? '').split(/\,/g).map(rs => ({ id: parseFloat(rs) })) as T,
    preferInitial
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

const BlockStudentsWrapper = () => {
  const [ queryRegions, setQueryRegions ] = useQueryId<any>([], 'region');
  const [ queryUniversities, setQueryUniversities ] = useQueryId<any>([], 'university');
  const [ querySpecialties ] = useQueryId([], 'specialty');
  const [ queryFaculties ] = useQueryId([], 'faculty');

  const [refreshId, setRefreshId] = React.useState(0);
  const refresh = () => setRefreshId(i => i + 1);

  // @ts-ignore
  window.setRegionId = (regionId?: number) => {
    setQueryRegions(regionId ? [{ id: regionId }] : []);
    refresh();
  }
  // @ts-ignore
  window.setUniversityId = (universityId?: number) => {
    setQueryUniversities(universityId ? [{ id: universityId }] : [])
    refresh();
  }

  const loaded = useLoad(() => 
    getFilterNames(
      queryRegions?.map?.((r: any) => r?.id),
      queryUniversities?.map?.((u: any) => u?.id),
      querySpecialties?.map?.((s: any) => s?.id),
      queryFaculties?.map?.((f: any) => f?.id)
    ),
    [ refreshId ]
  );

  if (!loaded)
    return <LoadingSpinner center />;

  return (
    <BlockStudents
      _regions={loaded?.regions ?? []}
      _universities={loaded?.universities ?? []}
      _specialties={loaded?.specialties ?? []}
      _faculties={loaded?.faculties ?? []}
    />
  )
}

const BlockStudents = ({
  _regions = [],
  _universities = [],
  _specialties = [],
  _faculties = []
}: {
  _regions?: Region[],
  _universities?: University[],
  _specialties?: Speciality[],
  _faculties?: Faculty[]
}) => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;

  const registered = useRegistered();

  // const allRegions = useLoad(() => getRegions().then(r => r?.regions));
  const [regions, setRegions] = useQueryId<Region[]>(_regions, 'region', true);
  const [universities, setUniversities] = useQueryId<University[]>(_universities, 'university', true);
  const [specialties, setSpecialities] = useQueryId<Speciality[]>(_specialties, 'specialty', true);
  const [faculties, setFaculties] = useQueryId<Faculty[]>(_faculties, 'faculty', true);
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

  useNotFirstEffect(() =>
    setUniversities([]),
    [ regions ]
  );
  useNotFirstEffect(() => {
    setSpecialities([]);
    setFaculties([]);
  }, [ universities ]);

  const [all, setAll] = React.useState<number>();
  const students = useLoadPagination(
    React.useCallback(
      async (count, offset) => {
        const [ all, students ] = await getStudents(
          count, offset,
          regions?.map?.(r => r?.id),
          universities?.map?.(u => u?.id),
          specialties?.map?.(s => s?.id),
          faculties?.map?.(f => f?.id),
          courses
        );
        setAll(all);
        return students;
      },
      useDeepCompareMemoize([ regions, universities, specialties, faculties, courses ])
    ),
    React.useCallback(offset => 
      offset > 0 || registered ? 9 : 8,
      []
    ),
    150
  );
  const studentItems: (Student | 'register')[] = (
    students?.items
      ?.filter?.((item, index, arr) => 
        arr?.findIndex?.(e => e?.uuid === item?.uuid) === index
      )
  );
  if (!registered && !students?.error && studentItems?.length > 0) {
    studentItems.push('register');
  }

  const stats = useLoad(() => 
    count(
      regions?.map?.(r => r?.id),
      universities?.map?.(u => u?.id),
      specialties?.map?.(s => s?.id),
      faculties?.map?.(f => f?.id),
      courses
    ),
    [ regions, universities, specialties, faculties, courses ]
  );

  const lastRender = React.useRef(0);
  React.useEffect(() => { lastRender.current = Date.now() });

  const noRegions = regions?.length === 0,
        noUniversities = universities?.length === 0,
        noSpecialties = specialties?.length === 0,
        noFaculties = faculties?.length === 0;
  const titlePrefix = t('title') + ' — ';
  let title = titlePrefix + t('title-main'), header = '';
  if (regions?.length === 1 && noUniversities && noSpecialties && noFaculties) {
    const region = regionInlined?.[regions?.[0]?.id] ?? ('у ' + regions?.[0]?.name),
          n = stats?.studentsCount;
    if (n && n > 10) {
      title = titlePrefix + t(plural('title-main-region-n', n), { region, n });
    } else {
      title = titlePrefix + t('title-main-region', { region });
    }

    if (n)
      header = t(plural('block-students-header-region-n', n), { region, n });
  } else if (universities?.length === 1 && noSpecialties && noFaculties) {
    const university = universities?.[0]?.short ?? universities?.[0]?.name,
          n = stats?.studentsCount;
    if (n && n > 10) {
      title = titlePrefix + t(plural('title-main-university-n', n), { university, n });
    } else {
      title = titlePrefix + t('title-main-university', { university });
    }

    if (n)
      header = t(plural('block-students-header-university-n', n), { university, n });
  }
  useTitle(title);
  useDescription(t('description-main'));

  // const loadMore = React.useRef<HTMLSpanElement>(null);
  // useOnScroll?.(() => {
  //   if ((students.loading || students.error) && Date.now() - lastRender.current < 1500)
  //     return;

  //   const rect = loadMore.current?.getBoundingClientRect?.();
  //   if (rect &&
  //       rect?.top >= 0 &&
  //       rect?.left >= 0 && 
  //       rect?.bottom <= (window.innerHeight ?? document.documentElement.clientHeight) &&
  //       rect?.right <= (window.innerWidth ?? document.documentElement.clientWidth)
  //     ) {
  //     students?.dispatch?.();
  //   }
  // }, [ students?.dispatch ]);
  
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
          { stats && stats?.studentsCount > 0 &&
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
      { header && all !== 0 && (!students?.loading || students?.items?.length > 0) &&
        <div className='StudentsHeader'>
          <H3>{header}</H3>
        </div>
      }
      <div className='Students'>
        {
          studentItems
            ?.map?.((item, key) =>
              item === 'register' ?
                <RegisterCard key={key} /> : 
                <StudentCard
                  key={key}
                  student={item}
                />
            )
        }
        { students?.loading && !students?.error &&
          <LoadingSpinner key='loading' className='loading fullrow' center-x />
        }
        { students?.error &&
          <P1 key='error' className='fullrow' style={{ textAlign: 'center' }}>
            {t('students-error')}
          </P1>
        }
        {/* <span ref={loadMore} className='fullrow load-more' /> */}
        { !students?.loading && students?.hasMore &&
          <div key='load-more' className='fullrow load-more-row'>
            <Button onClick={students?.dispatch}>
              <P1>{t('students-load-more')}</P1>
            </Button>
          </div>
        }
        { students.hasMore && 
          <div key='space' className='fullrow space' />
        }
        { !students.hasMore && students.items.length > 0 && 
          <P1 key='end' className='fullrow' style={{ textAlign: 'center' }}>
            {t('students-end')}{!registered && t('students-end-ad')}
            <br />
            <br />
            { !registered &&
              <Button
                children={t('block-stats-register')}
                to='/register/'
              />
            }
          </P1>
        }
        { !students.hasMore && students.items.length === 0 && 
          <P1 key='empty' className='fullrow' style={{ textAlign: 'center' }}>
            {t('students-empty')}{!registered && t('students-empty-ad')}
            <br />
            <br />
            { !registered &&
              <Button
                children={t('block-stats-register')}
                to='/register/'
              />
            }
          </P1>
        }
      </div>
    </div>
  );
}

// export default BlockStudents;
export default BlockStudentsWrapper;