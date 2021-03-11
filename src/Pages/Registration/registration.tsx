import React from 'react';
import './registration.scss';
import girl1 from "./PhotoWithGirl-1.png";
import girl2 from "./PhotoWithGirl-2.png";
import {Link} from "react-router-dom";
import logo from "./signLogo.svg";
import RegistrationForm from "../../Components/SignUpPage/RegistrationForm"

export default class Registration extends React.Component {

    render(): JSX.Element {
        return (
            <div className="SignUpPage">

                <div className="Registration" style={{backgroundImage: `url(${girl1})`}}>
                    <div className={`secondPhoto`} style={{backgroundImage: `url(${girl2})`}}/>
                    <div className={`RegistrationContainer`}>
                        <Link className="SignUpLogo" to='/'>
                            <img src={logo} alt={`logo`}/>
                        </Link>
                        <div className="SignUpText">
                            <h1>Реєстрація студента-волонтера</h1>
                            <div>
                                <span>Вже є обліковий запис?</span>
                                <a href={"#"}>Увійти</a>
                            </div>
                        </div>
                        <RegistrationForm/>
                    </div>
                </div>
            </div>
        );
    }
}