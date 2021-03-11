import React, {useCallback, useRef, useState} from "react";
import tgPhoto from "./tgPhoto.svg"
import {DataSource, getRegions, getStudents, getUniversities} from "../../Helpers/api";
import useLoadPagination from "../LoadPagination/useLoadPagination";
import LoadingSpinner from "../LoadingSpinner";

export default function RegistrationForm() {
    const divStyle = {
        color: 'blue', height: '40px', textAlign: 'center', padding: '3px 10px', background: '#eee', marginTop: '15px'
    } as React.CSSProperties;
    const containerStyle = {
        maxWidth: '500px', maxHeight: '300px', margin: '0 auto', overflow: 'auto', border: '1px solid black'
    } as React.CSSProperties;
    const [query, setQuery] = useState('');

    const {loading, hasMore, error, items, dispatch
    } = useLoadPagination(
        React.useCallback((count, offset) => getUniversities(query, 1, count, offset), [1]),
        [query])

    const observer = useRef<IntersectionObserver>()
    const lastListElementRef = useCallback(node => {
        if (observer.current) {observer.current.disconnect()}
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting ) {dispatch()}})
        if (node) {observer.current.observe(node)}
    }, [loading])

    const showItems = () => {
        return (
            <React.Fragment>
                <div style= {containerStyle} >
                    {items.map((element: any, index)  => {
                        const {name} = element;
                        if (items.length === index + 1 && hasMore) {
                            return (
                                <div style= {divStyle} ref={lastListElementRef}
                                     key={index}>
                                    {name}
                                </div>
                            );}
                        else {
                            return <div style= {divStyle} key={index}>{name}</div>
                        }
                    })}
                    <div>{loading && <LoadingSpinner/>}</div>
                    <div>{error && 'Error'}</div>
                </div>
            </React.Fragment>
        );
    };

    return <div className={`SignForm`}>
        {/*{showItems()}*/}
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
            <input type="checkbox" name="tgPhoto"/>
            <label htmlFor="tgPhoto">Додати моє фото з Telegram
            </label>
        </div>

        <div className="Politic">
            <input type="checkbox" name="politic"/>
            <label htmlFor="politic">Погоджуюся з
                <a href={`#`}>Політикою конфіденційності</a>
            </label>
        </div>
        <p className={`useTelegram`}>Ми використовуем Telegram для зв’язку між абітурієнтом та студентом,
            тому просимо тебе підтвердити свій аккаунт через Telegram-бота</p>

        <div className="authTelegram">
            <img src={tgPhoto}/>
            <a href={`#`}><span>Підтвердити Telegram та зареєструватись</span></a>
        </div>
        <div className={`goBack`}>
            <a className="goBack-btn" href="/">Назад</a>
        </div>
    </div>
}