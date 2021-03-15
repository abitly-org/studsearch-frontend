import React from "react";
import "./index.scss";

import studImg from "./studico.svg";
import universImg from "./universico.svg";

type OptionProps = {
  name?: string;
  universitiesCount?: number | string;
  studentsCount?: number | string;
  code?: string;
  onClickedItemValue: Function;
  title?: string;
};

export default function OptionItem(props: OptionProps) {
  const {
    name,
    universitiesCount,
    studentsCount,
    code,
    onClickedItemValue,
    title,
  } = props;

  const optionTitle: string|undefined = code
    ? `${code} ${name}`
    : title
    ? title
    : name;

  return (
    <div
      className="option"
      onClick={() => {
        onClickedItemValue(optionTitle);
      }}
    >
      <span className="text">
        {code ? <span className="code">{`${code} `}</span> : null}
        {name ? <span className="value">{name}</span> : null}
        {title ? <span className="value">{title}</span> : null}
      </span>

      <div className="count-block">
        {studentsCount ? (
          <span className="icon">
            <img src={studImg} alt="icon" />
            <span className="count">{studentsCount}</span>
          </span>
        ) : null}

        {universitiesCount ? (
          <span className="icon">
            <img src={universImg} alt="icon" />
            <span className="count">{universitiesCount}</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}
