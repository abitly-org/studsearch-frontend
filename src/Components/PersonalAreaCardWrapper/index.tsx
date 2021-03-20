import React, { useState } from "react";

import "./index.scss";

type ChildrenType = {
  title: string;
  imgSrc: string;
  children: JSX.Element;
};

export default function CardWrapper(props: ChildrenType) {
  const [state, setState] = useState({ edited: false });

  const { title, children, imgSrc: img } = props;
  return (
    <div className="card-outer">
      <div className="card-wrapper">
        <div className="card-header">
          <div className="title-block">
            <img src={img} alt="ico" />
            <span className="card-title">{title}</span>
          </div>
          {!state.edited ? (
            <span
              className="edit-btn"
              onClick={() => {
                setState({ edited: true });
              }}
            >
              Редагувати
            </span>
          ) : null}
        </div>

        {children}
        {state.edited ? (
          <div className="btn-group">
            <button>Скасувати</button>
            <button>Зберегти</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
