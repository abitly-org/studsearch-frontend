import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";

import OptionItem from "./Options";
import useLoadPagination from "../LoadPagination/useLoadPagination";
import LoadingSpinner from "../LoadingSpinner";

import "./index.scss";

interface DropdownProp<T> {
  placeholder?: string;
  value: T | undefined;
  onChange: (newValue: T) => void;
  request: (count: number, offset: number, query: string) => Promise<T[]>;
}

type Item = {
  id: number;
  name?: string;
  universitiesCount?: number | string;
  studentsCount?: number | string;
  code?: string;
  title?: string;
};

export default function DropDown<T extends Item>(props: DropdownProp<T>) {
  const { value, onChange, request, placeholder } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  const dropdownDiv = useRef<HTMLDivElement>(null);

  const {
    loading,
    error,
    hasMore,
    items,
    dispatch,
  } = useLoadPagination(
    (count, offset) => request?.(count, offset, query),
    [query]
  );

  function onScroll() {
    if (dropdownDiv.current) {
      const { scrollTop, scrollHeight, clientHeight } = dropdownDiv.current;
      if (scrollHeight - scrollTop === clientHeight) {
        dispatch();
      }
    }
  }

  const dropdownItems = items.map((item: T) => {
    return (
      <OptionItem
        key={item.id}
        {...item}
        onClickedItemValue={(title:string) => {
          onChange(item);
        }}
      />
    );
  });
  
  return (
    <div className="dropdown">
      <div className="input-block">
        <input
          className={cx("input", { active: isOpen })}
          type="text"
          placeholder={value?.name}
          value={isOpen ? query : value?.name}
          onFocus={() => {
            setIsOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsOpen(false);
            }, 200);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <div
          className={cx("arrow", { "arrow-rotate": isOpen })}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <span
          className={cx("placeholder", { "placeholder-focus": isOpen })}
        >
          {placeholder}
        </span>
      </div>
      <div
        className={cx("option-list", {
          "list-active": isOpen,
          "list-inactive": !isOpen,
        })}
        ref={dropdownDiv}
        onScroll={onScroll}
      >
        { dropdownItems }
        { loading &&
          <LoadingSpinner center-x />
        }
      </div>
    </div>
  );
}
