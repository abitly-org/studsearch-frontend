import React from "react";
import {
  Courses,
  University,
  Region,
  Faculty,
  Speciality,
} from "../../Helpers/api";

import { OptionUniversity } from "../Options";

export function setUniversitiesList(
  universities: University[],
  query: string,
  onGetItemValue: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined
) {
  // function onUniversityClicked(event: any) {
  //   console.log(event.target.textContent);
  //   clickedItemValue = event.target.textContent;
  // }

  const universitiesList: University[] = !Array.isArray(universities)
    ? Object.values(universities)
    : universities;
  const options = universitiesList.map((university) => {
    return (
      <OptionUniversity
        key={university.id}
        value={university.name}
        studentsCount={university.studentsCount}
        onUniversityClicked={onGetItemValue}
      />
    );
  });
  return options;
}
