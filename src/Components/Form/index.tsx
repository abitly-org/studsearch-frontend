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

  function onChange<T>(value: T) {
    console.log("onChange", value);
  }

  return (
    <>
     

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
    </>
  );
}
