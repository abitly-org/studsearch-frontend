import React from "react";
import userPhoto from "../PersonalDataInfo/userPhoto.svg";
import editImg from "../PersonalDataInfo/editImg.svg";
interface ImageProps{
    img: string,
    onChange:((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
    upload: any,
}
export default function InputImage (props: ImageProps) {
    const { img, onChange , upload} = props;
    console.log("We hare ", img)
    return(
        <div className={`imgUploadBlock`}>
            {!upload && <img src={(img === '')? userPhoto: img}  alt={``}/>}
             <label htmlFor={`fileUpload`}><img src={editImg} alt={`uploadImg`}/>
            </label>
            <input type={`file`} id={`fileUpload`} value={``} onChange={onChange}/>
        </div>)
}
