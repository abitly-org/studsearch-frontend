import React from "react";
import './radioBtnGender.scss';

interface IRadioBtnGender {
    gender: string
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

function RadioBtnGender(props: IRadioBtnGender) {
    const {gender, onChange} = props;
    return (
        <div className={`RadioBlock`}>
            <div className="radio">
                <label htmlFor={`man`}>
                    <input type="radio" id={`man`} value={`man`} checked={gender === 'man'}
                           onChange={onChange}/>
                    <div className={`designOval`}/>
                    <span>Чоловік</span>
                </label>
            </div>
            <div className="radio">
                <label htmlFor={`girl`}>
                    <input type="radio" id={`girl`} value={`girl`} checked={gender === 'girl'}
                           onChange={onChange}/>
                    <div className={`designOval`}/>
                    <span>Жінка</span>
                </label>
            </div>
        </div>
    )
}

export default RadioBtnGender;