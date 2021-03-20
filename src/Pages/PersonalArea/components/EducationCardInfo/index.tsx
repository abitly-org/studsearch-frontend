import React from "react";
import Item from "./Item";
import "./index.scss"
export default function EducationCardInfo() {
  return (
    <div className="wrapper">
      <Item title="Регіон" itemData="Харків" />
      <Item
        title="Вищій навчальний заклад"
        itemData="Національний юридичний університет 
ім. Ярослава Мудрого"
      />
      <Item title="Факультет" itemData="Факультет Адвокатури" />
      <Item title="Спеціальність " itemData="081 Право" />
      <Item title="Курс" itemData="5" />
    </div>
  );
}
