import React, {useState} from "react";
import Input from "../../../../Components/Input";
import MultiInput from "../../../../Components/MultiInput/MultiInput";
import InputImage from "../InputImage/InputImage";
import "./personalDataEditing.scss";

type EducationCardProp = {}

export default function PersonalDataEdited(props: EducationCardProp) {
    const [img, setImg] = useState('')
    const [nameSurname, setNameSurname] = useState("Катерина Малютіна");
    const [gender, setGender] = useState("Жіноча");
    const [aboutMyself, setAboutMyself] = useState('З радістю допоможу абітурієнтам та ' +
        'розповім деталі про навчання на своєму');
     const [error, serError] = React.useState({
        nameSurname: false,
        gender: false,
        aboutMyself: false,
    });

    return (
        <>
            <div className="wrapper">
                <div className={`userInfo`}>
                <InputImage img={img} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setImg(e.target.value)}} />
                     <Input
                        value={nameSurname}
                        error={error.nameSurname}
                        placeholder={nameSurname}
                        title="Ім’я, Прізвище"
                        onChange={(changedVal: string) => {
                            setNameSurname(changedVal);
                        }}
                    />
                     <Input
                        value={gender}
                        error={error.gender}
                        placeholder={gender}
                        title="Стать"
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
        </>
    );
}
