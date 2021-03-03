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
  studentsCount: number;
  onUniversityClicked:  ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined
};

export function OptionUniversity(props: UniversityProps) {


  return (
    <div className="option" onClick={props.onUniversityClicked}>
      <span className="text">{props.value}</span>
      <span className="count-block">
        <span className="icon"> 🎓</span>
        <span className="count">{props.studentsCount}</span>
      </span>
    </div>
  );
}
