import React from "react";
import Item from "../Item";
import "../itemsWrapper.scss";
import {useTranslation} from "react-i18next";

export default function EducationCardInfo() {
    const { i18n, t } = useTranslation();

    return (
    <div className="wrapper-info">
      <Item title={t('cabinet-region')} itemData="Харків" />
      <Item
        title={t('cabinet-university')}
        itemData="Національний юридичний університет ім. Ярослава Мудрого"/>
      <Item title={t('cabinet-faculty')} itemData="Факультет Адвокатури" />
      <Item title={t('cabinet-speciality')} itemData="081 Право" />
      <Item title={t('cabinet-course')} itemData="5" />
    </div>
  );
}
