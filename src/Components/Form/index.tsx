import React, { useState, useEffect, useCallback } from "react";
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
} from "..//..//Helpers/api";

import DropDown from "../DropDown";

type FormProps = {};

type CoursesType = {
  id: number;
  title: string;
};

export default function Form(props: FormProps) {
  const [region, setRegion] = useState<Region>();
  const [university, setUniversity] = useState<University>();
  const [faculty, setFaculty] = useState<Faculty>();
  const [speciality, setSpeciality] = useState<Speciality>();
  const [course, setCourse] = useState<CoursesType>();

  useEffect(() => {
    console.log("Form mount");
    return (() => {
      console.log("Form UNmount");

    })
  })

  function onChange<T>(value: T) {
    console.log("onChange", value);
  }

  console.log("Form region", region);
  console.log("Form university", university);
  console.log("Form faculty", faculty);
  console.log("Form speciality", speciality);
  console.log("Form course", course);
 
  return (
    <>
      <DropDown<Region>
        placeholder="Регіон"
        value={region}
        onChange={setRegion}
        request={useCallback(
          (count, offset, query) => getRegions().then((res) => res?.regions),
          []
        )}
      />

      <DropDown<University>
        placeholder="Вищий навчальний заклад"
        value={university}
        onChange={setUniversity}
        request={useCallback(
          (count, offset, query) =>
            getUniversities(query, region?.id, count, offset),
          [region]
        )}
      />

      <DropDown<Faculty>
        placeholder="Факультет"
        value={faculty}
        onChange={setFaculty}
        request={useCallback(
          (count, offset, query) =>
            getFaculties(query, university?.id, count, offset),
          [university]
        )}
      />

      <DropDown<Speciality>
        placeholder="Спеціальність"
        value={speciality}
        onChange={setSpeciality}
        request={useCallback(
          (count, offset, query) =>
            getSpecialities(query, university?.id, count, offset),
          [university]
        )}
      />

      <DropDown<CoursesType>
        placeholder="Курс"
        value={course}
        onChange={setCourse}
        request={useCallback(
          (count, offset, query) =>
            new Promise<CoursesType[]>((resolve, reject) => {
              resolve(Courses);
            }),
          []
        )}
      />
    </>
  );
}
