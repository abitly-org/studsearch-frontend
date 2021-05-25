import React from 'react';
import { Helmet } from 'react-helmet';
import './registration.scss';
import '../../Components/UserPageInfo/userPageinfo.scss'
import splitGirl from "./spliteGirl.png";
import {Link, useHistory} from "react-router-dom";
import logo from "../../Components/Header/logo.svg";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import UserPageInfo from "../../Components/UserPageInfo/UserPageInfo";
import {useTranslation} from "react-i18next";
import Header from "../../Components/Header";
import useTitle, { useDescription } from '../../Helpers/useTitle';

export const GoBack = ({ to }: { to?: string }) => {
    const { t } = useTranslation();
    const history = useHistory();

    return (
        <a className="GoBack-btn" onClick={() => {
            if (history?.length > 2)
                history?.goBack?.();
            else
                history?.push?.(to ?? '/');
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"></path><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path></svg>
            <span>{t('back')}</span>
        </a>
    );
}

export default function Registration(): JSX.Element {
    const { t } = useTranslation();
    
    useTitle(t('title') + ' — ' + t('title-register'));
    useDescription(t('description-register'));

    return (
        <div className="SignUpPage">
            {/* <Helmet>
                <title>StudSearch — Реєстрація</title>
                <meta name="title" content="StudSearch — Реєстрація" />
                <meta property="og:title" content="StudSearch — Реєстрація" />
                <meta name="twitter:title" content="StudSearch — Реєстрація" />
            </Helmet> */}
            <div className={`secondPhoto`} style={{backgroundImage: `url(${splitGirl})`}}/>
            <div className="Registration">
                <div className={`RegistrationContainer`}>
                    <div className={`GoBack`}>
                        <GoBack />
                    </div>
                    <Link className="SignUpLogo" to='/'>
                        <img src={logo} alt={`logo`}/>
                    </Link>
                    <UserPageInfo
                        h1={t('registration-header')}
                        span={t('registration-login-text')}
                        a={t('registration-login-link')}
                        href={`#`}
                    />
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}
