import React from 'react';
import './registration.scss';
import '../../Components/UserPageInfo/userPageinfo.scss'
import splitGirl from "./spliteGirl.png";
import {Link} from "react-router-dom";
import logo from "./signLogo.svg";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import UserPageInfo from "../../Components/UserPageInfo/UserPageInfo";

export default class Registration extends React.Component {

    render(): JSX.Element {
        return (
            <div className="SignUpPage"  >
                <div className={`secondPhoto`} style={{backgroundImage: `url(${splitGirl})`}}/>
                <div className="Registration"  >
                     <div className={`RegistrationContainer`}>
                        <Link className="SignUpLogo" to='/'>
                            <img src={logo} alt={`logo`}/>
                        </Link>
                         <UserPageInfo
                             h1={`Реєстрація студента-волонтера`}
                             span={`Вже є обліковий запис?`}
                             a={`Увійти`}
                             href={`#`}
                         />
                        <RegistrationForm/>
                        <div className={`goBack`}>
                            <a className="goBack-btn" href="/">Назад</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}