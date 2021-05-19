import React, { useState } from "react";
import Button from "../../../../Components/Button";

import { getStudents } from "../../../../Helpers/api";

import "./index.scss";
import {useTranslation} from "react-i18next";

type ChildrenType = {
  title: string;
  imgSrc: string;
  edited?: boolean;
  children: ((editing: boolean) => React.ReactNode) | React.ReactNode;

  onSave?: () => void | Promise<void>;
};

export default function CardWrapper(props: ChildrenType) {
  const { i18n, t } = useTranslation();

  const [state, setState] = useState({ editing: false });

  const { title, children, imgSrc: img, onSave, edited = true } = props;
  return (
    <div className="card-outer">
      <div className="card-wrapper">
        <div className="card-header">
          <div className="title-block">
            <img src={img} alt="ico" />
            <span className="card-title">{title}</span>
          </div>
          {!state.editing && edited ? (
            <span
              className="edit-btn"
              onClick={() => {
                setState({ editing: true });
              }}
            >
              {t('cabinet-edit')}
            </span>
          ) : null}
        </div>
        { typeof children === 'function' ?
            children?.(state.editing) :
            children
        }
        { state.editing ? (
          <div className="btn-group">
            <Button
              children={t('cabinet-cancel')}
              outline={true}
              onClick={async () => {
                setState({ editing: false });
              }}
            />
            <Button
              children={t('cabinet-save')}
              onClick={async () => {
                const p = onSave?.();
                if (p instanceof Promise)
                  await p;
                setState({ editing: false });
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
