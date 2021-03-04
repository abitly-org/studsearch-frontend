import React, { useState, useEffect } from "react";
import {
  Courses,
  University,
  Region,
  Faculty,
  Speciality,
  getUniversities,
} from "../../Helpers/api";

import { OptionUniversity } from "../Options";

import "./index.scss";

import arrowImg from "./Vector.png";

type IUniversityProp = {};

export default function UniversityDropDown(props: IUniversityProp) {
  const [clazzName, toggleClassName] = useState("list-inactive");
  const [universities, setUniversities] = useState([
    { id: 0, name: "", studentsCount: 0 },
  ]);
  const [query, setQuery] = useState("");

  function onFocusDropdown() {
    getUniversities("", undefined, 50, 0).then((universities) => {
      setUniversities(universities);
      toggleClassName("list-active");
    });
  }

  function onBlurDropdown() {
    toggleClassName("list-inactive");
  }

  function onArrowClick() {
    if (clazzName === "list-inactive") {
      onFocusDropdown();
    } else {
      onBlurDropdown();
    }
  }
  function onClickedItemValue(value: string) {
    setQuery(value);
  }

  function onQueryChange(event: any) {
    getUniversities(event.target.value, undefined, 10, 0).then(
      (universities) => {
        setUniversities(universities);
      }
    );
    setQuery(event.target.value);
  }

  const dropdownItems = universities.map((university) => {
    const { id, name, studentsCount } = university;
    return (
      <OptionUniversity
        key={id}
        value={name}
        studentsCount={studentsCount}
        onClickedItemValue={onClickedItemValue}
      />
    );
  });

  return (
    <div className="dropdown">
      <div className="input-block">
        <input
          className="input"
          type="text"
          placeholder="Вищий навчальний заклад"
          value={query}
          onFocus={onFocusDropdown}
          onBlur={onBlurDropdown}
          onChange={onQueryChange}
        />
        <img
          src={arrowImg}
          alt="arrow"
          className="arrow"
          onClick={onArrowClick}
        />
      </div>
      <div className={`option-list ${clazzName}`}>{dropdownItems}</div>
    </div>
  );
}
