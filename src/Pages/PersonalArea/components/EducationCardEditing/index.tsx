import React, { useCallback, useState } from "react";
import DropDown from "../../../../Components/DropDown";
import {
  getUniversities,
  getFaculties,
  getSpecialities,
  getRegions,
  University,
  Region,
  Faculty,
  Speciality,
} from "../../../../Helpers/api";

import CheckBox from "../../../../Components/CheckBox/Checkbox";

import "./index.scss";
import {useTranslation} from "react-i18next";
import Dropdown2 from "../../../../Components/Dropdown2";
import useLoad from "../../../../Helpers/useLoad";
import { CourseDropdown, Courses, FacultyDropdown, RegionDropdown, SpecialityDropdown, UniversityDropdown } from "../../../../Components/Dropdown2/custom";
import { Cabinet } from "../../PersonalArea";

type CoursesType = { id?: number; name?: string };
type EducationCardProp = {};

export default function EducationCardEdited({
  cabinet, setCabinet
}: {
  cabinet: Cabinet,
  setCabinet: (newCabinet: Cabinet) => void
}) {
  const { i18n, t } = useTranslation();

  const allRegions = useLoad(() => getRegions().then(r => r?.regions), []);

  // const [region, setRegion] = useState<Region | null>(cabinet?.region ?? null);
  // const [university, setUniversity] = useState<University | null>(cabinet?.university ?? null);
  // const [faculty, setFaculty] = useState<Faculty | null>(cabinet?.faculty ?? null);
  // const [speciality, setSpeciality] = useState<Speciality | null>(cabinet?.speciality ?? null);
  // const [course, setCourse] = useState<CoursesType | null>(Courses(t)?.find?.(c => c?.id === cabinet?.course) ?? null);
  // const [checked, setChecked] = useState(false);

  // React.useEffect(() => {
  //   setRegion(cabinet?.region ?? null);
  //   setUniversity(cabinet?.university ?? null);
  //   setFaculty(cabinet?.faculty ?? null);
  //   setSpeciality(cabinet?.speciality ?? null);
  //   setCourse(Courses(t)?.find?.(c => c?.id === cabinet?.course) ?? null);
  // }, [ cabinet ]);

  const regions = React.useMemo(() => cabinet?.region ? [ cabinet?.region ] : [], [ cabinet?.region ]);
  const universities = React.useMemo(() => cabinet?.university ? [ cabinet?.university ] : [], [ cabinet?.university ]);

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
          <RegionDropdown
            name={t('cabinet-region')}
            error={error.region}
            singleBorder
            
            multiple={false}
            value={cabinet?.region ?? null}
            onChange={region => setCabinet({ ...cabinet, region: region ?? undefined })}
          />
        </div>
        <div className={`universityBlock`}>
          <UniversityDropdown
            name={t('cabinet-university')}
            error={error.university}
            singleBorder

            regions={regions}

            multiple={false}
            value={cabinet?.university ?? null}
            onChange={university => setCabinet({ ...cabinet, university: university ?? undefined })}
          />
        </div>
        <div className={`facultyBlock`}>
          <FacultyDropdown
            name={t('cabinet-faculty')}
            error={error.faculty}
            singleBorder

            universities={universities}
            
            multiple={false}
            value={cabinet?.faculty ?? null}
            onChange={faculty => setCabinet({ ...cabinet, faculty: faculty ?? undefined })}
          />
        </div>
        <div className={`specialityCourseBlock`}>
          <SpecialityDropdown
            name={t('cabinet-speciality')}
            error={error.speciality}
            singleBorder
            style={{ flex: 1 }}

            universities={universities}
            
            multiple={false}
            value={cabinet?.speciality ?? null}
            onChange={speciality => setCabinet({ ...cabinet, speciality: speciality ?? undefined })}
          />
          <CourseDropdown
            name={t('cabinet-course')}
            error={error.course}
            singleBorder
            style={{ flex: 1 }}

            multiple={false}
            value={
              Courses(t)?.find?.(c => c?.id === cabinet?.course) ?? null
            }
            onChange={course => setCabinet({ ...cabinet, course: course?.id ?? undefined })}
          />
        </div>

        <div className="checkBoxBlock">
          <CheckBox
            label="сheckbox"
            value={t('cabinet-check-box-hostel')}

            checked={cabinet?.hostel}
            onChange={e => setCabinet({ ...cabinet, hostel: e?.target?.checked ?? false })}
          />
        </div>
      </div>
    </>
  );
}
