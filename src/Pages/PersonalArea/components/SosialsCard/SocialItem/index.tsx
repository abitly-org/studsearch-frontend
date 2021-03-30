import React, { useState } from "react";
import SocialsInput from "../SocialsInput";
import Item from "../../Item";

import "./index.scss";

interface SocialItemProps {
  socialName: string;
  socialValue: string | null;
}

export default function SocialInput(props: SocialItemProps) {
  const { socialName, socialValue } = props;

  const title = `імя користувача у ${socialName}`;

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
          {`Додати ${socialName}`}
        </div>
      )}
    </div>
  );
}
