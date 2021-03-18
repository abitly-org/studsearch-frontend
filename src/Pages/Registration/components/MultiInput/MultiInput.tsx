import React, {useEffect, useRef, useState} from "react";
import './multiInput.scss';
import cx from "classnames";

interface textArea {
    name: string;
    value: string;
    onChange: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
}

function MultiInput(props: textArea) {
    const [focus, setFocus] = useState(false);
    const {name, value, onChange} = props;

    function handleKeyDown(e: any) {
        e.target.style.height = 'inherit';
        e.target.style.height = Math.min(e.target.scrollHeight, 300) + "px";
    }

    return (
        <div className="Input">
            <span>Про себе</span>
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
                <p>Це поле не є обов’язковим. Проте ми будемо вдячні якщо ти скажеш декілька слів про своє навчання
                    та студентське життя.</p>
            </div>
        </div>
    )
}

export default MultiInput;