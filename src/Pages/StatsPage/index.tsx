import * as React from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import Button from '../../Components/Button';
import Dropdown2 from '../../Components/Dropdown2';
import Header from '../../Components/Header';
import { Column, Row } from '../../Components/Layout';
import { H1, H2, H3, P1 } from '../../Components/Text';

import { ReactComponent as Arrow } from '../../Components/Dropdown2/Arrow.svg';

import './index.scss';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const StatsPage = () => {
  const { t, i18n } = useTranslation();

  const [branch, setBranch] = React.useState<string | undefined>(undefined);
  const [specialities, setSpecialities] = React.useState<string[]>([]);
  const [regions, setRegions] = React.useState<string[]>([]);

  const [expanded, setExpanded] = React.useState<number | null>(null);

  return (
    <div className='StatsPage'>
      <Header />
      <div className='Content'>
        <H2>Рейтинг Університетів</H2>
        <br />
        <br />
        <br />
        <div className='row'>
          <Dropdown2
            className='DropdownShadow'
            style={{ flex: 1 }}
            name='Галузь'
            // values={['1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь','1 Галузь', '2 Галузь', '3 Галузь']}
            pagination={React.useCallback(
              async (count, offset) => {
                await wait(1000);
                return [...Array(count)].map((_, i) => `${i + offset} Галузь`);
              },
              []
            )}
            renderItem={v => v}
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
          <H3 style={{ marginRight: 16 }}>Вищі навчальні заклади за галузю: АБВГД fsad
            f dsalf;kjadsfkj dskl; fdajsk fjdasklf djakls fjkld
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
            <TableItem
              expanded={expanded == 1}
              onExpandedChange={(v) => v ? setExpanded(1) : setExpanded(null)}

              place={1}
              shortName='КПІ'
              fullName='Київський політехнічний інститут ім. Ігоря Сікорськогоf sdakl;f das k fjds fdaskl;f jdasklj fadklsjadklsjf dslajlfdkasjf das jkdsajfkldjsa lkdas fjads;f dklfajdskfdskl; fjadsl fjaklsj sfl;k'

              num={44}
              zno={189.2}

              children={expanded => 
                <Table shown={expanded}>
                  <TableItem />
                  <TableItem />
                  <TableItem />
                  <TableItem />
                </Table>
              }
            />
            <TableItem
              expanded={expanded == 2}
              onExpandedChange={(v) => v ? setExpanded(2) : setExpanded(null)}

              place={2}
              shortName='КПІ'
              fullName='Київський політехнічний інститут ім. Ігоря Сікорського'

              num={743}
              zno={175.5}

              children={expanded => 
                <Table shown={expanded}>
                  <TableItem />
                  <TableItem />
                  <TableItem />
                  <TableItem />
                </Table>
              }
            />
            <TableItem
              expanded={expanded == 3}
              onExpandedChange={(v) => v ? setExpanded(3) : setExpanded(null)}
              place={3}
              shortName='КПІ'
              fullName='Київський політехнічний інститут ім. Ігоря Сікорського'

              num={3721}
              zno={174.0}

              children={expanded => 
                <Table shown={expanded}>
                  <TableItem />
                  <TableItem />
                  <TableItem />
                  <TableItem />
                </Table>
              }
            />
          </Table>
        </div>
      </div>
    </div>
  )
}

const Table = ({ children, shown = true }: { children: React.ReactNode, shown?: boolean }) => 
  <div className={cx("Table", { shown })}>{ children }</div>;

const TableHeaders = () =>
  <div className='rating-tableheader'>
    <span className=''>
      
    </span>
    <span>
      
    </span>
  </div>

const TableItem = ({
  expanded, onExpandedChange,

  place, shortName, fullName, num, zno,

  children
}: {
  expanded?: boolean,
  onExpandedChange?: (newExpanded: boolean) => void,

  place?: number,
  shortName?: string,
  fullName?: string,
  num?: number,
  zno?: number,

  children?: (expanded?: boolean) => JSX.Element
}) => (
  <div
    className={cx('rating-tableitem', { expanded })}
  >
    <div
      className={cx('Value', { expanded })}
      onClick={() => onExpandedChange?.(!expanded)}
    >
      { onExpandedChange &&
        <span
          className='ExpandButton'
          onClick={() => onExpandedChange?.(!expanded)}
        >
          <Arrow />
        </span>
      }
      { place !== undefined &&
        <span className='column place'>
          <P1>{place}.</P1>
        </span>
      }
      { !!(shortName ?? fullName) &&
        <span className='column name'>
          <P1>
            <span className='short'>{shortName}</span>
            <span className='full'>{fullName}</span>
          </P1>
        </span>
      }
      { num !== undefined &&
        <span className='column num'>
          <P1>{num}</P1>
        </span>
      }
      { zno !== undefined &&
        <span className='column zno'>
          <span className='bar'>
            <span className='value' style={{ width: zno / 200 * 100 + '%'}}>
              <P1>{ (~~(zno * 10) / 10).toFixed(1) }</P1>
            </span>
          </span>
        </span>
      }
    </div>
    <div className='Content'>
      { children?.(expanded) }
    </div>
  </div>
);

export default StatsPage;