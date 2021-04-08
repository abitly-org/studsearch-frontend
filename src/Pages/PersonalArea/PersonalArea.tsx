import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import UserPageInfo from "../../Components/UserPageInfo/UserPageInfo";
import PersonalAreaCardWrapper from "./components/PersonalAreaCardWrapper";
import EducationCardEditing from "./components/EducationCardEditing";
import EducationCardInfo from "./components/EducationCardInfo";
import "./personalArea.scss";
import personalIco from "./personImg.svg";
import universityImgSrc from "./universico.svg";
import socialsImgSRC from "./socials.svg";
import PersonalDataInfo from "./components/PersonalDataInfo/PersonalDataInfo";
import PersonalDataEditing from "./components/PersonalDataEditing/PersonalDataEdited";
import SocialsCard from "./components/SosialsCard";
import EditingButtons from "./components/EditingButtons";

import {
  fetchCabinetData,
  postCabinetData,
  CabinetData,
  PostCabinetData,
} from "../../Helpers/api";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PersonalArea() {
  const { i18n, t } = useTranslation();

  const [cabinetData, setCabinetData] = useState<CabinetData>();
  const [
    educationChangedData,
    setEducationChangedData,
  ] = useState<PostCabinetData>();

  const [update, setUpdate] = useState(0);

  useEffect(() => {
    fetchCabinetData(setCabinetData);
    return () => {};
  }, [update]);

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
        {([editing, setEditing]) =>
          editing ? (
            <PersonalDataEditing>
              <EditingButtons
                onCancel={() => {
                  setEditing(false);
                }}
                onSave={() => {}}
              />
            </PersonalDataEditing>
          ) : (
            <PersonalDataInfo />
          )
        }
      </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper
        title={t("cabinet-contacts")}
        imgSrc={socialsImgSRC}
        edited={false}
      >
        {() => <SocialsCard  />}
      </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper
        title={t("cabinet-education")}
        imgSrc={universityImgSrc}
      >
        {([editing, setEditing]) =>
          editing ? (
            <EducationCardEditing
              changesHandler={setEducationChangedData}
              serverData={cabinetData}
            >
              <EditingButtons
                onCancel={() => {
                  setEditing(false);
                }}
                onSave={() => {
                  postCabinetData(cabinetData, educationChangedData, setUpdate);
                  setEditing(false);
                }}
              />
            </EducationCardEditing>
          ) : (
            <EducationCardInfo data={cabinetData} />
          )
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
