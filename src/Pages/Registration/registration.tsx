import React from 'react';
import './registration.scss';
import '../../Components/UserPageInfo/userPageinfo.scss'
import splitGirl from "./spliteGirl.png";
import {Link} from "react-router-dom";
import logo from "./signLogo.svg";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import UserPageInfo from "../../Components/UserPageInfo/UserPageInfo";
import {useTranslation} from "react-i18next";
import Header from "../../Components/Header";

export default function Registration(): JSX.Element {
    const { t } = useTranslation();

    return (
        <div className="SignUpPage">
             <div className={`secondPhoto`} style={{backgroundImage: `url(${splitGirl})`}}/>
            <div className="Registration">
                <div className={`RegistrationContainer`}>
                    <Link className="SignUpLogo" to='/'>
                        <img src={logo} alt={`logo`}/>
                    </Link>
                    <UserPageInfo
                        h1={t('registration-header')}
                        span={t('registration-login-text')}
                        a={t('registration-login-link')}
                        href={`#`}
                    />
                    <RegistrationForm/>
                    <div className={`GoBack`}>
                        <a className="GoBack-btn" href="/">{t('registration-back')}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
