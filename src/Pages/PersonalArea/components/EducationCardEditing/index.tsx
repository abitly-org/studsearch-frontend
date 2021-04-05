import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  getUniversities,
  getFaculties,
  getSpecialities,
  getRegions,
  Courses,
  University,
  Region,
  Faculty,
  Speciality,
} from "../../../../Helpers/api";
import { useTranslation } from "react-i18next";

import { EditingButtonsProps } from "../EditingButtons";

import DropDown from "../../../../Components/DropDown";
import CheckBox from "../../../../Components/CheckBox/Checkbox";

import { CabinetData } from "../../PersonalArea";

import "./index.scss";

type CoursesType = { id: number; name: string };

type EducationCardProp = {
  children: JSX.Element;
  changesHandler: Function;
  serverData: CabinetData | undefined;
  // error: boolean
};

export default function EducationCardEdited(props: EducationCardProp) {
  const { i18n, t } = useTranslation();
  const { children, changesHandler, serverData } = props;

  const defaultRegionValue = {
    id: serverData?.region.id,
    name: serverData?.region.name.ua,
    universitiesCount: 0,
    studentsCount: 0,
  };

  const defaultUniversityValue = {
    id: serverData?.university.id,
    name: serverData?.university.name,
    studentsCount: 0,
  };

  const defaultFacultyValue = {
    id: serverData?.faculty.id,
    name: serverData?.faculty.name,
    studentsCount: 0,
  };

  const defaultSpecialityValue = {
    id: serverData?.speciality.id,
    name: serverData?.speciality.name,
    code: serverData?.speciality.code,
    studentsCount: 0,
  };

  const defaultCourseValue = {
    id: serverData?.course,
    name: Courses[serverData?.course as number].name,
  };

  const [region, setRegion] = useState<Region>(defaultRegionValue as Region);
  const [university, setUniversity] = useState<University>(
    defaultUniversityValue as University
  );
  const [faculty, setFaculty] = useState<Faculty>(
    defaultFacultyValue as Faculty
  );
  const [speciality, setSpeciality] = useState<Speciality>(
    defaultSpecialityValue as Speciality
  );
  const [course, setCourse] = useState<CoursesType>(
    defaultCourseValue as CoursesType
  );
  const [checked, setChecked] = useState(false);

  const postData = useRef({
    region: region?.id,
    universityId: university?.id,
    facultyId: faculty?.id,
    specialityId: speciality?.id,
    hostel: checked,
    course: course?.id,
  });

  useEffect(() => {
    postData.current = {
      region: region?.id,
      universityId: university?.id,
      facultyId: faculty?.id,
      specialityId: speciality?.id,
      hostel: checked,
      course: course?.id,
    };
    changesHandler(postData.current);
  }, [
    checked,
    speciality,
    faculty,
    university,
    region,
    course,
    changesHandler,
  ]);

  const [error, setError] = React.useState({
    nameSurname: false,
    gender: false,
    region: false,
    university: false,
    faculty: false,
    speciality: false,
    course: false,
  });

  return (
    <>
      <div className="wrapper">
        <div className={`regionBlock`}>
          <DropDown<Region>
            placeholder={t("cabinet-region")}
            value={region}
            inputError={error.region}
            onChange={setRegion}
            request={useCallback(
              (count, offset, query) =>
                getRegions().then((res: any) => res?.regions),
              []
            )}
          />
        </div>
        <div className={`universityBlock`}>
          <DropDown<University>
            placeholder={t("cabinet-university")}
            value={university}
            inputError={error.university}
            onChange={setUniversity}
            request={useCallback(
              (count, offset, query) =>
                getUniversities(query, region?.id, count, offset),
              [region]
            )}
          />
        </div>
        <div className={`facultyBlock`}>
          {
            <DropDown<Faculty>
              placeholder={t("cabinet-faculty")}
              value={faculty}
              inputError={error.faculty}
              onChange={setFaculty}
              request={useCallback(
                (count, offset, query) =>
                  getFaculties(query, university?.id, count, offset),
                [university]
              )}
            />
          }
        </div>
        <div className={`specialityCourseBlock`}>
          <DropDown<Speciality>
            placeholder={t("cabinet-speciality")}
            value={speciality}
            inputError={error.speciality}
            onChange={setSpeciality}
            request={useCallback(
              (count, offset, query) =>
                getSpecialities(query, university?.id, count, offset),
              [university]
            )}
          />
          <DropDown<CoursesType>
            placeholder={t("cabinet-course")}
            value={course}
            inputError={error.course}
            onChange={setCourse}
            request={useCallback(
              (count, offset, query) =>
                new Promise<CoursesType[]>((resolve, reject) => {
                  resolve(Courses);
                }),
              []
            )}
          />
        </div>

        <div className="checkBoxBlock">
          <CheckBox
            label="сheckbox"
            value={"Можу допомогти з питаннями про гуртожиток"}
            onChange={() => {
              setChecked(!checked);
            }}
            checked={checked}
          />
        </div>
      </div>

      {children}
    </>
  );
}
