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
import { Link, Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSession from "../../Helpers/session";
import { endpoint, Faculty, makeQuery, Region, Speciality, University } from "../../Helpers/api";
import useLoad, { useLoadState } from "../../Helpers/useLoad";
import Button from "../../Components/Button";
import { ForceRedirect } from "../Registration/components/RegistrationForm/RegistrationForm";
import useTitle from "../../Helpers/useTitle";

export type Cabinet = {
  about?: string,
  course?: number,
  gender?: 'male' | 'female',
  name?: string,
  region?: Region,
  faculty?: Faculty,
  speciality?: Speciality,
  university?: University,
  hostel?: boolean
};
export type Contacts = { [socialName: string]: string | null };
const toUploadCabinet = (cabinet: Cabinet) => ({
  name: cabinet.name,
  about: cabinet.about,
  gender: cabinet.gender,
  course: Number(cabinet.course),

  universityId: cabinet.university?.id,
  specialityId: cabinet.speciality?.id,
  facultyId: cabinet.faculty?.id,

  hostel: cabinet?.hostel ?? false
})

const getCabinet = (token?: string | null) =>
  fetch(`${endpoint}/v2/cabinet${makeQuery({ token })}`, { credentials: 'include'  })
    .then(r => r?.json?.());
const setCabinet = (newCabinet: any, token?: string | null) =>
  fetch(`${endpoint}/v2/cabinet${makeQuery({ token })}`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(newCabinet),
    headers: [ ['Content-Type', 'application/json'] ]
  });

const getContacts = (token?: string | null) =>
  fetch(`${endpoint}/v2/cabinet/contacts${makeQuery({ token })}`, { credentials: 'include' })
    .then(r => r?.json?.());
const setContacts = (contacts: Contacts, token?: string | null) =>
  fetch(`${endpoint}/v2/cabinet/contacts${makeQuery({ token })}`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(contacts),
    headers: [ ['Content-Type', 'application/json']]
  });

const getPhoto = (token?: string | null) =>
  fetch(`${endpoint}/v2/cabinet/photo${makeQuery({ token })}`, { credentials: 'include' })
    .then(r => r?.blob?.());
const setPhoto = (photo: Blob, token?: string | null) =>
  fetch(`${endpoint}/v2/cabinet/photo${makeQuery({ token })}`, {
    method: 'POST',
    credentials: 'include',
    body: photo,
    headers: (
      photo instanceof File ? 
        [ [ 'Content-Type', photo?.type ] ] : 
        []
    )
  });
const removePhoto = (token?: string | null) =>
  fetch(`${endpoint}/v2/cabinet/photo${makeQuery({ token })}`, { method: 'DELETE', credentials: 'include' })

function PersonalArea() {
  const { i18n, t } = useTranslation();
  const history = useHistory();

  useTitle(t('title') + ' — ' + t('title-cabinet'));

  const [refreshId, setRefreshId] = React.useState(0);
  const refresh = () => setRefreshId(r => r + 1);

  const session = useSession();

  const cabinet = useLoad(() => getCabinet(session?.token), [ session?.token, refreshId ]);
  const contacts = useLoad(() => getContacts(session?.token), [ session?.token, refreshId ]);
  
  const [refreshPhotoId, setRefreshPhotoId] = React.useState(0);
  const refreshPhoto = () => setRefreshPhotoId(r => r + 1);
  
  // const photo = useLoad(() => getPhoto(session?.token), [ session?.token, refreshId ]);
  const [cabinetState, setCabinetState] = React.useState(cabinet);
  React.useEffect(() => setCabinetState(cabinet), [ cabinet ]);

  const [contactsState, setContactsState] = React.useState(contacts);
  React.useEffect(() => setContactsState(contacts), [ contacts ]);

  const saveCabinet = async () => {
    await setCabinet(toUploadCabinet(cabinetState), session?.token);
    refresh();
  };

  React.useEffect(() => {
    if (session?.verified)
      session.refresh();
  }, [ session?.verified ]);

  if (session?.status && !session?.verified)
    return <ForceRedirect to='/' />;

  return (
    <>
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
        onSave={saveCabinet}
      >
        {(editing) =>
          editing ? 
            <PersonalDataEditing
              cabinet={cabinetState}
              setCabinet={setCabinetState}
              // photo={photo}
              uuid={session?.studentUuid}
              setPhoto={async (newPhoto) => {
                if (newPhoto)
                  await setPhoto(newPhoto, session?.token);
                else  
                  await removePhoto(session?.token);
              }}
            /> : 
            <PersonalDataInfo
              cabinet={cabinetState}
              uuid={session?.studentUuid}
              // photo={photo}
              setPhoto={async (newPhoto) => {
                if (newPhoto)
                  await setPhoto(newPhoto, session?.token);
                else  
                  await removePhoto(session?.token);
              }}
            />
        }
      </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper
        title={t("cabinet-contacts")}
        imgSrc={socialsImgSRC}
        edited={false}
      >
        <SocialsCard
          contacts={contactsState}
          setContacts={setContactsState}
          onSave={async newContacts => {
            await setContacts(newContacts ?? contactsState, session?.token);
          }}
        />
      </PersonalAreaCardWrapper>

      <PersonalAreaCardWrapper
        title={t("cabinet-education")}
        imgSrc={universityImgSrc}
        onSave={saveCabinet}
      >
        {(editing) =>
          editing ?
            <EducationCardEditing
              cabinet={cabinetState}
              setCabinet={setCabinetState}
            /> : 
            <EducationCardInfo
              cabinet={cabinetState}
            />
        }
      </PersonalAreaCardWrapper>

      <Button
        style={{ margin: '16px auto', textAlign: 'center', display: 'block' }}
        children={t('cabinet-logout')}
        onClick={async () => {
          await session?.logout?.();
          window.open('/', '_self');
        }}
      />
      {/* <footer className={`Footer`}>
        <p>{t("cabinet-delete-profile")}</p>
        <span>{t("cabinet-delete-text")}</span>
        <Link to={`delete-page`}>{t("cabinet-delete-link")}</Link>
      </footer> */}
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default PersonalArea;
