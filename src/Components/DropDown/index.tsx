import React, { useState, useRef, useEffect, useCallback } from "react";
import cx from "classnames";

import OptionItem from "./Options";
import useLoadPagination from "../LoadPagination/useLoadPagination";
import LoadingSpinner from "../LoadingSpinner";

import "./index.scss";

import Input from "../Input";

interface DropdownProps<T> {
  placeholder?: string;
  value: T | undefined;
  inputError: boolean;
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

export default function DropDown<T extends Item>(props: DropdownProps<T>) {
  const { value, inputError, onChange, request, placeholder } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const dropdownDiv = useRef<HTMLDivElement>(null);
  const uniqueId = Math.round(Math.random() * 1000).toString();

  const { loading, error, hasMore, items, dispatch } = useLoadPagination(
    useCallback((count, offset) => request?.(count, offset, query), [
      request,
      query,
    ])
  );

  const itemsAvailable = !!items.length;

  useEffect(() => {
    window.addEventListener("click", onGlobalClick);
    return () => {
      window.removeEventListener("click", onGlobalClick);
    };
  });

  function onGlobalClick(e: MouseEvent) {
    if (!isOpen || e.target === null) return;
    let element = e.target;
    while (element !== null) {
      //@ts-ignore
      element = element.parentElement;
      //@ts-ignore
      if (element?.className === "dropdown" && element?.id === uniqueId) return;
      if (element === null) {
        setIsOpen(!isOpen);
      }
    }
  }

  function onScroll() {
    if (dropdownDiv.current) {
      const { scrollTop, scrollHeight, clientHeight } = dropdownDiv.current;
      if (scrollHeight  - scrollTop < clientHeight) {
        console.log("Hello here");
        dispatch();
      }
    }
  }

  const dropdownItems = items.map((item: T) => {
    return (
      <OptionItem
        key={item.id}
        {...item}
        onClickedItemValue={(title: string) => {
          onChange(item);
        }}
      />
    );
  });

  return (
    <div className="dropdown" id={uniqueId}>
      <div className="input-container">
        <Input
          value={isOpen ? query : value?.name ?? value?.title}
          placeholder={value?.name ?? value?.title}
          error={inputError}
          title={placeholder}
          enabled={itemsAvailable || isOpen}
          onFocusHandler={(focusStatus: boolean) => {
            setIsOpen(itemsAvailable && focusStatus);
          }}
          onChange={(changedVal: string) => {
            if (changedVal !== value?.name) setQuery(changedVal);
          }}
        />
        <div
          className={cx("arrow", {
            "arrow-rotate": isOpen,
            "arrow-hide": inputError,
          })}
          onClick={() => {
            setIsOpen(itemsAvailable && !isOpen);
          }}
        />
      </div>
      <div
        className={cx("option-list", {
          "list-active": isOpen,
          "list-inactive": !isOpen,
        })}
        ref={dropdownDiv}
        onScroll={onScroll}
      >
        {isOpen ? dropdownItems : null}
        {loading && <LoadingSpinner center-x />}
      </div>
    </div>
  );
}
