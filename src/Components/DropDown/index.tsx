import React, { Component } from "react";
import {
  Courses,
  University,
  Region,
  Faculty,
  Speciality,
  getUniversities,
} from "../../Helpers/api";

import { setUniversitiesList } from "../OptionsList";

import "./index.scss";

import arrowImg from "./Vector.png";

export function RegionDropDown(props: Region[]) {}

type IUniversityState = {
  clazzName: string;
  universities: University[];
  query: string;
  itemValue: string;
};

type IUniversityProp = {
  // universities: University[];
  // query: string;
  // clickedItemValue: string;
};

export default class UniversityDropDown extends Component<
  IUniversityProp,
  IUniversityState
> {
  constructor(props: IUniversityProp) {
    super(props);
    this.state = {
      clazzName: "list-inactive",
      universities: [],
      query: "",
      itemValue: "",
    };
    this.onFocusDropdown = this.onFocusDropdown.bind(this);
    this.onBlurDropdown = this.onBlurDropdown.bind(this);
    this.onArrowClick = this.onArrowClick.bind(this);
    this.onClickedItemValue = this.onClickedItemValue.bind(this);
  }

  componentDidMount() {
    getUniversities("льо", 2, 10, 0).then((universities) => {
      this.setState({
        universities: universities,
      });
    });
  }
  onFocusDropdown() {
    this.setState({
      clazzName: "list-active",
    });
  }

  onBlurDropdown() {
    // this.setState({
    //   clazzName: "list-inactive",
    // });
  }

  onArrowClick() {
    // if (this.state.clazzName === "list-inactive") {
    //   this.onFocusDropdown();
    // } else {
    //   this.onBlurDropdown();
    // }
  }
  onClickedItemValue(event: any) {
    this.setState({
      itemValue: event.target.textContent,
    });
  }

  render() {
    const { universities, query } = this.state;

    // console.log("ClickedVal", this.state.itemValue)// remove

    return (
      <div className="dropdown">
        <div className="input-block">
          <input
            className="input"
            type="text"
            placeholder="Вищий навчальний заклад"
            defaultValue={this.state.itemValue}
            onFocus={this.onFocusDropdown}
            onBlur={this.onBlurDropdown}
          />
          <img
            src={arrowImg}
            alt="arrow"
            className="arrow"
            onClick={this.onArrowClick}
          />
        </div>

        <div className={`option-list ${this.state.clazzName}`}>
          {setUniversitiesList(universities, query, this.onClickedItemValue)}
        </div>
      </div>
    );
  }
}

export function FacultyDropDown(props: Faculty[]) {}

export function SpecialityDropDown(props: Speciality[]) {}

export function CourseDropDown() {}
