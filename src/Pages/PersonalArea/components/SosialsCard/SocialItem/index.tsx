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

  const [Value, setValue] = useState("");
  const [editing, setEditing] = useState(false);

    if (socialValue) {
      console.log(socialValue)
    return <Item title={title} itemData={socialValue} />;
  }

  return (
    <div className="social-item">
      {editing ? (
        <SocialsInput
          value={Value}
          onChange={(changedVal: string) => {
            setValue(changedVal);
          }}
          title={title}
          placeholder="katerin___a"
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
