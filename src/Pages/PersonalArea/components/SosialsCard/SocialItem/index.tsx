import React, { useState } from "react";
import SocialsInput from "../SocialsInput";
import Item from "../../Item";

import "./index.scss";
import {useTranslation} from "react-i18next";

interface SocialItemProps {
  name: string;
  starter?: string;
  value: string | null;
  setValue?: (newValue: string) => void;
  onSave?: () => void;
  remove?: () => void;
}

export default function SocialInput({ name, starter, value, setValue, remove, onSave }: SocialItemProps) {
  const { t, i18n } = useTranslation();

  const title = `${t('cabinet-social-user-name')} ${name}`;

  const [editing, setEditing] = useState(!!value);
  React.useEffect(() => {
    if (value)
      setEditing(true)
  }, [ value ]);
  
  return (
    <div className="social-item">
      {editing ? (
        <SocialsInput
          value={value ?? ''}
          editingHandler={setEditing}
          onChange={setValue}
          title={title}
          placeholder={name}
          onSave={onSave}
          starter={starter}
          onRemove={() => {
            remove?.();
            setEditing(false);
          }}
        />
      ) : (
        <div
          className="edit-item"
          onClick={() => {
            setEditing(true);
          }}
        >
          <div className="add-btn" />
          {`${t('cabinet-social-user-name-add')} ${name}`}
        </div>
      )}
    </div>
  );
}
