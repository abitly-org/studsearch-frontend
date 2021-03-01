import React from "react";
import {DataSource, getRegions} from "../../Helpers/api";

export default function RegistrationForm() {
    // const {
    //     RegionDropdown
    //     UniversityDropdown
    //     FacultyDropdown
    //     SpecialityDropdown
    //     students
    // } = api;

    getRegions().then( res =>  console.log(res.regions));
    // getRegions().then((res) => res.regions.map(el => console.log(el.name)));

    return <div className={`SignForm`}>

        <div className={`SureNameForm`}>
            <input type={`text`} placeholder={`Ім’я`}/>
            <input type={`text`} placeholder={'Прізвище'}/>
        </div>

        <div className={`UniversityForm`}>
             <input type={`text`} list="university" placeholder={`Вищий навчальний заклад`}/>
            <datalist id="university">
                <option value="11"/>
            </datalist>
        </div>

        <div className={`Region`}>
            <input type={`text`} list="region" placeholder={`Регіон`}/>
            <datalist id="region">
                <option value="11"/>
            </datalist>
        </div>

        <div className={`Faculty`}>
            <input type={`text`} list="faculty" placeholder={`Факультет`}/>
            <datalist id="faculty">
                <option value="11"/>
            </datalist>
        </div>

        <div className={`SpecialityCourseForm`}>
            <div className={`Faculty`}>
                <input type={`text`} list="speciality" placeholder={`Спеціальність`}/>
                <datalist id="speciality">
                    <option value="11"/>
                </datalist>
            </div>

            <div className={`Course`}>
                <input type={`text`} list="course" placeholder={`Курс`}/>
                <datalist id="course">
                    <option value="11"/>
                </datalist>
            </div>
        </div>

        <div className="InputBox">
            <div className="Input">
                <textarea placeholder="Про себе"/>
            </div>
            <span>Це поле не є обов’язковим. Проте ми будемо вдячні
                якщо ти скажеш декілька слів про своє навчання та студентське життя.</span>
        </div>

        <div className="Politic">
            <input type="checkbox" name="politic"/>
            <label htmlFor="politic">Погоджуюся з
                <a href={`#`}>політика конфіденційності</a>
            </label>
            <p>Ми використовуем Telegram для зв’язку між абітурієнтом та студентом,
                тому просимо тебе пройти варіфікацію та підтвердити свій номер через Telegram..</p>
        </div>
        <div className="auth_buttons">
            <div className="auth_telegram">Telegram</div>
            <div className="auth_volunteer">Стати волонтером</div>
        </div>
        <a className="back-btn" href="/">Назад</a>
    </div>
}