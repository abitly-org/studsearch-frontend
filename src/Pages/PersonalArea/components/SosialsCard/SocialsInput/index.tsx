import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./index.scss";

export interface IInput {
  value?: string;
  onChange: (newValue: string) => void;
  error?: boolean;
  title?: string;
  onFocusHandler?: Function;
}

export default function Input(props: IInput): JSX.Element {
  const { value, onChange, error, title, onFocusHandler } = props;

  const [focus, setFocus] = useState(false);

  useEffect(() => {
    onFocusHandler?.(focus);
  }, [focus]);

  const inputClass = classNames("input", {
    active: focus,
  });
  const inputBlockClass = classNames("input-block", { error });

  return (
    <div className={inputBlockClass}>
      <input
        className={inputClass}
        type="text"
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
      <span className={"title"}>{title}</span>
      {focus ? <div className="clear-icon" onClick={()=>{onChange("")}} /> : null}

      <span className={"text-error"}>{`Введіть ${title}`}</span>
    </div>
  );
}
