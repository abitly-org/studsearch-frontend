import React from "react";
import {
  Courses,
  University,
  Region,
  Faculty,
  Speciality,
} from "../../Helpers/api";

import { setUniversitiesList } from "../OptionsList";

import "./index.scss";

export function RegionDropDown(props: Region[]) {}

export function UniversityDropDown(props: University[]) {
  return (
    <div className="dropdown">
      <input
        className="input"
        type="text"
        placeholder="Вищий навчальний заклад"
      />
      <div className="option-list">{setUniversitiesList(props)}</div>
    </div>
  );
}
export function FacultyDropDown(props: Faculty[]) {}

export function SpecialityDropDown(props: Speciality[]) {}

export function CourseDropDown() {}
