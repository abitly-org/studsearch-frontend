import React from "react";
import Item from "../Item";
import "../itemsWrapper.scss";
import {useTranslation} from "react-i18next";
import { Cabinet } from "../../PersonalArea";
import { takeString } from "../../../../Helpers/api";
import { Courses } from "../../../../Components/Dropdown2/custom";

export default function EducationCardInfo({ cabinet }: { cabinet: Cabinet }) {
    const { i18n, t } = useTranslation();

    return (
    <div className="wrapper-info">
      <Item
        title={t('cabinet-region')}
        itemData={takeString(cabinet?.region?.name, i18n.language)}
      />
      <Item
        title={t('cabinet-university')}
        itemData={takeString(cabinet?.university?.name, i18n.language)}
      />
      <Item
        title={t('cabinet-faculty')}
        itemData={takeString(cabinet?.faculty?.name, i18n.language)}
      />
      <Item
        title={t('cabinet-speciality')}
        itemData={
          (cabinet?.speciality?.code ? cabinet?.speciality?.code + ' ' : '') +
          takeString(cabinet?.speciality?.name, i18n.language)
        }
      />
      <Item
        title={t('cabinet-course')}
        itemData={Courses(t)?.find?.(c => c?.id === cabinet?.course)?.name ?? '—'}
      />
    </div>
  );
}
