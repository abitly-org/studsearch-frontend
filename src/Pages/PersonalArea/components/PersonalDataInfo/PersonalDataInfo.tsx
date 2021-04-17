import React, { useState } from "react";
import Item from "../Item";
import "../itemsWrapper.scss";
import InputImage from "../InputImage/InputImage";
import {useTranslation} from "react-i18next";

export default function PersonalDataInfo() {
    const { i18n, t } = useTranslation();
    const [img, setImg] = useState("");

  return (
    <div className="wrapper-info">
      <InputImage
        img={img}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setImg(e.target.value);
        }}
      />
      <Item title={t('cabinet-name')} itemData="Катерина Малютіна" />
      <Item title={t('cabinet-gender')} itemData="Жінка" />
      <Item
        title={t('cabinet-about')}
        itemData="З радістю допоможу абітурієнтам та розповім деталі про навчання на своєму факультеті"
      />
    </div>
  );
}
