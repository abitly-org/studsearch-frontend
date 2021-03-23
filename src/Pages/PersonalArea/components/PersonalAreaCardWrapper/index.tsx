import React, { useState } from "react";
import Button from "../../../../Components/Button";

import "./index.scss";

type ChildrenType = {
  title: string;
  imgSrc: string;
  children: (editing: boolean) => {};
};

export default function CardWrapper(props: ChildrenType) {
  const [state, setState] = useState({ editing: false });

  const { title, children, imgSrc: img } = props;
  return (
    <div className="card-outer">
      <div className="card-wrapper">
        <div className="card-header">
          <div className="title-block">
            <img src={img} alt="ico" />
            <span className="card-title">{title}</span>
          </div>
          {!state.editing ? (
            <span
              className="edit-btn"
              onClick={() => {
                setState({ editing: true });
              }}
            >
              Редагувати
            </span>
          ) : null}
        </div>

        {children(state.editing)}
        {state.editing ? (
          <div className="btn-group">
            <Button
              children={"Скасувати"}
              outline={true}
              onClick={() => {
                setState({ editing: false });
              }}
            />
            <Button children={"Зберегти"} onClick={() => {}} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
