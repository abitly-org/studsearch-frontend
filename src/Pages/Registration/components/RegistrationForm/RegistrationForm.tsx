import React, { useCallback, useEffect, useState, useRef } from "react";
import tgPhoto from "./tgPhoto.svg";
import fbPhoto from "./fbPhoto.png";
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
  Speciality,
  endpoint,
  makeQuery,
  SHOW_FB,
} from "../../../../Helpers/api";
import DropDown from "../../../../Components/DropDown";
import Input from "../../../../Components/Input";
import RadioBtnGender from "../../../../Components/RadioBtnGender/RadioBtnGender";
import MultiInput from "../../../../Components/MultiInput/MultiInput";
import Checkbox from "../../../../Components/CheckBox/Checkbox";
import {useTranslation} from "react-i18next";
import useLoad from "../../../../Helpers/useLoad";
import Dropdown2 from "../../../../Components/Dropdown2";
import { CourseDropdown, FacultyDropdown, RegionDropdown, SpecialityDropdown, UniversityDropdown } from "../../../../Components/Dropdown2/custom";
import useSession from "../../../../Helpers/session";
import { Redirect } from "react-router-dom";
import useUTM from "../../../../Helpers/useUTM";
import { P2 } from "../../../../Components/Text";

type FormProps = {};
type CoursesType = { id?: number; name?: string };

const useCachedState = <T extends unknown>(cache: string, initialState: T) => {
  const fromCache = React.useMemo(() => {
    const str = window?.localStorage?.getItem?.('studsearch-reg-' + cache);
    if (!str)
      return null;
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }, []);
  const [state, setState] = React.useState<T>(fromCache ?? initialState);
  return [
    state,
    (newState: T) => {
      window?.localStorage?.setItem?.('studsearch-reg-' + cache, JSON.stringify(newState));
      setState(newState);
    }
  ] as const;
}

export const ForceRedirect = ({ to }: { to: string }) => {
  React.useEffect(() => {
    window.open(to, '_self');
  }, [ ]);

  return null;
}

export default function RegistrationForm() {
  const session = useSession();

  // const response1 = fetch(
  //     "https://server.studsearch.org:2324/v2/register/?name=Vasja&gender=male&about=&universityID=1&facultyID=1&specialityID=1&course=1&hostel=false&telegramPhoto=false&token=MRNWYj5bAPosZyg4v6N3haSSoEYzfppP"
  //   );
  //   response1
  //     .then((response) => response.json())
  //     .then((data: data) => {
  //       console.log("registor", data);
  //     });

  const [region, setRegion] = useCachedState<Region | null>('region', null);
  const [university, setUniversity] = useCachedState<University | null>('university', null);
  const [faculty, setFaculty] = useCachedState<Faculty | null>('faculty', null);
  const [speciality, setSpeciality] = useCachedState<Speciality | null>('specialty', null);
  const [course, setCourse] = useCachedState<CoursesType | null>('course', null);
  const [nameSurname, setNameSurname] = useCachedState('name', "");
  const [gender, setGender] = useCachedState('gender', "male");
  const [aboutMyself, setAboutMyself] = useCachedState('about', "");
  const [checkBoxState, setCheckBoxState] = useCachedState('checkboxes', {
    tg: true,
    politic: false,
  });

  const regions = React.useMemo(() => region ? [ region ] : [], [ region ]);
  const universities = React.useMemo(() => university ? [ university ] : [], [ university ]);

  const utm = useUTM(),
        utmString = makeQuery(utm ?? {})?.substring?.(1);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.checked;
    setCheckBoxState({
      ...checkBoxState,
      [event.target.name]: value,
    });
    fixError(event.target.name as 'politic');
  }

  const [error, setError] = React.useState({
    nameSurname: false,
    gender: false,
    region: false,
    university: false,
    // faculty: false,
    speciality: false,
    course: false,
    politic: false
  });

  const fixError = (key: keyof typeof error) => 
    setError({ ...error, [key]: false });

  function SubmitStates(event: any) {
    let hasError = false;
    const dataPost = {
      nameSurname,
      gender,
      region,
      university,
      // faculty,
      speciality,
      course,
      aboutMyself,
      politic: checkBoxState.politic,
    };
    for (const [key, value] of (Object.entries(dataPost) ?? [])) {
      if (key !== "aboutMyself") {
        if (value == "" || value === undefined || value === null || (
          key === 'politic' &&
          value == false
        )) {
          event?.preventDefault?.();
          setError((prevUser) => ({ ...prevUser, [key]: true }));
          hasError = true;
        } else {
          setError((prevUser) => ({ ...prevUser, [key]: false }));
        }
      }
    }

    if (!hasError) {
      setTimeout(() => {
        window.open('/', '_self');
      }, 1000);
    }
  }
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    if (session?.verified)
      session.refresh();
  }, [ session?.verified ]);

  if (session?.verified)
    return <ForceRedirect to='/' />;

  return (
    <div className={`SignForm`}>
      <form>
        <div className={`flName`}>
          <Input
            required
            value={nameSurname}
            error={error.nameSurname}
            placeholder="Олександр Забудько"
            title= {t('registration-name-placeholder')}
            onChange={(changedVal: string) => {
              setNameSurname(changedVal);
              if (changedVal)
                fixError('nameSurname');
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
          <RegionDropdown
            required
            name={t('registration-region-placeholder')}
            singleBorder
            error={error.region}

            multiple={false}
            value={region}
            onChange={r => {
              if (r)
                fixError('region');
              setRegion(r);
            }}
          />
        </div>
        <div className={`universityBlock`}>
          <UniversityDropdown
            required
            name={t('registration-university-placeholder')}
            singleBorder
            error={error.university}

            regions={regions}

            multiple={false}
            value={university}
            onChange={u => {
              if (u)
                fixError('university');
              setUniversity(u);
            }}
          />
        </div>
        <div className={`specialityCourseBlock`}>
          <SpecialityDropdown
            required
            name={t('registration-speciality-placeholder')}
            singleBorder
            error={error.speciality}
            universities={universities}
            multiple={false}
            value={speciality}
            onChange={s => {
              if (s)
                fixError('speciality');
              setSpeciality(s);
            }}
          />
          <CourseDropdown
            required
            name={t('registration-course-placeholder')}
            error={error.course}
            singleBorder
            multiple={false}
            value={course}
            onChange={c => {
              if (c)
                fixError('course');
              setCourse(c);
            }}
          />
        </div>
        <div className={`facultyBlock`}>
          <FacultyDropdown
            name={t('registration-faculty-placeholder')}
            singleBorder
            // error={error.faculty}

            universities={universities}

            multiple={false}
            value={faculty}
            onChange={f => {
              // if (f)
              //   fixError('faculty');
              setFaculty(f);
            }}
            resetable
          />
        </div>
        <MultiInput
          name={`textValue`}
          value={aboutMyself}
          onChange={setAboutMyself}
          max={120}
          field={true}
        />
        <div className="checkBoxBlock">
          <Checkbox
            label="tg"
            value={t(`registration-checkBox-tg${SHOW_FB ? 'fb' : ''}-photo`)}
            checked={checkBoxState.tg}
            onChange={handleChange}
          />
          <Checkbox
            label="politic"
            value={t('registration-checkBox-confidential-part-1')}
            tag={<a href={`/privacy-policy`}>{t('registration-checkBox-confidential-part-2')}</a>}
            checked={checkBoxState.politic}
            onChange={handleChange}
            error={error?.politic}
          />
        </div>
        {/* <p className={`useTelegram`}>
            {t('registration-checkBox-helper-text')}
        </p> */}
        <br />
        <div className="authSocial telegram">
          <a
            className={`regButton`}
            onClick={SubmitStates}
            href={`${endpoint}/v2/register/telegram/${makeQuery({
              name: nameSurname,
              gender,
              about: aboutMyself,
              universityID: university?.id,
              facultyID: faculty?.id,
              specialityID: speciality?.id,
              course: course?.id,
              hostel: false,
              telegramPhoto: checkBoxState?.tg,
              token: session?.token,
              utm: utmString
            })}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={tgPhoto} alt="tgPhoto" />
            <span>{t('registration-confirm-telegram')}</span>
          </a>
        </div>
        { SHOW_FB &&
          <>
            <div className='or'>
              <span>
                <P2>{t('registration-confirm-or')}</P2>
              </span>
            </div>
            <div className="authSocial facebook">
              <a
                className={`regButton`}
                onClick={SubmitStates}
                href={`${endpoint}/v2/register/facebook/${makeQuery({
                  name: nameSurname,
                  gender,
                  about: aboutMyself,
                  universityID: university?.id,
                  facultyID: faculty?.id,
                  specialityID: speciality?.id,
                  course: course?.id,
                  hostel: false,
                  telegramPhoto: checkBoxState?.tg,
                  token: session?.token,
                  utm: utmString
                })}`}
                rel="noopener noreferrer"
              >
                <img src={fbPhoto} width='24' height='24' alt="fbPhoto" />
                <span>{t('registration-confirm-facebook')}</span>
              </a>
            </div>
          </>
        }
        <br />
        <p>Після реєстрації ти завжди зможеш видалити свої контакти з головної сторінки.</p>
      </form>
    </div>
  );
}
