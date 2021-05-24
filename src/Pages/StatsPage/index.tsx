import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import Button from '../../Components/Button';
import Dropdown2 from '../../Components/Dropdown2';
import Header from '../../Components/Header';
import { Column, Row } from '../../Components/Layout';
import { H1, H2, H3, P1, P3 } from '../../Components/Text';

import { ReactComponent as Arrow } from '../../Components/Dropdown2/Arrow.svg';

import './index.scss';
import { takeString } from '../../Helpers/api';
import useLoadPagination from '../../Components/LoadPagination/useLoadPagination';
import LoadingSpinner from '../../Components/LoadingSpinner';

import { Branch, Faculty, Speciality, getBranches, getFaculties, getSpecialities, getUniversities, Region, University, getRegions } from './api2';
import useLoad from '../../Helpers/useLoad';
import { Link } from 'react-router-dom';
import { regionInlined, useQueryIdName } from '../../Blocks/Students';
import useTitle from '../../Helpers/useTitle';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type PositionType = 'budget' | 'contract';
const StatsPage = () => {
  const { t, i18n } = useTranslation();

  const [branches, setBranches] = useQueryIdName<Branch[]>([], 'branches');
  const [specialities, setSpecialities] = useQueryIdName<Speciality[]>([], 'specialties');
  const [regions, setRegions] = useQueryIdName<Region[]>([], 'regions');

  React.useEffect(() => setSpecialities([]), [ branches ]);

  const [expanded, setExpanded] = React.useState<number | null>(null);

  const [positionType, setPositionType] = React.useState<PositionType>('budget');

  const universities = useLoadPagination(
    React.useCallback(
      (count, offset) => 
        getUniversities(
          branches?.map?.(b => b?.id),
          specialities?.map?.(s => s?.id), 
          regions?.map?.(r => r?.id),
          positionType,
          count,
          offset,
          true
        ), 
      [ positionType, specialities, regions, branches ])
  );

  let title = t('title-rating');
  if (regions?.length === 1 && 
      specialities?.length === 0 &&
      branches?.length === 0) {
    const region = regionInlined?.[regions?.[0]?.id] ?? regions?.[0]?.name;
    title = t('title-rating-region', { region })
  } else if (regions?.length === 0 &&
           specialities?.length === 1 &&
           branches?.length === 0) {
    const specialty = (specialities?.[0]?.code ? specialities?.[0]?.code + ' ' : '') + specialities?.[0]?.name;
    title = t('title-rating-specialty', { specialty });
  } else if (regions?.length === 0 &&
            specialities?.length === 0 &&
            branches?.length === 0) {
    const branch = (branches?.[0]?.name);
    if (branch)
      title = t('title-rating-branch', { branch });
  }

  useTitle(t('title') + ' — ' + title);

  return (
    <div className='StatsPage'>
      {/* <Helmet>
        <title>StudSearch — Рейтинги університетів України</title>
        <meta name="title" content="StudSearch — Рейтинги університетів України" />
        <meta property="og:title" content="StudSearch — Рейтинги університетів України" />
        <meta name="twitter:title" content="StudSearch — Рейтинги університетів України" />
      </Helmet> */}
      <div className='Content'>
        <H2>{t('stats-header')}</H2>
        <br />
        <br />
        <br />
        <div className='row'>
          <Dropdown2<Branch>
            className='DropdownShadow'
            style={{ flex: 1 }}
            name={t('stats-branch')}
            // values={['1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь']}
            pagination={React.useCallback(
              (count, offset, query) => getBranches(count, offset, query),
              []
            )}
            renderItem={v => v?.name}
            multiple={true}
            value={branches}
            onChange={setBranches}

            equals={(a, b) => a?.id === b?.id}
          />
          <Dropdown2
            className='DropdownShadow'
            style={{ flex: 1 }}
            name={t('stats-specialty')}
            // values={['1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь']}
            pagination={React.useCallback(
              (count, offset, query) => getSpecialities(branches?.map?.(b => b?.id), [], undefined, undefined, count, offset, query),
              [ branches ]
            )}
            renderItem={v => (v?.code ? v?.code + ' ' : '') + v?.name}
            multiple={true}
            value={specialities}
            onChange={setSpecialities}

            equals={(a, b) => a?.id === b?.id}
          />
        </div>
        <div className='row'>
          <Dropdown2
            className='DropdownShadow'
            style={{ flex: 1 }}
            name={t('stats-region')}
            // values={regions ?? []}
            pagination={React.useCallback(
              (count, offset, query) => getRegions(count, offset, query),
              []
            )}
            renderItem={v => v?.name}
            multiple={true}
            value={regions}
            onChange={setRegions}

            equals={(a, b) => a?.id === b?.id}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <H3 style={{ marginRight: 16 }}>
            {
              i18n.language?.startsWith?.('uk') &&
              (
                branches && branches?.length > 0 ?
                `Вищі навчальні заклади за галузю: ${branches?.map?.(b => b?.name)?.join(', ')}` :
                `Вищі навчальні заклади`
              )
            }
          </H3>
          {/* <Button
            onClick={() => {}}
            outline
            style={{ marginLeft: 'auto', flex: '0 0 auto' }}
          >
            Фільтри
          </Button> */}
        </div>
        <br />
        <Tabs
          tabs={[t('stats-budget'), t('stats-contract')]}
          index={positionType === 'budget' ? 0 : 1}
          setIndex={i => setPositionType((['budget', 'contract'])[i] as 'budget' | 'contract')}
        />
        <br />
        <div>
          <Table>
            <TableHeaders />
            { universities.items.map((university, i) => 
              <UniversityComponent
                place={i + 1}
                branchId={branches?.map?.(b => b?.id)}
                positionType={positionType}
                key={i}
                expanded={expanded == university.id}
                setExpanded={(v) => setExpanded(v ? university.id : null)}
                university={university}
              />    
            ) }
            {
              universities.loading ? 
                <LoadingSpinner center-x />
                :
                (universities?.hasMore &&
                  <Button
                    className='more-button' outline
                    onClick={() => universities.dispatch()}
                  >
                    {t('stats-load-more')}
                  </Button>
                )
            }
          </Table>
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
  positionType,

  expanded, setExpanded,
  place,
  university
}: {
  branchId: number | number[],

  expanded: boolean,
  setExpanded: (e: boolean) => void,
  positionType?: PositionType,

  place: number,
  university: University
}) => {
  const { i18n, t } = useTranslation();

  const [tab, setTab] = React.useState(0); // 0 — факультеты, 1 — специальности

  return (
    <TableItem
      expanded={expanded}
      onExpandedChange={setExpanded}
      place={university?.place ?? place}

      shortName={university?.short_name}
      fullName={university?.full_name}
  
      num={university?.count}
      zno={university?.zno}
      znoColor='university'

      city={university?.city}
      website={university?.website}
  
      children={expanded => 
        <div className={cx('university-content', { expanded })}>
          <Tabs
            tabs={[t('stats-faculties'), t('stats-specialties')]}
            index={tab}
            setIndex={setTab}
          />
          <br />
          <br />
          { expanded &&
            ([
              <Faculties
                positionType={positionType}
                branchId={branchId}
                university={university}
                root={true}
              />,
              <Specialities 
                positionType={positionType}
                branchId={branchId}
                university={university}
                root={true}
              />
            ])[tab]
          }
        </div>
      }
    />
  );
}
const Faculties = ({
  branchId, university, root, speciality, positionType
}: {
  university: University,
  speciality?: Speciality,
  branchId: number | number[],
  positionType?: PositionType,
  root?: boolean
}) => {
  const { t } = useTranslation();
  const faculties = useLoadPagination(
    React.useCallback(
      (count, offset) => 
        getFaculties(branchId, university?.id, speciality?.id, count, offset, positionType, true)
          .then(faculties => 
            faculties.map((faculty, key) => 
              <FacultyComponent
                key={key}
                place={Number(offset) + Number(key) + 1}
                branchId={branchId}
                positionType={positionType}
                university={university}
                faculty={faculty}
                root={root}
              />  
            )  
          )
      ,
      [ branchId, university?.id, speciality?.id ]
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
          (faculties?.hasMore &&
            <Button
              className='more-button' outline
              onClick={() => faculties.dispatch()}
            >
              {t('stats-load-more')}
            </Button>
          )
      }
    </>
  )
}
const Specialities = ({
  branchId, university, root, faculty,
  positionType
}: {
  university: University,
  faculty?: Faculty,
  branchId: number | number[],
  positionType?: PositionType,
  root?: boolean
}) => {
  const { t } = useTranslation();
  const specialities = useLoadPagination(
    React.useCallback(
      (count, offset) => 
        getSpecialities(branchId, [], university?.id, faculty?.id, count, offset, undefined, positionType, true)
          .then(faculties => 
            faculties.map((speciality, key) => 
              <SpecialityComponent
                key={key}
                place={Number(offset) + Number(key) + 1}
                branchId={branchId}
                positionType={positionType}
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
          (specialities?.hasMore &&
            <Button
              className='more-button' outline
              onClick={() => specialities.dispatch()}
            >
              {t('stats-load-more')}
            </Button>
          )
      }
    </>
  )
}

const FacultyComponent = ({
  place,
  positionType,
  faculty, university, branchId, root = true
} : {
  place?: number,
  faculty: Faculty,
  university: University,
  positionType?: PositionType,
  branchId: number | number[],
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

      place={faculty?.place ?? place}
      
      fullName={faculty?.name}

      num={faculty?.count}
      zno={faculty?.zno}
      znoColor='faculty'

      children={root ? ((expanded) =>
        <div className={cx('university-content', { expanded })}>
          { expanded &&
            <Specialities
              university={university}
              branchId={branchId}
              positionType={positionType}
              faculty={faculty}
              root={false}
            />
          }
        </div>
      ) : undefined}
    />
  );
}
const SpecialityComponent = ({
  place,
  positionType,
  speciality, university, branchId, root = true
} : {
  place?: number,
  speciality: Speciality,
  university: University,
  branchId: number | number[],
  positionType?: PositionType,
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

      place={speciality?.place ?? place}

      fullName={speciality?.name}

      num={speciality?.count}
      zno={speciality?.zno}
      znoColor='speciality'

      children={root ? ((expanded) =>
        <div className={cx('university-content', { expanded })}>
          { expanded &&
            <Faculties
              university={university}
              branchId={branchId}
              positionType={positionType}
              speciality={speciality}
              root={false}
            />
          }
        </div>
      ) : undefined}
    />
  );
}


const Table = ({ children, shown = true }: { children: React.ReactNode, shown?: boolean }) => 
  <div className={cx("Table", { shown })}>{ children }</div>;

const TableHeaders = () => {
  const { t } = useTranslation();
  return (
    <div className='rating-tableheader'>
      <span className='expandbutton'>
        
      </span>
      <span className='column space'></span>
      <span className='place'>
        
      </span>
      <span className='name'>
        
      </span>
      <span className='num'>
        <P3>{t('stats-table-header-num')}</P3>
      </span>
      <span className='zno'>
        <span>
          <P3>{t('stats-table-header-zno')}</P3>
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
  );
}

const TableItem = ({
  expanded, onExpandedChange,

  place, shortName, fullName, num, zno, znoColor,
  city, sub,
  website,

  children
}: {
  expanded?: boolean,
  onExpandedChange?: (newExpanded: boolean) => void,

  place?: number,
  shortName?: string,
  fullName?: string,
  num?: number,
  zno?: number,
  znoColor: 'university' | 'speciality' | 'faculty',
  city?: string,
  sub?: boolean,
  website?: string,

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
            <span
              className='value'
              style={{
                width: zno / 200 * 100 + '%',
                backgroundColor: ({ 
                  university: '#FFC13D',
                  speciality: '#CFE5FF',
                  faculty: '#6DB5CA'
                })[znoColor]
              }}
            >
              <P1>{ (~~(zno * 10) / 10).toFixed(1) }</P1>
            </span>
          </span>
        }
      </span>
      { website &&
        <span className='column website'>
          <P1><Link to={website}>Сайт</Link></P1>
        </span>
      }
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