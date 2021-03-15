import React from "react";

interface textArea {
    name: string;
    value: string;
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

function MultiInput(props: textArea) {
    const {name, value, onChange} = props;

    return (
        <div className="Input">
            <span>Про себе</span>
            <input type={`textarea`}
                   name={name}
                   value={value}
                   onChange={onChange}/>
            <div className={`InputBoxText`}>
                <p>Це поле не є обов’язковим. Проте ми будемо вдячні якщо ти скажеш декілька слів про своє навчання
                    та студентське життя.</p>
            </div>
        </div>
    )
}
export default MultiInput;