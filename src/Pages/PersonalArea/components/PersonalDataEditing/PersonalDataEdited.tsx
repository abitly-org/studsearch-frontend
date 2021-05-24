import React, {useState} from "react";
import Input from "../../../../Components/Input";
import MultiInput from "../../../../Components/MultiInput/MultiInput";
import InputImage from "../InputImage/InputImage";
import "./personalDataEditing.scss";
import {useTranslation} from "react-i18next";
import { Cabinet } from "../../PersonalArea";
import Dropdown2 from "../../../../Components/Dropdown2";
import { StudentPhoto } from "../../../../Components/StudentCard";

type EducationCardProp = {}

export default function PersonalDataEdited({
    refreshPhotoId,
    cabinet, setCabinet,
    uuid, setPhoto
}: {
    refreshPhotoId?: number,
    
    cabinet: Cabinet,
    setCabinet: (newCabinet: Cabinet) => void,

    uuid?: string,
    setPhoto: (newPhoto: Blob | null) => void
}) {
    const { i18n, t } = useTranslation();

    // const [img, setImg] = useState('')
    // const [nameSurname, setNameSurname] = useState("Катерина Малютіна");
    // const [gender, setGender] = useState("Жіноча");
    // const [aboutMyself, setAboutMyself] = useState('З радістю допоможу абітурієнтам та ' +
    //     'розповім деталі про навчання на своєму');
    const [error, serError] = React.useState({
        nameSurname: false,
        gender: false,
        aboutMyself: false,
    });

    // const url = React.useMemo(() => photo ? URL.createObjectURL(photo) : undefined, [ photo ]);

    return (
        <>
            <div className="wrapper">
                <div className={`userInfo`}>
                    <InputImage
                        img={uuid && <StudentPhoto key={refreshPhotoId} size={80} uuid={uuid} />}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e?.target?.files?.[0];
                            setPhoto?.(file ?? null);
                        }}
                    />
                    <Input
                        value={cabinet?.name}
                        error={error.nameSurname}
                        title={t('cabinet-name')}
                        onChange={name => setCabinet({ ...cabinet, name })}
                    />
                    <Dropdown2<'male' | 'female'>
                        values={['male', 'female']}
                        value={cabinet?.gender ?? null}

                        multiple={false}

                        error={error.gender}
                        name={t('cabinet-gender')}
                        style={{ minWidth: 150 }}
                        singleBorder

                        renderItem={item => t(`cabinet-gender-${item}`)}

                        onChange={(gender: 'male' | 'female' | null) => 
                            setCabinet({ ...cabinet, gender: gender ?? undefined })
                        }
                    />
                </div>
                <MultiInput
                    value={cabinet?.about ?? ''}
                    onChange={about => setCabinet({ ...cabinet, about })}
                    field={false}
                    max={120}
                />
            </div>
        </>
    );
}
