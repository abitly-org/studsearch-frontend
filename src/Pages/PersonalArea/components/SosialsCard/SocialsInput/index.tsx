import React, { useState, useRef } from "react";
import classNames from "classnames";
import "./index.scss";

export interface IInput {
  value?: string;
  onChange: (newValue: string) => void;
  error?: boolean;
  title?: string;
  placeholder?: string;
  onFocusHandler?: Function;
}

export default function Input(props: IInput): JSX.Element {
  const { value, onChange, error, title, placeholder } = props;
  const [focus, setFocus] = useState(true);
  const inputElement = useRef<HTMLInputElement>(null);
  const clearClicked = useRef(false);

  const inputClass = classNames("input", { active: focus });
  const inputBlockClass = classNames("input-social-block", { error });

  return (
    <div className={inputBlockClass}>
      <input
        ref={inputElement}
        autoFocus={true}
        className={inputClass}
        type="text"
        placeholder={placeholder}
        value={value ?? ""}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          if (clearClicked.current) {
            inputElement.current?.focus();
            clearClicked.current = false;
          } else {
            setTimeout(() => {
              setFocus(false);
            }, 200);
          }
        }}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      <div className={"error-icon"} />
      <span className={"title"}>{title}</span>
      {focus ? (
        <div
          className="clear-icon"
          onClick={() => {
            onChange("");
            clearClicked.current = true;
          }}
        />
      ) : (
        <div className="icon-group">
          <div
            className="pen-icon"
            onClick={() => {
              inputElement.current?.focus();
            }}
          />
          <div
            className="bin-icon"
            onClick={() => {
              inputElement.current?.focus();
              onChange("");
            }}
          />
        </div>
      )}

      <span className={"text-error"}>{`Введіть ${title}`}</span>
    </div>
  );
}
