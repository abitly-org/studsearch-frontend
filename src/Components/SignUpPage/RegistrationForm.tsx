import React, {useState} from "react";
import tgPhoto from "./tgPhoto.svg"

export default function RegistrationForm() {

    const [tg, setTg] = useState(false);
    const [politic, setPolitic] = useState(false);
    const checkboxTg = ((event: React.ChangeEvent<HTMLInputElement>) => setTg(event.target.checked));
    const checkboxPolitic = ((event: React.ChangeEvent<HTMLInputElement>) => setPolitic(event.target.checked));

    return <div className={`SignForm`}>
        <div className={`FormBox`}>
        </div>
        <div className="InputBox">
            <div className="Input">
                <span>Про себе</span>
                <textarea placeholder=""/>
            </div>
            <div className={`InputBoxText`}>
                <p>Це поле не є обов’язковим. Проте ми будемо вдячні якщо ти скажеш декілька слів про своє навчання
                    та студентське життя.</p></div>
        </div>

        <div className="TgPhoto">
            <input type="checkbox" checked={tg} onChange={checkboxTg} name="tgPhoto"/>
            <label htmlFor="tgPhoto">Додати моє фото з Telegram
            </label>
        </div>

        <div className="Politic">
            <input type="checkbox" checked={politic} onChange={checkboxPolitic} name="politic"/>
            <label htmlFor="politic">Погоджуюся з
                <a href={`#`}>Політикою конфіденційності</a>
            </label>
        </div>
        <p className={`useTelegram`}>Ми використовуем Telegram для зв’язку між абітурієнтом та студентом,
            тому просимо тебе підтвердити свій аккаунт через Telegram-бота</p>

        <div className="authTelegram">

            <a href={`#`}><img src={tgPhoto} alt="tgPhoto"/><span>Підтвердити Telegram та зареєструватись</span></a>
        </div>
        <div className={`goBack`}>
            <a className="goBack-btn" href="/">Назад</a>
        </div>
    </div>
}