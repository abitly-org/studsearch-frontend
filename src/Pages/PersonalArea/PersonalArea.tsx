import React from "react";
import Header from "../../Components/Header";
import UserPageInfo from "../../Components/UserPageInfo/UserPageInfo";
import PersonalAreaCardWrapper from "./components/PersonalAreaCardWrapper";
import EducationCardEditing from "./components/EducationCardEditing";
import EducationCardInfo from "./components/EducationCardInfo";
import "./personalArea.scss";
import personalIco from "./presonalImg.svg";
import universityImgSrc from "./universico.svg";
import socialsImgSRC from "./socials.svg"
import PersonalDataInfo from "./components/PersonalDataInfo/PersonalDataInfo";
import PersonalDataEditing from "./components/PersonalDataEditing/PersonalDataEdited";
import SocialsCard from "./components/SosialsCard";
import { Link } from "react-router-dom";

function PersonalArea() {
  
  return (
    <>
      <Header />
      <div className={`PersonalPage`}>
        <UserPageInfo
          h1={`Особистий профіль`}
          span={`Профіль активний`}
          a={`Вимкнути`}
          href={`#`}
        />
      </div>
      <PersonalAreaCardWrapper title="Особисті дані" imgSrc={personalIco}>
        {(editing) =>
          editing ? <PersonalDataEditing /> : <PersonalDataInfo />
        }
      </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper
        title="Контакти"
        imgSrc={socialsImgSRC}
        edited={false}
      >
        {() => <SocialsCard />}
      </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper title="Освіта" imgSrc={universityImgSrc}>
        {(editing) =>
          editing ? <EducationCardEditing /> : <EducationCardInfo />
        }
      </PersonalAreaCardWrapper>

      <footer className={`Footer`}>
        <p>Видалити профіль?</p>
        <span>
          Ти можеш видалити свій обліковий запис StudSearch у будь-який момент.
          Це призведе до видалення твого профілю та пов'язаної з ним інформації.
        </span>
      <Link to={`delete-page`}>Хочеш видалити обліковий запис?</Link>
      </footer>
    </>
  );
}

export default PersonalArea;
