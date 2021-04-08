import React from "react";
import Item from "../Item";
import "../itemsWrapper.scss";
import { useTranslation } from "react-i18next";
import Spinner from "../../../../Components/LoadingSpinner";
import { Courses, CabinetData } from "../../../../Helpers/api";

interface EducationCardInfoProps {
  data: CabinetData | undefined;
}

export default function EducationCardInfo(props: EducationCardInfoProps) {
  const { i18n, t } = useTranslation();
  if (props.data) {
    const { region, university, faculty, speciality, course } = props.data;
    return (
      <div className="wrapper-info">
        <Item title={t("cabinet-region")} itemData={region?.name.ua} />
        <Item title={t("cabinet-university")} itemData={university?.name.ua} />
        <Item title={t("cabinet-faculty")} itemData={faculty?.name.ua} />
        <Item
          title={t("cabinet-speciality")}
          itemData={speciality && `${speciality?.code} ${speciality?.name.ua}`}
        />
        <Item
          title={t("cabinet-course")}
          itemData={Courses[course].name.split(" ")[0]}
        />
      </div>
    );
  } else {
    return <Spinner center-x center-y />;
  }
}
