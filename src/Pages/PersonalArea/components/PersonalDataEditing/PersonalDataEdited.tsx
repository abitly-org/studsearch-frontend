import React, {useEffect, useRef, useState} from "react";
import Input from "../../../../Components/Input";
import MultiInput from "../../../../Components/MultiInput/MultiInput";
import InputImage from "../InputImage/InputImage";
import "./personalDataEditing.scss";
import { useTranslation } from "react-i18next";
import {CabinetData} from "../../PersonalArea";

type PersonalDataEditedProp = {
  uploadImg: JSX.Element
  children: JSX.Element;
  changesHandler: Function;
  serverData: CabinetData | undefined;
  // error: boolean
};

export default function PersonalDataEdited(props: PersonalDataEditedProp) {
  const { children, changesHandler, serverData } = props;

  const { i18n, t } = useTranslation();

  const [img, setImg] = useState('')
  const [nameSurname, setNameSurname] = useState(serverData?.name);
  const [genderUser, setGender] = useState(serverData?.gender == 'male' ? `Чоловік` : `Жінка`);
  const [aboutMyself, setAboutMyself] = useState(serverData?.about);
  const [error, serError] = React.useState({
    nameSurname: false,
    gender: false,
  });

  const postData = useRef({
    name: serverData?.name,
    gender: serverData?.gender,
    about: serverData?.about,
  });

  useEffect(() => {
    console.log(nameSurname , genderUser, aboutMyself )
        let genderUserTransl;
    console.log(genderUser);
    (genderUser == 'Чоловік')? genderUserTransl= 'male': genderUserTransl= 'female'
     postData.current = {
      name: nameSurname,
       // @ts-ignore
       gender:  genderUserTransl,
      about: aboutMyself,
    };
    changesHandler(postData.current);
  }, [
      nameSurname,
      genderUser,
      aboutMyself,
      changesHandler,
  ]);

  return (
    <>
      <div className="wrapper">
        <div className={`userInfo`}>
          {props.uploadImg}
          <Input
            value={nameSurname}
            error={error.nameSurname}
            placeholder={nameSurname}
            title={t("cabinet-name")}
            onChange={(changedVal: string) => {
              setNameSurname(changedVal);
            }}
          />
          <Input
            value={genderUser}
            error={error.gender}
            placeholder={genderUser}
            title={t("cabinet-gender")}
            onChange={(changedVal: string) => {
              setGender(changedVal);
            }}
          />
        </div>
        <MultiInput
          name={`textValue`}
          value={aboutMyself}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setAboutMyself(event.target.value);
          }}
          field={false}
        />
          </div>
          
          { children }
    </>
  );
}
