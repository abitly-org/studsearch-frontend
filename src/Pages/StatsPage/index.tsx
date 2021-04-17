import * as React from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import Button from '../../Components/Button';
import Dropdown2 from '../../Components/Dropdown2';
import Header from '../../Components/Header';
import { Column, Row } from '../../Components/Layout';
import { H1, H2, H3, P1, P3 } from '../../Components/Text';

import { ReactComponent as Arrow } from '../../Components/Dropdown2/Arrow.svg';

import './index.scss';
import { getUniversities, takeString, University } from '../../Helpers/api';
import useLoadPagination from '../../Components/LoadPagination/useLoadPagination';
import LoadingSpinner from '../../Components/LoadingSpinner';

import { Branch, Faculty, Speciality, getBranches, getFaculties, getSpecialities } from './api2';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const StatsPage = () => {
  const { t, i18n } = useTranslation();

  const [branch, setBranch] = React.useState<Branch | null>(null);
  const [specialities, setSpecialities] = React.useState<string[]>([]);
  const [regions, setRegions] = React.useState<string[]>([]);

  const [expanded, setExpanded] = React.useState<number | null>(null);

  const universities = useLoadPagination(
    React.useCallback((count, offset) => getUniversities(undefined, undefined, count, offset), [])
  );

  return (
    <div className='StatsPage'>
      <Header />
      <div className='Content'>
        <H2>Рейтинг Університетів</H2>
        <br />
        <br />
        <br />
        <div className='row'>
          <Dropdown2<Branch>
            className='DropdownShadow'
            style={{ flex: 1 }}
            name='Галузь'
            // values={['1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь']}
            pagination={React.useCallback(
              (count, offset, query) => getBranches(count, offset, query),
              []
            )}
            renderItem={v => v?.name}
            multiple={false}
            value={branch}
            onChange={setBranch}
          />
          <Dropdown2
            className='DropdownShadow'
            style={{ flex: 1 }}
            name='Спеціальність'
            // values={['1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь']}
            pagination={React.useCallback(
              async (count, offset) => {
                await wait(1000);
                return [...Array(count)].map((_, i) => `${i + offset} Спеціальність`);
              },
              []
            )}
            renderItem={v => v}
            multiple={true}
            value={specialities}
            onChange={setSpecialities}
          />
        </div>
        <div className='row'>
          <Dropdown2
            className='DropdownShadow'
            style={{ flex: 1 }}
            name='Регіон'
            // values={['1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь']}
            pagination={React.useCallback(
              async (count, offset) => {
                await wait(1000);
                return [...Array(count)].map((_, i) => `${i + offset} Регіон`);
              },
              []
            )}
            renderItem={v => v}
            multiple={true}
            value={regions}
            onChange={setRegions}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <H3 style={{ marginRight: 16 }}>Вищі навчальні заклади за галузю: {branch?.name}
          </H3>

          <Button
            onClick={() => {}}
            outline
            style={{ marginLeft: 'auto', flex: '0 0 auto' }}
          >
            Фільтри
          </Button>
        </div>
        <br />
        <br />
        <div>
          <Table>
            <TableHeaders />
            { universities.items.map((university, i) => 
              <UniversityComponent
                place={i}
                key={i}
                expanded={expanded == university.id}
                setExpanded={(v) => v ? setExpanded(university.id) : setExpanded(null)}
                university={university}
              />    
            ) }
          </Table>
          {
            universities.loading ? 
              <LoadingSpinner center-x />
              :
              <Button
                className='more-button' outline
                onClick={() => universities.dispatch()}
              >
                Загрузить ещё
              </Button>
          }
        </div>
      </div>
    </div>
  )
}

const Tabs = ({ tabs, index, setIndex } : { tabs: string[], index: number, setIndex: (n: number) => void }) => 
  <div className="Tabs">{
    tabs?.map?.((tab, i) => 
      <span className={cx('tab', { selected: i === index })} key={i} onClick={() => setIndex(i)}>
        <P1>{ tab }</P1>
      </span>
    )
  }</div>

const zno = {} as any;
const UniversityComponent = ({
  branchId,

  expanded, setExpanded,
  place,
  university
}: {
  branchId?: number,

  expanded: boolean,
  setExpanded: (e: boolean) => void,

  place: number,
  university: University
}) => {
  const { i18n } = useTranslation();

  const [tab, setTab] = React.useState(0); // 0 — факультеты, 1 — специальности


  return (
    <TableItem
      expanded={expanded}
      onExpandedChange={setExpanded}
      place={place}
      fullName={takeString(university.name, i18n.language)}
  
      num={university.studentsCount}
      zno={zno[university.id] ?? (zno[university.id] = 100 + Math.random() * 100)}
  
      children={expanded => 
        <div className={cx('university-content', { expanded })}>
          <Tabs
            tabs={['Факультети', 'Спеціальності']}
            index={tab}
            setIndex={setTab}
          />
          <br />
          <br />
          {
            ([
              <Faculties branchId={branchId} university={university} root={true} />,
              <Specialities branchId={branchId} university={university} root={true} />
            ])[tab]
          }
        </div>
      }
    />
  );
}
const Faculties = ({
  branchId, university, root, speciality
}: {
  university: University,
  speciality?: Speciality,
  branchId?: number,
  root?: boolean
}) => {
  const faculties = useLoadPagination(
    React.useCallback(
      (count, offset) => 
        getFaculties(branchId, university?.id, speciality?.id, count, offset)
          .then(faculties => 
            faculties.map(faculty => 
              <FacultyComponent
                branchId={branchId}
                university={university}
                faculty={faculty}
                root={root}
              />  
            )  
          )
      ,
      []
    )
  );
  return (
    <>
      <Table>
        {faculties.items ?? null}
      </Table>
      {
        faculties.loading ? 
          <LoadingSpinner center-x />
          :
          <Button
            className='more-button' outline
            onClick={() => faculties.dispatch()}
          >
            Загрузить ещё
          </Button>
      }
    </>
  )
}
const Specialities = ({
  branchId, university, root, faculty
}: {
  university: University,
  faculty?: Faculty,
  branchId?: number,
  root?: boolean
}) => {
  const specialities = useLoadPagination(
    React.useCallback(
      (count, offset) => 
        getSpecialities(branchId, [], university?.id, faculty?.id, count, offset)
          .then(faculties => 
            faculties.map(speciality => 
              <SpecialityComponent
                branchId={branchId}
                university={university}
                speciality={speciality}
                root={root}
              />  
            )  
          )
      ,
      []
    )
  );
  return (
    <>
      <Table>
        {specialities.items ?? null}
      </Table>
      {
        specialities.loading ? 
          <LoadingSpinner center-x />
          :
          <Button
            className='more-button' outline
            onClick={() => specialities.dispatch()}
          >
            Загрузить ещё
          </Button>
      }
    </>
  )
}

const FacultyComponent = ({
  faculty, university, branchId, root = true
} : {
  faculty: Faculty,
  university: University,
  branchId?: number,
  root?: boolean
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <TableItem
      expanded={expanded}
      onExpandedChange={
        root ? 
          setExpanded
          :
          undefined
      }

      fullName={faculty?.name}

      num={faculty?.count}
      zno={faculty?.zno}

      children={root ? ((expanded) =>
        <div className={cx('university-content', { expanded })}>
          <Specialities
            university={university}
            branchId={branchId}
            faculty={faculty}
            root={false}
          />
        </div>
      ) : undefined}
    />
  );
}
const SpecialityComponent = ({
  speciality, university, branchId, root = true
} : {
  speciality: Speciality,
  university: University,
  branchId?: number,
  root?: boolean
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <TableItem
      expanded={expanded}
      onExpandedChange={
        root ? 
          setExpanded
          :
          undefined
      }

      fullName={speciality?.name}

      num={speciality?.count}
      zno={speciality?.zno}

      children={root ? ((expanded) =>
        <div className={cx('university-content', { expanded })}>
          <Faculties
            university={university}
            branchId={branchId}
            speciality={speciality}
            root={false}
          />
        </div>
      ) : undefined}
    />
  );
}


const Table = ({ children, shown = true }: { children: React.ReactNode, shown?: boolean }) => 
  <div className={cx("Table", { shown })}>{ children }</div>;

const TableHeaders = () =>
  <div className='rating-tableheader'>
    <span className='expandbutton'>
      
    </span>
    <span className='column space'></span>
    <span className='place'>
      
    </span>
    <span className='name'>
      
    </span>
    <span className='num'>
      <P3>Кількість заяв</P3>
    </span>
    <span className='zno'>
      <span>
        <P3>Сердньозваженний бал</P3>
      </span>
      <span className='scale'>
        <P3><span></span>0</P3>
        <P3><span></span>50</P3>
        <P3><span></span>100</P3>
        <P3><span></span>150</P3>
        <P3><span></span>200</P3>
      </span>
    </span>
  </div>

const TableItem = ({
  expanded, onExpandedChange,

  place, shortName, fullName, num, zno,
  city, sub,

  children
}: {
  expanded?: boolean,
  onExpandedChange?: (newExpanded: boolean) => void,

  place?: number,
  shortName?: string,
  fullName?: string,
  num?: number,
  zno?: number,
  city?: string,
  sub?: boolean,

  children?: (expanded?: boolean) => JSX.Element
}) => (
  <div
    className={cx('rating-tableitem', { expanded })}
  >
    <div
      className={cx('Value', { expanded, sub })}
      onClick={() => onExpandedChange?.(!expanded)}
    >
      { sub && <span className='column space'></span> }
      { onExpandedChange ?
        <span
          className='ExpandButton'
          onClick={() => onExpandedChange?.(!expanded)}
        >
          <Arrow />
        </span>
        :
        <span className='column space'></span>
      }
      { !sub && <span className='column space'></span> }
      <span className='column place'>
        <P1>{place}.</P1>
      </span>
      <span className='column name'>
        <P1>
          <span className='short'>{shortName ?? fullName}</span>
          <span className='full'>{fullName ?? shortName}</span>
        </P1>
      </span>
      <span className='column num'>
        <P1>{num}</P1>
      </span>
      <span className='column zno'>
        { zno !== undefined &&
          <span className='bar'>
            <span className='value' style={{ width: zno / 200 * 100 + '%'}}>
              <P1>{ (~~(zno * 10) / 10).toFixed(1) }</P1>
            </span>
          </span>
        }
      </span>
      <span className='column city'>
        <P1>{city}</P1>
      </span>
    </div>
    <div className='Content'>
      { children?.(expanded) }
    </div>
  </div>
);

export default StatsPage;