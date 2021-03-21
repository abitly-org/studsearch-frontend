import React, {useState} from "react";
import Input from "../../../../Components/Input";
import MultiInput from "../../../../Components/MultiInput/MultiInput";

type EducationCardProp = {}

export default function PersonalDataEdited(props: EducationCardProp) {
    const [nameSurname, setNameSurname] = useState("");
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
                <div className={`flName`}>
                    <Input
                        value={nameSurname}
                        error={error.nameSurname}
                        placeholder="Олександр Забудько"
                        title="Ім’я, Прізвище"
                        onChange={(changedVal: string) => {
                            setNameSurname(changedVal);
                        }}
                    />
                </div>
                <div className={`flName`}>
                    <Input
                        value={nameSurname}
                        error={error.gender}
                        placeholder={gender}
                        title="Стать"
                        onChange={(changedVal: string) => {
                            setGender(gender);
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
