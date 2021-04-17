import * as React from 'react';
import cx from 'classnames';
import { useClickAway } from 'react-use';

import useLoadPagination from '../LoadPagination/useLoadPagination';
import Checkbox from '../CheckBox/Checkbox';
import { P2, P4 } from '../Text';
import { ReactComponent as Arrow } from './Arrow.svg';
import { ReactComponent as Check } from '../CheckBox/check.svg';

import './index.scss';
import Chip, { Chips } from '../Chip';
import LoadingSpinner from '../LoadingSpinner';
import hierarchyContains from '../../Helpers/hierarchyContains';

export type Dropdown2State<T> = {
  className?: string;
  style?: React.CSSProperties;

  name: string;

  renderItem: (item: T) => React.ReactNode;

  loading?: boolean;

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
  equals = (a, b) => a === b,

  ...state
}: Dropdown2State<T>) => {

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
      [ searchQuery ]
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
  useClickAway(ref, e => setOpen(false));

  const input = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (open) 
      input?.current?.focus?.();
  }, [ open ]);

  return (
    <div
      ref={ref}
      className={cx('Dropdown2', className)}
      style={style}
      onFocus={() => setOpen(true)}
      // onBlur={() => setOpen(false)}
      onClick={() => setOpen(true)}
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
                  children={renderItem?.(v)}
                  onClose={() => setSelected(v, false)}
                />  
              )
            }</Chips>
        }
        { !state.multiple && state.value !== null && !open &&
          <P2 className="Value">{renderItem?.(state.value)}</P2>
        }
        <input
          ref={input}
          type='text'
          placeholder={
            !state.multiple && state.value !== null ?
              renderItem?.(state.value) as string
              :
              undefined
          }
          value={searchQuery}
          onFocus={() => setOpen(true)}
          // onBlur={() => setOpen(false)}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <span className='Arrow' children={<Arrow />} />
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
                <P4>{ renderItem?.(value) }</P4>
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