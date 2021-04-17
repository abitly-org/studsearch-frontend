import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import Item from "../../Item";
import "./index.scss";
import {useTranslation} from "react-i18next";

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

  const { t, i18n } = useTranslation();
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

  useEffect(() => {
    if (!focus && !emptyValue) {
      setDisabled(inputElement.current, true)
    }
  })

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
          if (value?.length === 0) {
            setEmptyValue(true);
          }
        }}
        onChange={(event) => {
          if (focus) onChange(event.target.value);
        }}
      />
      <span className={"title"}>{title}</span>

      {value?.length !== 0 && !focus && (
        <div className="icon-group">
          <div
            className="pen-icon"
            onClick={() => {
              setDisabled(inputElement.current, false)
              inputElement.current?.focus();
            }}
          />
          <div
            className="bin-icon"
            onClick={() => {
              editingHandler();
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

      {emptyValue && <span className={"text-error"}>{`${t('cabinet-social-user-name-write')} ${title}`}</span>}
    </div>
  );
}
