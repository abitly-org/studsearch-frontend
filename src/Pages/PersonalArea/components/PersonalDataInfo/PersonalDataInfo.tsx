import React, { useState } from "react";
import Item from "../Item";
import "../itemsWrapper.scss";
import {useTranslation} from "react-i18next";
import {CabinetData} from "../../../../Helpers/api";
import Spinner from "../../../../Components/LoadingSpinner";

interface PersonalDataInfoProps {
    uploadImg: JSX.Element
    data: CabinetData | undefined;
}
export default function PersonalDataInfo(props: PersonalDataInfoProps) {
    const { i18n, t } = useTranslation();
    if (props.data) {
        const { name, gender, about } = props.data;
   return (
    <div className="wrapper-info">
        {props.uploadImg}
      <Item title={t('cabinet-name')} itemData={name} />
      <Item title={t('cabinet-gender')} itemData={ gender == 'male' ? `Чоловік` : `Жінка`}/>
      <Item title={t('cabinet-about')} itemData={about}/>
    </div>

  );
    } else {
        return <Spinner center-x center-y />;
    }
}
