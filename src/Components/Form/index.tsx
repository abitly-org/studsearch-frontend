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

import { UniversityDropDown } from "../DropDown";

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

type IFormProps = {};

export default class Form extends Component<IFormProps, IFormState> {
  constructor(props: IForm) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.setUniversities = this.setUniversities.bind(this);

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

  // handleChange(event: { target: { value: any } }) {
  //   console.log(event.target.value);
  //    this.setState({ nameValue: event.target.value });
  // }

  // setUniversities() {
  //   getUniversities().then((universities) => {});
  // }

  componentDidMount() {
    //  getRegions().then(regions => {
    //    console.log(regions)
    //  })
    getUniversities("", 1, 10, 0).then((universities) => {
      console.log("in setState", universities);

      this.setState({
        universities: universities,
      });
    });
  }

  render() {
    const { universities } = this.state;
    console.log("in form", universities);
    return (
      <>
        <div>
          <input
            name="name"
            type="text"
            className=" "
            placeholder="name"
            // onChange={this.handleChange}
          ></input>

          <input
            name="surname"
            type="text"
            className=" "
            placeholder="surname"
            // onChange={this.handleChange}
          ></input>
        </div>
        {UniversityDropDown(universities)}
      </>
    );
  }
}
