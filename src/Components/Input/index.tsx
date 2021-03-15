import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./index.scss";

export interface IInput {
  value: string | undefined;
  error: boolean;
  placeholder: string | undefined;
  active: boolean;
  onChangeHandler: Function;
  onFocusHandler: Function;
}

export default function Input(props: IInput): JSX.Element {
  const {
    value,
    error,
    placeholder,
    active,
    onFocusHandler,
    onChangeHandler,
  } = props;
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState<string | undefined>("");
  const [inputError, setInputError] = useState(error);

  useEffect(() => {
    setInputError(error);
    onFocusHandler(focus);
    onChangeHandler(query);
  }, [error, focus, query]);

  useEffect(() => {
    setQuery(value ? value : "");
  }, [value]);

  useEffect(() => {
    setFocus(active);
  },[active])

  const inputClass = classNames("input", {
    active: focus,
   
  });
  const inputBlockClass = classNames("input-block", {
    error: inputError
  })
 

  return (
    <div className={inputBlockClass}>
      <input
        className={inputClass}
        type="text"
        value={query}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false);
          }, 200);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <div className={"error-icon"}></div>
      <span className={"placeholder"}>{placeholder}</span>
      <span className={"text-error"}>{`Введіть ${placeholder}`}</span>
    </div>
  );
}
