import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import OptionItem from "./Options";
import LoadingSpiner from "../LoadingSpinner";
import useLoadPagination from "../LoadPagination/useLoadPagination";
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
  const [inputValue, setInputValue] = useState<string | undefined>();

  const scrollItem = useRef<HTMLDivElement>(null);
  const scrollEnd = useRef(false);

  const {
    loading,
    error,
    hasMore,
    items,
    dispatch,
  } = useLoadPagination(request, [query]);

  useEffect(() => {
    console.log("rend: ", placeholder);
    if (!loading) {
      scrollEnd.current = false;
    }
    return () => {
      // setInputValue(
      //   value?.code
      //     ? `${value?.code} ${value?.name}`
      //     : value?.title
      //     ? value?.title
      //     : value?.name
      // );
    };
  }, [isOpen,loading, placeholder]);

  function dropdownListScroll(optionList: HTMLDivElement | null) {
    if (optionList) {
      optionList.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = optionList;
        if (scrollHeight - scrollTop === clientHeight && !scrollEnd.current) {
          scrollEnd.current = true;
          dispatch();
        }
      });
    }
  }

  const dropdownItems = items.map((item: T) => {
    return (
      <OptionItem
        key={item.id}
        {...item}
        onClickedItemValue={(title:string) => {
          onChange(item);
          setInputValue(
            title
          );
        }}
      />
    );
  });

  const dropdownClass = classNames("option-list", {
    "list-active": isOpen,
    "list-inactive": !isOpen,
  });

  const arrowClass = classNames("arrow", { "arrow-rotate": isOpen });

  const placeholderClass = classNames("placeholder", {
    "placeholder-focus": isOpen,
  });

  const inputClass = classNames("input", { active: isOpen });

  return (
    <div className="dropdown">
      <div className="input-block">
        <input
          className={inputClass}
          type="text"
          value={inputValue}
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
          className={arrowClass}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <span className={placeholderClass}>{placeholder}</span>
      </div>
      <div
        className={dropdownClass}
        ref={scrollItem}
        onScroll={() => {
          dropdownListScroll(scrollItem.current);
        }}
      >
        {!loading ? (
          dropdownItems
        ) : (
          <div className="loading">
            <LoadingSpiner />
          </div>
        )}
      </div>
    </div>
  );
}
