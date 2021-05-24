import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import Item from "../../Item";
import "./index.scss";
import {useTranslation} from "react-i18next";
import { useEvent } from "react-use";

export interface IInput {
  starter?: string;
  value?: string;
  editingHandler: Function;
  onChange?: (newValue: string) => void;
  error?: boolean;
  title?: string;
  name?: string;
  placeholder?: string;
  onFocusHandler?: Function;
  onSave?: () => void;
  onRemove?: () => void;
}

const useOnEnter = (callback: () => void) => {
  useEvent('keypress', (e: Event) => {
    if ((e as KeyboardEvent).key === 'Enter')
      callback?.();
  }, window)
} 

export default function Input(props: IInput): JSX.Element {

  const { t, i18n } = useTranslation();
  const { value, onChange, onRemove, name, title, placeholder, editingHandler, onSave } = props;
  const starterString = props?.starter;
  const [focus, setFocus] = useState(!value || value.length === 0);
  const [emptyValue, setEmptyValue] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  // function setDisabled(disabled: boolean) {
  //   if (inputElement.current)
  //     inputElement.current.disabled = disabled;
  // }

  // useEffect(() => {
  //   if (!focus && !emptyValue) {
  //     setDisabled(inputElement.current, true)
  //   }
  // });

  const [starterWidth, setStarterWidth] = React.useState(0);
  const starter = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (starter?.current) {
      const width = starter?.current?.clientWidth;
      if (width !== starterWidth)
        setStarterWidth(width);
    }
  });

  useOnEnter?.(() => {
    if (focus) {
      if (!value || value?.length === 0) {
        setEmptyValue(true);
      } else {
        onSave?.();
      }
      inputElement?.current?.blur?.();
    }
  });

  return (
    <div className={"input-social-block"}>
      <input
        ref={inputElement}
        autoFocus={focus}
        className={cx('input', { active: focus, error: emptyValue })}
        type="text"
        style={{ paddingLeft: starterWidth }}
        placeholder={placeholder}
        value={value ?? ""}
        disabled={!focus && !emptyValue}
        onFocus={() => {
          setEmptyValue(false);
          // if (!value || value?.length === 0) {
            setFocus(true);
          // }
        }}
        onBlur={() => {
          setFocus(false);
          if (!value || value?.length === 0) {
            setEmptyValue(true);
          } else {
            onSave?.();
          }
        }}
        onChange={(event) => {
          if (focus) {
            let value = event.target.value;
            const regexp = ({
              telegram: /^(@|https?\:\/\/(?:www\.?)?t(?:elegram\.com|\.me)\/?)/g,
              instagram: /^(@|https?\:\/\/(?:www\.?)instagram\.com\/?)/g,
              linkedin: /^(https?\:\/\/(?:www\.?)linkedin\.com\/?(?:in\/?)?)/g,
              facebook: /^(https?\:\/\/(?:www\.?)facebook\.com\/?)/g
            } as any)[name ?? ''] as RegExp;
            if (regexp)
              value = value.replace(regexp, '');
            onChange?.(value);
          }
        }}
      />
      <span ref={starter} className='starter'>{starterString}</span>
      <span className={"title"}>{title}</span>

      {value?.length !== 0 && !focus && (
        <div className="icon-group">
          <div
            className="pen-icon"
            onClick={() => {
              // setFocus(true);
              if (inputElement.current)
                inputElement.current.disabled = false;
              inputElement?.current?.focus?.();
            }}
          />
          <div
            className="bin-icon"
            onClick={onRemove}
          />
        </div>
      )}
      {emptyValue && (
        <div className="icon-group">
          <div
            className="bin-icon"
            onClick={onRemove}
          />
        </div>
      )}

      {emptyValue && <span className={"text-error"}>{`${t('cabinet-social-user-name-write')} ${title}`}</span>}
    </div>
  );
}
