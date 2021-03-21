import React from "react";
import Item from "../Item";
import "../EducationCardInfo/index.scss"
export default function PersonalDataInfo() {
    return (
        <div className="wrapper">
            <div>
            <Item title="Ім’я, Прізвище" itemData="Катерина Малютіна" />
            <Item title="Стать" itemData="Жінка"/>
                </div>
            <Item title="Про себе" itemData="З радістю допоможу абітурієнтам та розповім деталі про навчання на своєму факультеті" />
        </div>
    );
}
