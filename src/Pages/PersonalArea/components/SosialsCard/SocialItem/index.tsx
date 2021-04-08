import React, { useState } from "react";
import SocialsInput from "../SocialsInput";
import {SocialsData} from "../../../../../Helpers/api"
import "./index.scss";

interface SocialItemProps {
  socialName: string;
  socialValue: string | undefined;
  onSubmit: (newValue: SocialsData)=>void
}

export default function SocialInput(props: SocialItemProps) {
  const { socialName, socialValue, onSubmit } = props;

  const [value, setValue] = useState(socialValue);
  const [editing, setEditing] = useState(socialValue !== undefined);
  const [sosialValue, setSosialValue] = useState("");

  return (
    <div className="social-item">
      {editing ? (
        <SocialsInput
          value={value}
          editingHandler={setEditing}
          onChange={(changedVal: string) => {
            setValue(changedVal);
          }}
          title={socialName}
          placeholder={`${socialName}`}
          onSubmit={onSubmit}
        />
      ) : (
        <div
          className="edit-item"
          onClick={() => {
            setEditing(true);
          }}
        >
          <div className="add-btn" />
          {`Додати ${socialName}`}
        </div>
      )}
    </div>
  );
}
