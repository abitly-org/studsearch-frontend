import React, { useCallback, useEffect, useState, useRef } from "react";
import tgPhoto from "./tgPhoto.svg";
import "./registrationForm.scss";

import {
  getUniversities,
  getFaculties,
  getSpecialities,
  getRegions,
  Courses,
  University,
  Region,
  Faculty,
  Speciality, fetchSession,
} from "../../../../Helpers/api";
import DropDown from "../../../../Components/DropDown";
import Input from "../../../../Components/Input";
import RadioBtnGender from "../../../../Components/RadioBtnGender/RadioBtnGender";
import MultiInput from "../../../../Components/MultiInput/MultiInput";
import Checkbox from "../../../../Components/CheckBox/Checkbox";
import {useTranslation} from "react-i18next";

type FormProps = {};
type CoursesType = { id: number; name: string };

export default function RegistrationForm() {

  const [verified, setVerified] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    fetchSession(setVerified);
    return () => {};
  }, []);

  const [region, setRegion] = useState<Region>();
  const [university, setUniversity] = useState<University>();
  const [faculty, setFaculty] = useState<Faculty>();
  const [speciality, setSpeciality] = useState<Speciality>();
  const [course, setCourse] = useState<CoursesType>();
  const [nameSurname, setNameSurname] = useState("");
  const [gender, setGender] = useState("male");
  const [aboutMyself, setAboutMyself] = useState("");
  const [checkBoxState, setCheckBoxState] = React.useState({
    tg: true,
    politic: false,
  });

  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.checked;
    setCheckBoxState({
      ...checkBoxState,
      [event.target.name]: value,
    });
  }

  const [error, serError] = React.useState({
    nameSurname: false,
    gender: false,
    region: false,
    university: false,
    faculty: false,
    speciality: false,
    course: false,
  });

    function SubmitStates(event: any) {
    let readyToSubmit = true;
    const dataPost = {
      nameSurname: nameSurname,
      gender: gender,
      region: region,
      university: university,
      faculty: faculty,
      speciality: speciality,
      course: course,
      aboutMyself: aboutMyself,
      tg: checkBoxState.tg,
      politic: checkBoxState.politic,
    };
    Object.entries(dataPost).map(([key, value]) => {
      if (key !== "aboutMyself") {
        if (value == "" || value === undefined || value == false) {
            event.preventDefault();
            readyToSubmit = false;
          serError((prevUser) => ({ ...prevUser, [key]: true }));
        } else {
          serError((prevUser) => ({ ...prevUser, [key]: false }));
        }
      }
    });
    if (readyToSubmit) {
      console.log("ready To send ");
    }
  }
    const { t, i18n } = useTranslation();

  return (
    <div className={`SignForm`}>
      <form>
        <div className={`flName`}>
          <Input
            value={nameSurname}
            error={error.nameSurname}
            placeholder="Олександр Забудько"
            title= {t('registration-name-placeholder')}
            onChange={(changedVal: string) => {
              setNameSurname(changedVal);
            }}
          />
        </div>
        <RadioBtnGender
          gender={gender}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setGender(event.target.value);
          }}
        />
        <div className={`regionBlock`}>
          <DropDown<Region>
            placeholder={t('registration-region-placeholder')}
            value={region}
            inputError={error.region}
            onChange={setRegion}
            request={useCallback(
              (count, offset, query) =>
                getRegions().then((res: any) => res?.regions),
              []
            )}
          />
        </div>
        <div className={`universityBlock`}>
          <DropDown<University>
            placeholder={t('registration-university-placeholder')}
            value={university}
            inputError={error.university}
            onChange={setUniversity}
            request={useCallback(
              (count, offset, query) =>
                getUniversities(query, region?.id, count, offset),
              [region]
            )}
          />
        </div>
        <div className={`facultyBlock`}>
          {
            <DropDown<Faculty>
              placeholder={t('registration-faculty-placeholder')}
              value={faculty}
              inputError={error.faculty}
              onChange={setFaculty}
              request={useCallback(
                (count, offset, query) =>
                  getFaculties(query, university?.id, count, offset),
                [university]
              )}
            />
          }
        </div>
        <div className={`specialityCourseBlock`}>
          <DropDown<Speciality>
            placeholder={t('registration-speciality-placeholder')}
            value={speciality}
            inputError={error.speciality}
            onChange={setSpeciality}
            request={useCallback(
              (count, offset, query) =>
                getSpecialities(query, university?.id, count, offset),
              [university]
            )}
          />
          <DropDown<CoursesType>
            placeholder={t('registration-course-placeholder')}
            value={course}
            inputError={error.course}
            onChange={setCourse}
            request={useCallback(
              (count, offset, query) =>
                new Promise<CoursesType[]>((resolve, reject) => {
                  resolve(Courses);
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
          field={true}
        />
        <div className="checkBoxBlock">
          <Checkbox
            label="tg"
            value={t('registration-checkBox-tg-photo')}
            checked={checkBoxState.tg}
            onChange={handleChange}
          />
          <Checkbox
            label="politic"
            value={t('registration-checkBox-confidential-part-1')}
            tag={<a href={`#`}>{t('registration-checkBox-confidential-part-2')}</a>}
            checked={checkBoxState.politic}
            onChange={handleChange}
          />
        </div>
        <p className={`useTelegram`}>
            {t('registration-checkBox-helper-text')}
        </p>

          <div className="authTelegram">
                <a
                className={`regButton`} onClick={SubmitStates}
                href={`https://server.studsearch.org:2324/v2/register/?name=${nameSurname}&gender=${gender}&about=${aboutMyself}&universityID=${university?.id}&facultyID=${faculty?.id}&specialityID=${speciality?.id}&course=${course?.id}&hostel=false&telegramPhoto=${checkBoxState.tg}`}
                target="_blank"
                rel="noopener noreferrer">
              <img src={tgPhoto} alt="tgPhoto" />
              <span>{t('registration-confirm-telegram')}</span>
            </a>
           </div>
      </form>
    </div>
  );
}
