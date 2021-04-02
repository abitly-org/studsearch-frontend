import React, { useCallback, useState } from "react";
import DropDown from "../../../../Components/DropDown";
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

import CheckBox from "../../../../Components/CheckBox/Checkbox";

import "./index.scss";
import {useTranslation} from "react-i18next";

type CoursesType = { id: number; name: string };
type EducationCardProp = {};

export default function EducationCardEdited(props: EducationCardProp) {
  const { i18n, t } = useTranslation();

  const [region, setRegion] = useState<Region>();
  const [university, setUniversity] = useState<University>();
  const [faculty, setFaculty] = useState<Faculty>();
  const [speciality, setSpeciality] = useState<Speciality>();
  const [course, setCourse] = useState<CoursesType>();
  const [checked, setChecked] = useState(false);

  const [error, serError] = React.useState({
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
            placeholder={t('cabinet-region')}
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
            placeholder={t('cabinet-university')}
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
              placeholder={t('cabinet-faculty')}
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
            placeholder={t('cabinet-speciality')}
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
            placeholder={t('cabinet-course')}
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
            value={t('cabinet-check-box-hostel')}
            onChange={() => {
              setChecked(!checked);
            }}
            checked={checked}
          />
        </div>
      </div>
    </>
  );
}
