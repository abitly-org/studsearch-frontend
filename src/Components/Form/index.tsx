import React, { useState, useEffect, useRef, useCallback } from "react";
import { IForm } from "../../interfaces";
import Input from "../Input";
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

export default function Form(props: FormProps) {
  const [region, setRegion] = useState<Region>();
  const [university, setUniversity] = useState<University>();
  const [faculty, setFaculty] = useState<Faculty>();
  const [speciality, setSpeciality] = useState<Speciality>();
  const [course, setCourse] = useState<string>();

  function onChange<T>(value: T) {
    console.log("onChange", value);
  }
  console.log("form univer", university);
  return (
    <>
      {/* <DropDown<Region>
        placeholder="Регіон"
        value={region}
        onChange={setRegion}
        request={useCallback(
          (count, offset, query) =>
            getRegions(),
          []
        )}
      /> */}

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
    </>
  );
}
