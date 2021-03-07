import React from "react";
import {DataSource, getRegions, getStudents} from "../../Helpers/api";
import useLoadPagination from "../LoadPagination/useLoadPagination";

export default function RegistrationForm() {
    const divStyle = {
        color: 'blue',
        height: '40px',
        textAlign: 'center',
        padding: '3px 10px',
        background: '#eee',
        marginTop: '15px'
    };
    const containerStyle = {
        maxWidth: '500px',
        maxHeight: '300px',
        margin: '0 auto',
        overflow: 'auto',
        border: '1px solid black'
    }

    const {
        loading, error, items, dispatch
    } = useLoadPagination((count, offset) => getStudents(count, offset), []);

    const showItems = () => {
        return (// @ts-ignore
            <React.Fragment>
                <div style= {containerStyle}>
                    {items.map((element: any, index)  => {
                        const {name} = element;
                        if (items.length === index + 1) {
                            return (// @ts-ignore
                                <div style= {divStyle}
                                     key={index}>
                                    {name}
                                </div>
                            );}
                        else {
                            // @ts-ignore
                            return <div   style= {divStyle} key={index}>{name}</div>
                        }
                    })}
                    <div>{loading && 'Loading...'}</div>
                    <div>{error && 'Error'}</div>
                </div>
            </React.Fragment>
        );
    };


    return <div className={`SignForm`}>
        {showItems()}

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