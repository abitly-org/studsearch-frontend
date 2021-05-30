import React, { useState } from "react";

import SocialItem from "./SocialItem";
import Item from "../Item";
import "./index.scss";
import {useTranslation} from "react-i18next";
import { Contacts } from "../../PersonalArea";

const Socials = {
  'telegram': 'Telegram',
  'facebook': 'Facebook',
  'instagram': 'Instagram',
  'linkedin': 'LinkedIn',
  // 'viber': 'Viber'
};

export default function SocialCard({
  contacts, setContacts, onSave
}: {
  contacts: Contacts,
  setContacts?: (newContacts: Contacts) => void,
  onSave?: (newContacts?: Contacts) => void
}) {

  const { t, i18n } = useTranslation();

  return (
    <div className="social-card">
      {
        Object.entries(Socials ?? {})
          .map(([name, displayName], key) =>
            name === 'telegram' || name === 'facebook' ?
              ( contacts?.[name] ? 
                <Item
                  title={`${t('cabinet-social-user-name')} ${displayName}`}
                  itemData={contacts?.[name] ?? ''}
                />
                :
                null
              )
              :
              <SocialItem
                name={displayName}
                social={name}
                value={contacts?.[name]}
                starter={({
                  'telegram': '@',
                  'instagram': '@',
                  // 'facebook': 'facebook.com/',
                  'linkedin': 'linkedin.com/in/'
                } as any)[name]}
                setValue={value => setContacts?.({ ...contacts, [name]: value })}
                onSave={onSave}
                remove={() => {
                  const newContacts = { ...contacts };
                  delete newContacts[name];
                  setContacts?.(newContacts);
                  onSave?.(newContacts);
                }}
                key={key}
              />
          )
      }
      {/* <SocialItem socialName="Telegram" socialValue={instagram} />
      <SocialItem socialName="Instagram" socialValue={instagram} />
      <SocialItem socialName="Linkedin" socialValue={linkedin} />
      <SocialItem socialName="Facebook" socialValue={facebook} />
      <SocialItem socialName="Viber" socialValue={viber} /> */}
    </div>
  );
}
