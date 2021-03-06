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
  onClickedItemValue:  Function
};

export function OptionUniversity(props: UniversityProps) {
  const {value,  studentsCount, onClickedItemValue} = props;

  return (
    <div className="option" onClick={() => {
      onClickedItemValue(value)
      console.log("clicked")
    }}>
      <span className="text">{props.value}</span>
      <span className="count-block">
        <span className="icon">🎓</span>
        <span className="count">{studentsCount}</span>
      </span>
    </div>
  );
}
