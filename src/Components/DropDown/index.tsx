import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import classnames from "classnames";
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

const startUniversitiesValue: University[] = [];

export default function UniversityDropDown(props: IUniversityProp) {
  const [clazzName, toggleClassName] = useState("list-inactive");
  const [universities, setUniversities] = useState(startUniversitiesValue);
  const [query, setQuery] = useState("");
  // const [offcet.setOffset] = useState(0);

  const isBottom = useRef(false);
  const offset = useRef(0);

  const count = 10;

  let optionList: HTMLDivElement;

  useEffect(() => {
    // console.log("effect");
    getUniversities("", undefined, count, offset.current).then((universities) => {
      setUniversities(universities);
    });
   
  }, []);

  function onFocusDropdown() {
    // getUniversities("", undefined, count, offset.current).then((universities) => {
    //   setUniversities(universities);
    // });
    toggleClassName("list-active");
  }

  function onBlurDropdown() {
    setTimeout(() => {
      toggleClassName("list-inactive");
    },300)
    // toggleClassName("list-inactive");
  }

  function onArrowClick() {
    // if (clazzName === "list-inactive") {
    //   onFocusDropdown();
    // } else {
    //   onBlurDropdown();
    // }
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

  function onWheelScroll(event: React.WheelEvent) {
    dropdownListScroll();
  }

  function dropdownListScroll() {
    const { scrollTop, scrollHeight, clientHeight } = optionList;
    if (scrollHeight - scrollTop === clientHeight && !isBottom.current) {
     
      isBottom.current = true;
      offset.current += count;
      console.log(isBottom.current);
      console.log(offset.current);

      getUniversities(query, undefined, count, offset.current).then(
        (newUniversities) => {
          let currentUniversities: University[] = [];
          if (universities.length !== 0) {
            currentUniversities = [...universities, ...newUniversities];
          } else {
            currentUniversities = newUniversities;
          }
  
          console.log("Curr", currentUniversities);
          setUniversities(currentUniversities);
          isBottom.current = false;
        }
      );
    }
  }

  function setOptionListElement(element: HTMLDivElement) {
    optionList = element;
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
    <div className="dropdown" onWheel={onWheelScroll}>
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
      <div className={`option-list ${clazzName}`} ref={setOptionListElement}>
        {dropdownItems}
      </div>
    </div>
  );
}
