import React, { useEffect, useState } from "react";
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
import EditingButtons from "./components/EditingButtons";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InputImage from "./components/InputImage/InputImage";

export interface CabinetData {
  name: string;
  gender: "male" | "female";
  about: string;
  region: { id: number; name: { en?: string; ru?: string; ua: string } };
  university: { id: number; name: { en?: string; ru?: string; ua: string } };
  faculty: { id: number; name: { en?: string; ru?: string; ua: string } };
  speciality: {
    id: number;
    name: { en?: string; ru?: string; ua: string };
    code?: string;
  };
  course: number;
  hostel: boolean;
}

interface PostCabinetData {
  name: string;
  about: string;
  gender: "male" | "female";
  universityId: number;
  facultyId: number;
  specialityId: number;
  hostel: boolean;
  course: number;
}

function PersonalArea() {
  const { i18n, t } = useTranslation();

  const [cabinetData, setCabinetData] = useState<CabinetData>();
  const [
    educationChangedData,
    setEducationChangedData,
  ] = useState<PostCabinetData>();

  const [personalChangedData, setPersonalChangedData,] = useState<PostCabinetData>();

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetchCabinetData(setCabinetData, setUpdate);
    return () => {
    };
  }, [update]);

  function fetchCabinetData(setCabinetDataState: Function, updateState: Function) {
    const response = fetch("https://server.studsearch.org:2324/v2/cabinet", {
      credentials: "include",
    });
    response
      .then((response) => response.json())
      .then((data: CabinetData) => {

        setCabinetDataState(data);
        updateState(false);
      });
  }

  function postCabinetData(
    url: string,
    serverData: CabinetData | undefined,
    newData: PostCabinetData | undefined,
    setUpdate: Function
  ) {
    if (serverData) {
      const {
        name,
        about,
        gender,
        university,
        faculty,
        speciality,
        course,
      } = serverData;

      let data: PostCabinetData = {
        name: name,
        about: about,
        gender: gender,
        universityId: university.id,
        facultyId: faculty.id,
        specialityId: speciality.id,
        hostel: true,
        course: course,
      };

      data = { ...data, ...newData };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          setUpdate(true)
        } else {
          // modal window of request error
          console.log("data haven't add on server")
        }
      });
    }
  }

    const [uploadImg, setUploadImg] = useState(false);
    const [img, setImg] = useState("");

  useEffect(() => {
      console.log(" hello new img")
      const response = fetch("https://server.studsearch.org:2324/v2/cabinet/photo", {
          credentials: 'include',
      });
      response
          .then((res) => {
              setImg(res.url)
              setUploadImg(false);
          });
      return () => {
      };
  }, [uploadImg]);

    function postImg (e: any){
        const response =  fetch("https://server.studsearch.org:2324/v2/cabinet/photo", {
            method: 'POST',
            credentials: 'include',
            body: e.target.files[0],
            headers: {
                'content-type': e.target.files[0].type
            }
        });
        response.then((res: any) => {
            if (res.ok) {
                setUploadImg(true)
            }
         });
        }

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
            <PersonalDataEditing
                uploadImg={<InputImage
                    img={img}
                    onChange={postImg}
                />}
                changesHandler={setPersonalChangedData}
                serverData={cabinetData}>
              <EditingButtons
                editingHandler={() => {
                  setEditing(false);
                }}
                saveChanges={() => {
                  console.log(personalChangedData)
                  postCabinetData(
                      "https://server.studsearch.org:2324/v2/cabinet",
                      cabinetData,
                      personalChangedData,
                      setUpdate
                  );
                  setEditing(false);
                }}
              />
            </PersonalDataEditing>
          ) : (
            <PersonalDataInfo

                uploadImg={<InputImage
                    img={img}
                    onChange={postImg}
                />}
                data={cabinetData} />
          )
        }
      </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper
        title={t("cabinet-contacts")}
        imgSrc={socialsImgSRC}
        edited={false}
      >
        {() => <SocialsCard telegramValue="Malyutina14" />}
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
                editingHandler={() => {
                  setEditing(false);
                }}
                saveChanges={() => {
                  postCabinetData(
                    "https://server.studsearch.org:2324/v2/cabinet",
                    cabinetData,
                    educationChangedData,
                     setUpdate
                  );
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
