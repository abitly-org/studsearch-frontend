import React from "react";
import './checkBox.scss';
import cx from "classnames";

interface CheckboxProps {
    label?: string;
    value?: JSX.Element;
    checked: (boolean | undefined);
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    tag?: JSX.Element;
    disabled?: boolean;
    error?: boolean;
}

const Checkbox = ({
    label, value, checked, onChange, tag, disabled, error
}: CheckboxProps) => (
    <div className={cx(`checkBox`, { error })}>
        <input
            className={cx('custom-checkbox', { disabled })}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            name={label}
            id={label}
            disabled={disabled == true}
        />
        { label && 
            <label htmlFor={label}
                className={cx({"disabled": disabled})}>
                <div className={`checkBoxTitle`}>
                    <div>{value}</div>
                </div>
            </label>
        }
    </div>
);

export default Checkbox;
