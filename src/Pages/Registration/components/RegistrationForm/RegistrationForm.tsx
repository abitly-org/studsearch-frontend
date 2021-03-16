import React, {useCallback, useEffect, useState} from "react";
import tgPhoto from "./tgPhoto.svg"
import Checkbox from "../CheckBox/Checkbox";
import MultiInput from "../MultiInput/MultiInput";
import RadioBtnGender from "../RadioBtnGender/RadioBtnGender";
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

type FormProps = {};
type CoursesType = { id: number; title: string; };

export default function RegistrationForm() {
    const [region, setRegion] = useState<Region>();
    const [university, setUniversity] = useState<University>();
    const [faculty, setFaculty] = useState<Faculty>();
    const [speciality, setSpeciality] = useState<Speciality>();
    const [course, setCourse] = useState<CoursesType>();

    useEffect(() => {
        console.log("Form mount");
        return (() => {
            console.log("Form UNmount");

        })
    })

    function onChange<T>(value: T) {
        console.log("onChange", value);
    }

    console.log("Form region", region);
    console.log("Form university", university);
    console.log("Form faculty", faculty);
    console.log("Form speciality", speciality);
    console.log("Form course", course);

    //----------------------------------------------------//
    const [query, setQuery] = useState("");
    const [selectOption, setSelectOption] = useState('')
    const [aboutMyself, setAboutMyself] = useState('');
    const [state, setState] = React.useState({
        tg: false,
        politic: false
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.checked;
        setState({
            ...state,
            [event.target.name]: value
        });
        console.log(event.target.name + ' -> ' + event.target.checked)
    }

    function SubmitStates() {
        console.log("you try submit states")
    }

    return <div className={`SignForm`}>
        <div className={`flName`}>
        </div>
        <RadioBtnGender
            selectOption={selectOption}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSelectOption(event.target.value);
                console.log(event.target.value);
            }}/>
        <div className={`regionBlock`}>
            <DropDown<Region>
                placeholder="Регіон"
                value={region}
                onChange={setRegion}
                request={useCallback(
                    (count, offset, query) => getRegions().then((res: any) => res?.regions),
                    []
                )}
            />
        </div>
        <div className={`universityBlock`}>
            <DropDown<University>
                placeholder="Вищий навчальний заклад"
                value={university}
                onChange={setUniversity}
                request={useCallback(
                    (count, offset, query) =>
                        getUniversities(query, region?.id, count, offset),
                    [region]
                )}
            />
        </div>
        <div className={`facultyBlock`}>
            {<DropDown<Faculty>
                placeholder="Факультет"
                value={faculty}
                onChange={setFaculty}
                request={useCallback(
                    (count, offset, query) =>
                        getFaculties(query, university?.id, count, offset),
                    [university]
                )}
            />}
        </div>
        <div className={`specialityCourseBlock`}>
            <DropDown<Speciality>
                placeholder="Спеціальність"
                value={speciality}
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAboutMyself(event.target.value);
                console.log(event.target.value)
            }}/>
        <div className="checkBoxBlock">
            <Checkbox
                label="tg"
                value={`Додати моє фото з Telegram`}
                checked={state.tg}
                onChange={handleChange}/>
            <Checkbox
                label="politic"
                value={`Погоджуюся з`}
                tag={<a href={`#`}>Політикою конфіденційності</a>}
                checked={state.politic}
                onChange={handleChange}/>
        </div>
        <p className={`useTelegram`}>Ми використовуем Telegram для зв’язку між абітурієнтом та студентом,
            тому просимо тебе підтвердити свій аккаунт через Telegram-бота</p>
        <div className="authTelegram">
            <a href={`#`} onClick={SubmitStates}>
                <img src={tgPhoto} alt="tgPhoto"/>
                <span>Підтвердити Telegram та зареєструватись</span>
            </a>
        </div>
    </div>
}