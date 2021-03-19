import React, { useCallback, useEffect, useState } from "react";
import tgPhoto from "./tgPhoto.svg";
import './registrationForm.scss';

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
} from "../../../../Helpers/api";
import DropDown from "../../../../Components/DropDown";
import Input from "../../../../Components/Input";
import RadioBtnGender from "../../../../Components/RadioBtnGender/RadioBtnGender";
import MultiInput from "../../../../Components/MultiInput/MultiInput";
import Checkbox from "../../../../Components/CheckBox/Checkbox";

type FormProps = {};
type CoursesType = { id: number; title: string };

export default function RegistrationForm() {
  const [region, setRegion] = useState<Region>();
  const [university, setUniversity] = useState<University>();
  const [faculty, setFaculty] = useState<Faculty>();
  const [speciality, setSpeciality] = useState<Speciality>();
  const [course, setCourse] = useState<CoursesType>();
  const [nameSurname, setNameSurname] = useState("");
  

    const [gender, setGender] = useState('')
    const [aboutMyself, setAboutMyself] = useState('');
    const [checkBoxState, setCheckBoxState] = React.useState({
        tg: false,
        politic: false
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.checked;
        setCheckBoxState({
            ...checkBoxState,
            [event.target.name]: value
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
        }
    )

    function SubmitStates(event: any) {
        let readyToSubmit = true;
        event.preventDefault();
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
            politic: checkBoxState.politic
        }
        Object.entries(dataPost).map(([key, value]) => {
            if (key !== 'aboutMyself') {
                if (value == "" || value === undefined || value == false) {
                    readyToSubmit = false;
                    serError(prevUser => ({...prevUser, [key]: true}));
                } else {
                    serError(prevUser => ({...prevUser, [key]: false}));
                }
            }
        });
        if (readyToSubmit) {
            console.log("ready To send ");
        }
    }

    return (
        <div className={`SignForm`}>
            <form>
                <div className={`flName`}>
                    <Input
                        value={nameSurname}
                        error={error.nameSurname}
                        placeholder="Ім’я, Прізвище"
                        onChange={(changedVal: string) => {
                            setNameSurname(changedVal);
                        }}
                    />
                </div>
                <RadioBtnGender
                    gender={gender}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setGender(event.target.value);
                    }}/>
                <div className={`regionBlock`}>
                    <DropDown<Region>
                        placeholder="Регіон"
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
                        placeholder="Вищий навчальний заклад"
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
                            placeholder="Факультет"
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
                        placeholder="Спеціальність"
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
                        placeholder="Курс"
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
                />
                <div className="checkBoxBlock">
                    <Checkbox
                        label="tg"
                        value={`Додати моє фото з Telegram`}
                        checked={checkBoxState.tg}
                        onChange={handleChange}
                    />
                    <Checkbox
                        label="politic"
                        value={`Погоджуюся з`}
                        tag={<a href={`#`}>Політикою конфіденційності</a>}
                        checked={checkBoxState.politic}
                        onChange={handleChange}
                    />
                </div>
                <p className={`useTelegram`}>
                    Ми використовуем Telegram для зв’язку між абітурієнтом та студентом,
                    тому просимо тебе підтвердити свій аккаунт через Telegram-бота
                </p>
                <div className="authTelegram">
                    <button onClick={SubmitStates}>
                        <img src={tgPhoto} alt="tgPhoto"/>
                        <span>Підтвердити Telegram та зареєструватись</span>
                    </button>
                </div>
            </form>
        </div>
  );
}
