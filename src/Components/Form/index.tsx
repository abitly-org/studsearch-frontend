/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from "react";
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
  DataSource,
} from "..//..//Helpers/api";

import UniversityDropDown from "../DropDown";

type IFormState = {
  values: {
    nameValue: string;
    surnameValue: string;
    regionValue: string;
    facultyValue: string;
    specialtiesValue: string;
    courseValue: string;
  };

  universities: University[];
  faculty: string[];
  specialties: string[];
  regions: string[];
  courses: string[];
};

type IFormProps = {
  
};

export default class Form extends Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    this.state = {
      values: {
        nameValue: "",
        surnameValue: "",
        regionValue: "",
        facultyValue: "",
        specialtiesValue: "",
        courseValue: "",
      },
      regions: [],
      universities: [],
      faculty: [],
      specialties: [],
      courses: [],
    };
  }

  

  render() {
      return (
      <>
        <div>
          <input
            name="name"
            type="text"
            className=" "
            placeholder="name"
            
          ></input>

          <input
            name="surname"
            type="text"
            className=" "
            placeholder="surname"
            
          ></input>
        </div>
          <UniversityDropDown />
      </>
    );
  }
}
