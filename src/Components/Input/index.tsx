import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./index.scss";

export interface IInput {
  value: string;
  error: boolean;
  placeholder: string | undefined;
  onChangeHandler: Function;
  onFocusHandler: Function;
}

export default function Input(props: IInput): JSX.Element {
  const { value, error, placeholder, onFocusHandler, onChangeHandler } = props;
  const [focus, setIsFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    console.log("input render");
    setInputError(error);
    onFocusHandler(focus);
    onChangeHandler(query);
  }, [error, focus, query]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const inputClass = classNames("input", { active: focus });

  return (
    <div className="input-block">
      <input
        className={inputClass}
        type="text"
        value={query}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsFocus(false);
          }, 200);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <span className={"placeholder"}>{placeholder}</span>
    </div>
  );
}
