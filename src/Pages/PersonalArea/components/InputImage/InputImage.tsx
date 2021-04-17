import React from "react";
import userPhoto from "../PersonalDataInfo/userPhoto.svg";
import editImg from "../PersonalDataInfo/editImg.svg";
interface ImageProps{
    img: string,
    onChange:((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}
export default function InputImage (props: ImageProps) {
    const { img, onChange } = props;
    return(
        <div className={`imgUploadBlock`}>
            <img src={(img === '')? userPhoto: img}  alt={``}/>
            <label htmlFor={`fileUpload`}><img src={editImg} alt={`uploadImg`}/>
            </label>
            <input type={`file`} id={`fileUpload`} value={``} onChange={onChange}/>
        </div>)
}
