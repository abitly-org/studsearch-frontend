import React from "react";
import {ReactComponent as PhotoPlaceholder} from "../../../../Components/StudentCard/photoPlaceholder.svg";
import editImg from "../PersonalDataInfo/editImg.svg";
interface ImageProps{
    img: string | undefined,
    onChange:((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
    upload: any,
}
export default function InputImage (props: ImageProps) {
    const { img, onChange , upload} = props;

    return(
        <div className={`imgUploadBlock`}>
            {img !== undefined?
                    (img === '')?
                    <div className={`UserImgBlock`}>
                        <PhotoPlaceholder />
                    </div>: !upload && <img src= {img}  alt={``}/>
                    : null
            }
             <label htmlFor={`fileUpload`}><img src={editImg} alt={`uploadImg`}/>
            </label>
            <input type={`file`} id={`fileUpload`} value={``} onChange={onChange}/>
        </div>)
}
