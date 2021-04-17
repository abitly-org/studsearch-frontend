import React, {useEffect, useRef, useState} from "react";
import './multiInput.scss';
import cx from "classnames";
import {useTranslation} from "react-i18next";

interface textArea {
    name: string;
    value: string;
    onChange: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
    field: boolean;
}

function MultiInput(props: textArea) {
    const [focus, setFocus] = useState(false);
    const {name, value, onChange, field} = props;

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
                  onChange={onChange}
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
            </div>
        </div>
    )
}

export default MultiInput;
