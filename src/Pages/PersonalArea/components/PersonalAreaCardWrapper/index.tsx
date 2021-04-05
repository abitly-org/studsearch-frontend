import React, { useState } from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";

type CardWrapperType = {
  title: string;
  imgSrc: string;
  edited?: boolean;
  children: (editing: [boolean, React.Dispatch<React.SetStateAction<boolean>>]) => JSX.Element;
};

export default function CardWrapper(props: CardWrapperType) {
  const { title, children, imgSrc: img, edited = true } = props;

  const { i18n, t } = useTranslation();

  const useEditors = useState(false);
  const [editing, setEditing] = useEditors;

  return (
    <div className="card-outer">
      <div className="card-wrapper">
        <div className="card-header">
          <div className="title-block">
            <img src={img} alt="ico" />
            <span className="card-title">{title}</span>
          </div>
          {!editing && edited ? (
            <span
              className="edit-btn"
              onClick={() => {
                setEditing(true);
              }}
            >
              {t("cabinet-edit")}
            </span>
          ) : null}
        </div>

        {children(useEditors)}

        {/* {editing ? (
          <div className="btn-group">
            <Button
              children={t('cabinet-cancel')}
              outline={true}
              onClick={() => {
                setEditing(false );
              }}
            />
            <Button children={t('cabinet-save')} onClick={() => {}} />
          </div>
        ) : null} */}
      </div>
    </div>
  );
}
