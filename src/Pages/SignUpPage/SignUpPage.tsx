import React from 'react';
import './signUpPage.scss';
import bg from "./sign-up-img.png";
import {Link} from "react-router-dom";
import logo from "./signLogo.svg";
import RegistrationForm from "../../Components/SignUpPage/RegistrationForm"

type PropsType = {
    line: string;
};

export default class SignUpPage extends React.Component {
    constructor(props: PropsType) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        return (
            <div className="SignUpPage">
                <div className="Registration" style={{backgroundImage: `url(${bg})`}}>
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