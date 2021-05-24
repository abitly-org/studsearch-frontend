import React, {useEffect, useRef, useState} from "react";
import './multiInput.scss';
import cx from "classnames";
import {useTranslation} from "react-i18next";

interface textArea {
    name?: string;
    value: string;
    onChange?: ((str: string) => void);
    field?: boolean;

    max?: number;
}

function MultiInput({name, value, onChange, field, max}: textArea) {
    const [focus, setFocus] = useState(false);
    function handleKeyDown(e: any) {
        e.target.style.height = 'inherit';
        e.target.style.height = Math.min(e.target.scrollHeight, 300) + "px";
    }
    const { t } = useTranslation();

    return (
        <div className="Input">
            <span>{t('registration-about')}</span>
            <div className={`areaBlock`}>
              <textarea
                  rows={1}
                  onInput={handleKeyDown}
                  name={name}
                  value={value}
                  onChange={e => {
                    let value = e?.target?.value;
                    if (max)
                        value = value.substring(0, max);
                    onChange?.(value);
                  }}
                  onMouseEnter={() => {
                      setFocus(!focus)
                  }}
                  onMouseLeave={() => {
                      setFocus(!focus)
                  }}
              />
                <div
                    className={cx("svg", {
                        "Focus": focus,
                        "nonFocus": !focus,
                    })}
                />
            </div>
            <div className={`InputBoxText`}>
                {field? <p>{t('registration-about-helper-text')}</p>: null}
                { max &&
                    <span className={cx('count', { max: value?.length >= max })}>
                        {value?.length}{' / '}{max}
                    </span>
                }
            </div>
        </div>
    )
}

export default MultiInput;
