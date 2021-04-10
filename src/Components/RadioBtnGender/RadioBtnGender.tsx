import React from "react";
import './radioBtnGender.scss';
import {useTranslation} from "react-i18next";

interface IRadioBtnGender {
    gender: string
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

function RadioBtnGender(props: IRadioBtnGender) {
    const { t, i18n } = useTranslation();
    const {gender, onChange} = props;
    return (
        <div className={`RadioBlock`}>
            <div className="radio">
                <label htmlFor={`male`}>
                    <input type="radio" id={`male`} value={`male`} checked={gender === 'male'}
                           onChange={onChange}/>
                    <div className={`designOval`}/>
                    <span>{t('registration-sex-male')}</span>
                </label>
            </div>
            <div className="radio">
                <label htmlFor={`female`}>
                    <input type="radio" id={`female`} value={`female`} checked={gender === 'female'}
                           onChange={onChange}/>
                    <div className={`designOval`}/>
                    <span>{t('registration-sex-female')}</span>
                </label>
            </div>
        </div>
    )
}

export default RadioBtnGender;
