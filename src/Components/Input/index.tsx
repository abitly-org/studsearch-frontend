import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./index.scss";

export interface IInput {
  value?: string;
  onChange: (newValue: string) => void;

  error?: boolean;
  placeholder?: string;
  title?: string;
  enabled?: boolean;
  onFocusHandler?: Function;
}

export default function Input(props: IInput): JSX.Element {
  const {
    value,
    onChange,
    error,
    placeholder, 
    title,
    enabled = true,
    onFocusHandler
  } = props;

  const [focus, setFocus] = useState(false);
  // const [query, setQuery] = useState<string | undefined>("");
  // const [inputError, setInputError] = useState(error);

  useEffect(() => {
    // setInputError(error);
    onFocusHandler?.(focus);
    // onChange(query);
  }, [ focus ]);

  // useEffect(() => {
  //   setFocus(active ? active : false);
  // }, [active]);

  const inputClass = classNames("input", {
    active: enabled && focus,
    disabled: !enabled
  });
  const inputBlockClass = classNames("input-block", { error });

  return (
    <div className={inputBlockClass}>
      <input
        className={inputClass}
        type="text"
        placeholder={placeholder}
        value={value ?? ""}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false);
          }, 200);
        }}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      <div className={"error-icon"}></div>
      <span className={"title"}>{title}</span>
      <span className={"text-error"}>{`Введіть ${title}`}</span>
    </div>
  );
}
