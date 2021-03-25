import React from "react";
import './checkBox.scss';
import cx from "classnames";

interface checkbox {
    label: string;
    value: string;
    checked: (boolean | undefined);
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    tag?: JSX.Element;
    disabled?: boolean;
}

function Checkbox(props: checkbox) {
    const {label, value, checked, onChange, tag, disabled} = props;
    return (
        <div className={`checkBox`}>
            <input className={cx('custom-checkbox', {
                "disabled": disabled
            })}
                   type="checkbox"
                   checked={checked}
                   onChange={onChange}
                   name={label}
                   id={label}
                   disabled={disabled == true}/>
            <label htmlFor={label}
                   className={cx({"disabled": disabled})}>
                {value}{tag}
            </label>
        </div>
    )
}

export default Checkbox;
