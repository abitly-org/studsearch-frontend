import React from "react";
import Item from "../Item";
import "../PersonalAreaCardWrapper/itemsWrapper.scss";
export default function PersonalDataInfo() {
  return (
    <div className="wrapper">
      <Item title="Ім’я, Прізвище" itemData="Катерина Малютіна" />
      <Item title="Стать" itemData="Жінка" />
      <Item
        title="Про себе"
        itemData="З радістю допоможу абітурієнтам та розповім деталі про навчання на своєму факультеті"
      />
    </div>
  );
}
