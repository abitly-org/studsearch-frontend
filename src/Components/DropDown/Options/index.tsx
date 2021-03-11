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

  return (
    <div
      className="option"
      onClick={() => {
        onClickedItemValue();
      }}
    >
      <span className="text">
        {code ? <span className="code">{`${code} `}</span> : null}
        {name ? <span className="value">{name}</span> : null}
        {title ? <span className="value">{title}</span> : null}
      </span>

      {studentsCount ? (
        <span className="icon">
          <img src={studImg} alt="icon" />
          <span>{studentsCount}</span>
        </span>
      ) : null}

      {universitiesCount ? (
        <span className="icon">
          <img src={universImg} alt="icon" />
          <span>{universitiesCount}</span>
        </span>
      ) : null}
    </div>
  );
}
