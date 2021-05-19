import * as React from 'react';
import cx from 'classnames';
import { useClickAway } from 'react-use';
import { useTranslation } from 'react-i18next';

import useLoadPagination from '../LoadPagination/useLoadPagination';
import Checkbox from '../CheckBox/Checkbox';
import { P2, P3, P4 } from '../Text';
import { ReactComponent as Arrow } from './Arrow.svg';
import { ReactComponent as Check } from '../CheckBox/check.svg';
import Chip, { Chips } from '../Chip';
import LoadingSpinner from '../LoadingSpinner';
import hierarchyContains from '../../Helpers/hierarchyContains';

import './index.scss';
import isMobile from '../../Helpers/isMobile';

const dropdowns = {} as {[id: string]: Function};
const useOtherClicked = (
  myOpen: boolean,
  onOtherOpened: () => void
) => {
  const id = React.useMemo(() => String(~~(Math.random()*999999)), []);

  React.useEffect(() => {
    dropdowns[id] = onOtherOpened;
  }, [ onOtherOpened ]);

  React.useEffect(() => {
    if (myOpen) {
      for (const oid in dropdowns)
        if (oid !== id)
          dropdowns?.[oid]?.();
    }
  }, [ myOpen ]);
}

export type Dropdown2State<T> = {
  className?: string;
  style?: React.CSSProperties;

  name: string;

  renderItem: (item: T, inDropdown: boolean) => React.ReactNode;

  loading?: boolean;
  withShadow?: boolean;
  singleBorder?: boolean;
  disabled?: boolean;
  error?: boolean;

  /**
   * Can put here a comparison by ids, f.ex
   */
  equals?: (a: T, b: T) => boolean;

} & ({
  multiple: true;
  value?: T[];
  onChange?: (newValue: T[]) => void;
} | {
  multiple: false;
  value: T | null;
  onChange?: (newValue: T | null) => void;
}) & ({
  values: T[];
  pagination?: never;
  pageCount?: never;
} | {
  values?: never;
  pagination: (count: number, offset: number, query: string) => Promise<T[]>;
  pageCount?: number;
});

const Dropdown2 = <T extends unknown>({
  className, style,

  name,
  renderItem,

  values,
  pagination,
  pageCount = 25,
  loading,
  withShadow,
  singleBorder,
  equals = (a, b) => a === b,
  disabled,
  error,

  ...state
}: Dropdown2State<T>) => {

  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  let dispatch : (() => void) | null = null;
  const P = useLoadPagination(
    React.useMemo(
      () => {
        if (!pagination)
          return undefined;
        return (count, offset) => pagination?.(count, offset, searchQuery);
      },
      [ pagination, searchQuery ]
    ),
    pageCount
  );
  if (pagination) {
    loading = loading || P.loading;
    values = P.items;
    dispatch = P.dispatch;
  }

  const hasValue = (
    state.multiple ?
      (state.value?.length ?? 0) > 0 :
      state.value !== null
  )
  const isSelected = (value: T) => {
    if (state.multiple) {
      return !!state.value?.find?.(v => equals?.(v, value));
    } else if (state.value !== null) {
      return equals?.(value, state.value)
    }
    return false;
  }
  const setSelected = (value: T, b: boolean) => {
    if (state.multiple) {
      if (b)
        state.onChange?.([...(state.value ?? []), value]);
      else 
        state.onChange?.((state.value ?? []).filter(v => !equals?.(v, value)));
    } else {
      if (b)
        state.onChange?.(value);
      else
        state.onChange?.(null);
    }
  }

  const ref = React.useRef<HTMLDivElement>(null);
  const touchstart = React.useRef<TouchEvent>();
  useClickAway(ref, e => {
    if (e.type === 'touchstart')  
      touchstart.current = e as any;
    else if (e.type === 'touchend') {
      if (Math.sqrt(
        Math.pow((touchstart.current?.touches?.[0]?.pageX ?? 0) - (e as TouchEvent)?.touches?.[0]?.pageX, 2) + 
        Math.pow((touchstart.current?.touches?.[0]?.pageY ?? 0) - (e as TouchEvent)?.touches?.[0]?.pageY, 2)
      ) < 10)
        setOpen(false);
    } else {
      setOpen(false);
    }
  }, [ 'mousedown', 'touchstart', 'touchend' ]);

  const input = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (open) 
      input?.current?.focus?.();
  }, [ open ]);


  React.useEffect(() => {
    if (error)
      ref?.current?.scrollIntoView?.();
  }, [ error ]);

  return (
    <div
      ref={ref}
      className={cx('Dropdown2', className, { disabled, withShadow, singleBorder, error })}
      style={style}
      // onFocus={e => {
      //   console.log('div.onFocus (open=', open, ')')
      //   if (!disabled) {
      //     setOpen(true);
      //     e?.stopPropagation?.();
      //   }
      // }}
      // onBlur={() => setOpen(false)}
      onClick={e => {
        if (!disabled) {
          setOpen(o => !o)
          e?.stopPropagation?.();
        }
      }}
    >
      <div
        className={cx('Value', { focused: open })}
      >
        <P2 className={cx('Name', { float: hasValue || !!searchQuery })}>
          {name}
        </P2>
        { state.multiple &&
            <Chips>{
              (state.value ?? []).map((v, key) => 
                <Chip
                  key={key}
                  children={renderItem?.(v, false)}
                  onClose={() => setSelected(v, false)}
                />  
              )
            }</Chips>
        }
        { !state.multiple && state.value !== null && (!open || !pagination) && (
          () => {
            const rendered = renderItem?.(state.value, false);
            if (typeof rendered === 'string')
              return <P2 className="Value">{rendered}</P2>;
            return rendered;
          }
        )()
        }
        { pagination && 
          <input
            ref={input}
            type='text'
            placeholder={
              !state.multiple && state.value !== null ?
                renderItem?.(state.value, false) as string
                :
                undefined
            }
            disabled={disabled}
            value={searchQuery}
            // onFocus={e => {
            //   console.log('input.onFocus (open=', open, ')')
            //   if (!disabled) {
            //     e?.stopPropagation?.();
            //     setOpen(true)
            //   }
            // }}
            // onBlur={() => setOpen(false)}
            onChange={e => setSearchQuery(e.target.value)}
          />
        }
        <span className='Arrow' children={<Arrow />} />
        { error &&
          <P3 className='Error' children={t('error-required')} />
        }
      </div>
      { open &&
        <div
          className='Menu'
          onScroll={e => {
            const div = e.target as HTMLDivElement;
            const atBottom = (div?.scrollTop ?? 0) + (div?.clientHeight ?? 0) >= (div?.scrollHeight ?? 0) - 10;
            if (atBottom)
              dispatch?.();
          }}
        >
          { values?.map?.((value, i) => {
            const selected = isSelected(value);
            return (
              <div
                key={i}
                className={cx('Value', { selected })}
                onClick={e => {
                  setSelected(value, !selected);
                  if (!state.multiple) {
                    input?.current?.blur?.();
                    ref?.current?.blur?.();
                    setOpen(false);
                    e?.stopPropagation?.();
                  }
                }}
              >
                { state.multiple && 
                  <span className={cx('CheckBox', { active: selected })}>
                    <Check />
                  </span>
                }
                {
                  (() => {
                    const rendered = renderItem?.(value, true);
                    if (typeof rendered === 'string')
                      return <P4 children={rendered} />;
                    return rendered;
                  })()
                }
              </div> 
            );
          }) }
          { loading &&
            <LoadingSpinner size={16} center-x />
          }
        </div>
      }
    </div>
  )
}

export default Dropdown2;