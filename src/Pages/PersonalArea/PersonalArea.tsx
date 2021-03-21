import React from "react";
import Header from "../../Components/Header";
import UserPageInfo from "../../Components/UserPageInfo/UserPageInfo";
import PersonalAreaCardWrapper from "../../Components/PersonalAreaCardWrapper";
import EducationCardEdited from "./components/EducationCardEdited";
import EducationCardInfo from "./components/EducationCardInfo";
import "./personalArea.scss";
import personalIco from "./presonalImg.svg";
import universityImgSrc from "./universico.svg";
import PersonalDataInfo from "./components/PersonalDataInfo/PersonalDataInfo";
import PersonalDataEdited from "./components/PersonalDataEdited/PersonalDataEdited";

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
            <>
                 {/*<PersonalDataEdited />*/}
                <PersonalDataInfo />
            </>
        </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper title="Освіта" imgSrc={universityImgSrc}>
        <>
          {/* <EducationCardEdited /> */}
          <EducationCardInfo />
        </>
      </PersonalAreaCardWrapper>

      <footer className={`Footer`}>
        <p>Видалити профіль?</p>
        <span>
          Ти можеш видалити свій обліковий запис StudSearch у будь-який момент.
          Це призведе до видалення твого профілю та пов'язаної з ним інформації.
        </span>
        <a href={`#`}>Хочеш видалити обліковий запис?</a>
      </footer>
    </>
  );
}

export default PersonalArea;
