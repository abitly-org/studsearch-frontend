import React from "react";

interface IRadioBtnGender {
    selectOption: string
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

function RadioBtnGender(props: IRadioBtnGender) {
    const {selectOption, onChange} = props;
    return (
        <div className={`RadioBlock`}>
            <div className="radio">
                <label htmlFor={`man`}>
                    <input type="radio" id={`man`} value={`man`} checked={selectOption === 'man'}
                           onChange={onChange}/>
                    <div className={`designOval`}/>
                    <span>Чоловік</span>
                </label>
            </div>
            <div className="radio">
                <label htmlFor={`girl`}>
                    <input type="radio" id={`girl`} value={`girl`} checked={selectOption === 'girl'}
                           onChange={onChange}/>
                    <div className={`designOval`}/>
                    <span>Жінка</span>
                </label>
            </div>
        </div>
    )
}

export default RadioBtnGender;