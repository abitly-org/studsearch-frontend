import React from "react";
import userPhoto from "../PersonalDataInfo/userPhoto.svg";
import editImg from "../PersonalDataInfo/editImg.svg";
interface ImageProps{
    img?: string | React.ReactNode,
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}
export default function InputImage (props: ImageProps) {
    const { img, onChange } = props;
    return (
        <div className={`imgUploadBlock`}>
            {
                typeof img === 'string' ? 
                    <img src={img === '' ? userPhoto : img}  alt={``}/>
                    :   
                    img
            }
            <label htmlFor={`fileUpload`}>
                <img src={editImg} alt={`uploadImg`} />
            </label>
            <input
                accept='image/png, image/jpeg'
                multiple={false}
                type={`file`}
                id={`fileUpload`}
                onChange={onChange}
            />
        </div>
    );
}
