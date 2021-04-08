import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { SocialsData } from "../../../../../Helpers/api";
import "./index.scss";

export interface IInput {
  value?: string;
  editingHandler: Function;
  onChange: (newValue: string) => void;
  onSubmit: (newValue: SocialsData) => void;
  error?: boolean;
  title?: string;
  placeholder?: string;
}

export default function Input(props: IInput): JSX.Element {
  const {
    value,
    onChange,
    onSubmit,
    title,
    placeholder,
    editingHandler,
  } = props;
  const valueCheck = value ? value?.length === 0 : true;

  const [focus, setFocus] = useState(valueCheck);
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

  useEffect(() => {
    if (!focus && !emptyValue) {
      setDisabled(inputElement.current, true);
    }
  });

  return (
    <div className={"input-social-block"}>
      <input
        ref={inputElement}
        autoFocus={focus}
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
          if (valueCheck) {
            setEmptyValue(true);
          } else {
            title && onSubmit({ [title.toLowerCase()]: value });
          }
        }}
        onChange={(event) => {
          if (focus) onChange(event.target.value);
        }}
      />
      <span className={"title"}>{`імя користувача у ${title}`}</span>

      {value?.length !== 0 && !focus && (
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
              editingHandler();
              title && onSubmit({ [title.toLowerCase()]: "" });
              onChange("")
            }}
          />
        </div>
      )}
      {emptyValue && (
        <div className="icon-group">
          <div
            className="bin-icon"
            onClick={() => {
              editingHandler();
            }}
          />
        </div>
      )}

      {emptyValue && <span className={"text-error"}>{`Введіть ${title}`}</span>}
    </div>
  );
}
