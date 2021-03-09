import React, { useState, useRef } from "react";
import classNames from "classnames";
import { OptionItem } from "../Options";
import LoadingSpiner from "../LoadingSpinner";
import "./index.scss";
import arrowImg from "./Vector.svg";

interface DropdownProp {
  dataItems: Item[];
  placeholderValue?: string;
  loading: boolean;
  // error: Error,
  // dispatch: Function
}

type Item = {
  id: number;
  name?: string;
  universitiesCount?: number | string;
  studentsCount?: number | string;
  code?: string;
  title?: string;
};

export default function DropDown(props: DropdownProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isScrollBottom = useRef(false);

  function dropdownListScroll(optionList: HTMLDivElement) {
    optionList.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } = optionList;
      if (scrollHeight - scrollTop === clientHeight) {
        isScrollBottom.current = true;
      }
    });
  }

  
  const { dataItems, placeholderValue, loading } = props;
  const dropdownItems = dataItems.map((item: Item) => {
    const { id, name, studentsCount, universitiesCount, code, title } = item;

    return (
      <OptionItem
        key={id}
        name={name}
        studentsCount={studentsCount}
        universitiesCount={universitiesCount}
        code={code}
        title={title}
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
        <span className={placeholderClass}>{placeholderValue}</span>
      </div>
      <div
        className={dropdownClass}
        ref={(element: HTMLDivElement) => {
          dropdownListScroll(element);
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
