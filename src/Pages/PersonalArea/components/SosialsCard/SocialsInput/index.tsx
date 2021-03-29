import React, { useState, useRef } from "react";
import classNames from "classnames";
import "./index.scss";

export interface IInput {
  value?: string;
  editingHandler: Function;
  onChange: (newValue: string) => void;
  error?: boolean;
  title?: string;
  placeholder?: string;
  onFocusHandler?: Function;
}

export default function Input(props: IInput): JSX.Element {
  const { value, onChange, title, placeholder, editingHandler } = props;
  const [focus, setFocus] = useState(true);
  const [emptyValue, setEmptyValue] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  const inputClass = classNames("input", {
    active: focus,
     error: emptyValue,
  });

  
  function setDisabled(input: HTMLInputElement | null, disabled: boolean) {
    if (input) {
      input.disabled = disabled;
    }
  }

  return (
    <div className={"input-social-block"}>
      <input
        ref={inputElement}
        autoFocus={true}
        className={inputClass}
        type="text"
        placeholder={placeholder}
        value={value ?? ""}
        onFocus={() => {
          setEmptyValue(false);
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
          setDisabled(inputElement.current, true);
          if (value?.length === 0) {
            setEmptyValue(true);
          }
        }}
        onChange={(event) => {
          if (focus) {
            onChange(event.target.value);
           
          }
        }}
      />
      <div className={"error-icon"} />
      <span className={"title"}>{title}</span>

      {!focus && (
        <div className="icon-group">
          <div
            className="pen-icon"
            onClick={() => {
              setDisabled(inputElement.current, false);
              inputElement.current?.focus();
            }}
          />
          <div
            className="bin-icon"
            onClick={() => {
              editingHandler()
            }}
          />
        </div>
      )}
      {emptyValue&&<span className={"text-error"}>{`Введіть ${title}`}</span>}
    </div>
  );
}
