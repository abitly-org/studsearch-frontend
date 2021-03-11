import React, { useState, useRef } from "react";
import classNames from "classnames";
import OptionItem from "./Options";
import LoadingSpiner from "../LoadingSpinner";
import useLoadPagination from "../LoadPagination/useLoadPagination";
import "./index.scss";
import arrowImg from "./Vector.svg";

interface DropdownProp<T> {
  placeholder?: string;
  value: T | undefined;
  onChange: (newValue: T) => void;
  request: (count: number, offset: number, query: string) => Promise<T[]>;
}

type Item = {
  id: number;
  name?: string;
  universitiesCount?: number;
  studentsCount?: number;
  code?: string;
  title?: string;
};

export default function DropDown<T extends Item>(props: DropdownProp<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isScrollBottom = useRef(false);

  const [elements, setElements] = useState([]);

  const { value, onChange, request, placeholder } = props;

  const {
    loading,
    error,
    hasMore,
    items,
    dispatch,
  } = useLoadPagination(request, [query]);

  function dropdownListScroll(optionList: HTMLDivElement) {
    if (optionList) {
      optionList.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = optionList;
        if (
          scrollHeight - scrollTop === clientHeight &&
          !isScrollBottom.current
        ) {
          isScrollBottom.current = true;
         
          console.log(isScrollBottom.current);
        } else {
          isScrollBottom.current = false;
        }
      });
    }
  }

  const dropdownItems = items.map((item: T) => {
    return (
      <OptionItem
        key={item.id}
        {...item}
        onClickedItemValue={(value: string) => {
          setQuery(value);
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

  return (
    <div className="dropdown">
      <div className="input-block">
        <input
          className="input"
          type="text"
          value={query}
          onFocus={() => {
            setIsOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsOpen(false);
            }, 300);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <img
          src={arrowImg}
          alt="arrow"
          className={arrowClass}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <span className={placeholderClass}>{placeholder}</span>
      </div>
      <div
        className={dropdownClass}
        onScroll={(e) => {
          // dropdownListScroll(e.target);
          console.dir(e.target);

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
