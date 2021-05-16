import * as React from 'react';
import cx from 'classnames';
import { P1 } from '../Text';
import './index.scss';

const TabFilter = <T extends unknown>({
  className, style,

  tabs,
  renderItem = e => String(e),
  isSelected,
  onClick
}: {
  className?: string, style?: React.CSSProperties,

  tabs: T[],
  renderItem?: (item: T) => React.ReactNode,
  isSelected: (item: T) => boolean,
  onClick?: (value: boolean, item: T) => void
}) => (
  <div className={cx("TabFilter", className)} style={style}>
    { tabs?.map?.((tab, key) => 
      <span
        key={key}
        className={cx({ selected: isSelected?.(tab) })}
        onClick={() => onClick?.(isSelected?.(tab), tab)}
      >
        <P1>{renderItem?.(tab)}</P1>
      </span>
    ) }
  </div>
);
export default TabFilter;