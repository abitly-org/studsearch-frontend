import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./index.scss";
import { useTranslation } from "react-i18next";
import RequiredAsterisk from "../RequiredAsterisk";

export interface IInput {
  value?: string;
  onChange: (newValue: string) => void;

  error?: boolean;
  placeholder?: string;
  title?: string;
  enabled?: boolean;
  onFocusHandler?: Function;
  required?: boolean;
}

export default function Input(props: IInput): JSX.Element {
  const {
    value,
    onChange,
    error,
    placeholder, 
    title,
    enabled = true,
    onFocusHandler,
    required
  } = props;
  const { t } = useTranslation();
  
  const [focus, setFocus] = useState(false);
  // const [query, setQuery] = useState<string | undefined>("");
   const [inputError, setInputError] = useState(error);

   useEffect(() => {
       setInputError(error);
     if (value?.length !== 0) {
       setInputError(false);
     }
   })

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
  const inputBlockClass = classNames("input-block", { inputError });

  return (
    <div className={inputBlockClass}>
      <input
          disabled={!enabled}
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
      <div className={"error-icon"} />
      <span className={"title"}>
        {title}
        {required && RequiredAsterisk}
      </span>
      <span className={"text-error"}>{t('error-required')}</span>
    </div>
  );
}
