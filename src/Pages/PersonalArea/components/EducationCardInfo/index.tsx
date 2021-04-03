import React from "react";
import Item from "../Item";
import "../itemsWrapper.scss";
import {useTranslation} from "react-i18next";

interface EducationCardInfo{
  cabinetRegion: { id: number, name: { en?: string, ru?: string, ua: string } }|undefined,
  cabinetUniversity: { id: number, name: { en?: string, ru?: string, ua: string } }|undefined,
  cabinetFaculty: { id: number, name: { en?: string, ru?: string, ua: string } }|undefined,
  cabinetSpeciality: { id: number, name: { en?: string, ru?: string, ua: string }, code?: string }|undefined,
}

export default function EducationCardInfo(props:EducationCardInfo) {
  const { i18n, t } = useTranslation();
 
  const { cabinetRegion, cabinetUniversity, cabinetFaculty, cabinetSpeciality} = props;
    return (
    <div className="wrapper-info">
      <Item title={t('cabinet-region')} itemData={cabinetRegion?.name.ua} />
      <Item
        title={t('cabinet-university')}
        itemData={cabinetUniversity?.name.ua}/>
      <Item title={t('cabinet-faculty')} itemData={cabinetFaculty?.name.ua} />
      <Item title={t('cabinet-speciality')} itemData={`${cabinetSpeciality?.code} ${cabinetSpeciality?.name.ua}`} />
      <Item title={t('cabinet-course')} itemData="5" />
    </div>
  );
}
