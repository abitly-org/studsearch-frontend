import React, {useState} from "react";
import tgPhoto from "./tgPhoto.svg"
import Checkbox from "./Checkbox";
import MultiInput from "./MultiInput";
import RadioBtnGender from "./RadioBtnGender";
import FirstLastName from "./FirstLastName";

export default function RegistrationForm() {

    const [state, setState] = React.useState({
        tg: false,
        politic: false
    })
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.checked;
        setState({
            ...state,
            [event.target.name]: value
        });
        console.log(event.target.name + ' -> ' + event.target.checked)
    }

    const [aboutMyself, setAboutMyself] = useState('');
    function handleChangeAbout(event: React.ChangeEvent<HTMLInputElement>) {
        setAboutMyself(event.target.value)
        console.log(event.target.value)
    }

    return <div className={`SignForm`}>
        <div className={`FormBox`}/>
        <FirstLastName />
        <RadioBtnGender />
        <MultiInput name={`textValue`} value={aboutMyself} onChange={handleChangeAbout}/>

        <div className="checkBoxBlock">
            <Checkbox label="tg" value={`Додати моє фото з Telegram`} checked={state.tg} onChange={handleChange}/>
            <Checkbox label="politic" value={`Погоджуюся з`} tag={<a href={`#`}>Політикою конфіденційності</a>}
                      checked={state.politic} onChange={handleChange}/>
        </div>

        <p className={`useTelegram`}>Ми використовуем Telegram для зв’язку між абітурієнтом та студентом,
            тому просимо тебе підтвердити свій аккаунт через Telegram-бота</p>
        <div className="authTelegram">
            <a href={`#`}>
                <img src={tgPhoto} alt="tgPhoto"/>
                <span>Підтвердити Telegram та зареєструватись</span>
            </a>
        </div>
    </div>
}