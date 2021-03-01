import React from "react";
import "./index.scss";

type RegionProps = {
  value: string;
  imgSrc: string;
  universitiesCount: number;
};

export function OptionRegion(props: RegionProps) {
  return (
    <span className="option">
      <img src={props.imgSrc} alt="university" />
      <span className="count">{props.universitiesCount}</span>
    </span>
  );
}

type UniversityProps = {
  value: string;
  imgSrc: string;
  studentsCount: number;
};

export function OptionUniversity(props: UniversityProps) {
  return (
    <div className="option">
      <div>{props.value}</div>
      <div>
        {/* <img src={props.imgSrc} alt="university" /> */}
      
        <span> 🎓</span>
        <span className="count">{props.studentsCount}</span>
      </div>
    </div>
  );
}
