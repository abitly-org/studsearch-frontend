import React from "react";
import Header from "../../Components/Header";
import UserPageInfo from "../../Components/UserPageInfo/UserPageInfo";
import PersonalAreaCardWrapper from "./components/PersonalAreaCardWrapper";
import EducationCardEditing from "./components/EducationCardEditing";
import EducationCardInfo from "./components/EducationCardInfo";
import "./personalArea.scss";
import personalIco from "./presonalImg.svg";
import universityImgSrc from "./universico.svg";
import socialsImgSRC from "./socials.svg";
import PersonalDataInfo from "./components/PersonalDataInfo/PersonalDataInfo";
import PersonalDataEditing from "./components/PersonalDataEditing/PersonalDataEdited";
import SocialsCard from "./components/SosialsCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PersonalArea() {
  const { i18n, t } = useTranslation();

  return (
    <>
      <Header />
      <div className={`PersonalPage`}>
        <UserPageInfo
          h1={t("cabinet-main")}
          span={t("cabinet-profile")}
          a={t("cabinet-profile-active")}
          href={`#`}
        />
      </div>
      <PersonalAreaCardWrapper
        title={t("cabinet-personal-data")}
        imgSrc={personalIco}
      >
        {(editing) =>
          editing ? <PersonalDataEditing /> : <PersonalDataInfo />
        }
      </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper
        title={t("cabinet-contacts")}
        imgSrc={socialsImgSRC}
        edited={false}
      >
        {() => <SocialsCard telegramValue="Malyutina14"/>}
      </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper
        title={t("cabinet-education")}
        imgSrc={universityImgSrc}
      >
        {(editing) =>
          editing ? <EducationCardEditing /> : <EducationCardInfo />
        }
      </PersonalAreaCardWrapper>
      <footer className={`Footer`}>
        <p>{t("cabinet-delete-profile")}</p>
        <span>{t("cabinet-delete-text")}</span>
        <Link to={`delete-page`}>{t("cabinet-delete-link")}</Link>
      </footer>
    </>
  );
}

export default PersonalArea;
