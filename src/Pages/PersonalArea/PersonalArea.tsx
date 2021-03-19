import React from "react";
import Header from "../../Components/Header";
import UserPageInfo from "../../Components/UserPageInfo/UserPageInfo";
import './personalArea.scss'

function PersonalArea() {
    return (
        <>
            <Header/>
            <div className={`PersonalPage`}>
                <UserPageInfo
                    h1={`Особистий профіль`}
                    span={`Профіль активний`}
                    a={`Вимкнути`}
                    href={`#`}/>
            </div>

            <footer className={`Footer`}>
                <p>Видалити профіль?</p>
                <span>Ти можеш видалити свій обліковий запис StudSearch у будь-який момент.
                    Це призведе до видалення твого профілю та пов'язаної з ним інформації.</span>
                <a href={`#`}>Хочеш видалити обліковий запис?</a>
            </footer>
        </>
    )

}

export default PersonalArea;