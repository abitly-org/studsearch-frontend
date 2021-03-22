import React, {useState} from "react";
import Item from "../Item";
import "./itemsWrapper.scss"
import InputImage from "../InputImage/InputImage";

export default function PersonalDataInfo() {
    const [img, setImg] = useState('')

    return (
        <div className="wrapper-info">
            <InputImage img={img} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setImg(e.target.value)}} />
            <Item title="Ім’я, Прізвище" itemData="Катерина Малютіна"/>
            <Item title="Стать" itemData="Жінка"/>
            <Item
                title="Про себе"
                itemData="З радістю допоможу абітурієнтам та розповім деталі про навчання на своєму факультеті"
            />
        </div>
    );
}
