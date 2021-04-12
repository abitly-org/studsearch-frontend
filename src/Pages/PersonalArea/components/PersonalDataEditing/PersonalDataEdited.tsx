import React, {useCallback, useEffect, useRef, useState} from "react";
import Input from "../../../../Components/Input";
import MultiInput from "../../../../Components/MultiInput/MultiInput";
import "./personalDataEditing.scss";
import { useTranslation } from "react-i18next";
import {CabinetData, Genders} from "../../../../Helpers/api";
import DropDown from "../../../../Components/DropDown";

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

  type GenderType = { name: 'Чоловік' | 'Жінка' };
  const gender = {
      name: (serverData?.gender == 'male'? 'Чоловік': 'Жінка')
  }

  const [nameSurname, setNameSurname] = useState(serverData?.name);
  const [genderUser, setGender] = useState<GenderType>(gender as GenderType)
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
    postData.current = {
    name: nameSurname,
    gender: genderUser.name == 'Чоловік'? 'male': 'female',
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
            <DropDown<GenderType>
                placeholder={t("cabinet-gender")}
                value={genderUser}
                inputError={error.gender}
                onChange={setGender}
                request={useCallback(
                    (count, offset, query) =>
                        new Promise<GenderType[]>((resolve, reject) => {
                            // @ts-ignore
                            resolve(Genders);
                        }),
                    []
                )}
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
