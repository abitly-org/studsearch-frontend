import React from "react";
import {
  Courses,
  University,
  Region,
  Faculty,
  Speciality,
} from "../../Helpers/api";

import { OptionUniversity } from "../Options";

export function setUniversitiesList(universities: University[]) {

  console.log("univers",universities);

  const options = universities.map((university) => {
    return (
      <OptionUniversity
        key={university.id}
        value={university.name}
        imgSrc=""
        studentsCount={university.studentsCount}
      />
    );
  });
  return options;
}
