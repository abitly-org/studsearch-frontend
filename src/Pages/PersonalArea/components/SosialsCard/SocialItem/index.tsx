import React, { useState } from "react";
import SocialsInput from "../SocialsInput";
import Item from "../../Item";

import "./index.scss";
import {useTranslation} from "react-i18next";

interface SocialItemProps {
  socialName: string;
  socialValue: string | null;
}

export default function SocialInput(props: SocialItemProps) {
  const { t, i18n } = useTranslation();

  const { socialName, socialValue } = props;

  const title = `${t('cabinet-social-user-name')} ${socialName}`;

  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(false);
  
  return (
    <div className="social-item">
      {editing ? (
        <SocialsInput
          value={value}
          editingHandler = {setEditing}
          onChange={(changedVal: string) => {
            setValue(changedVal);
          }}
          title={title}
          placeholder={`${socialName}` }
        />
      ) : (
        <div
          className="edit-item"
          onClick={() => {
            setEditing(true);
          }}
        >
          <div className="add-btn" />
          {`${t('cabinet-social-user-name-add')} ${socialName}`}
        </div>
      )}
    </div>
  );
}
