import React, { useState } from "react";

import SocialItem from "./SocialItem";
import Item from "../Item";
import "./index.scss";
import {useTranslation} from "react-i18next";

interface SocialCardProps{
  telegramValue: string;
}

export default function SocialCard(props: SocialCardProps) {

    const { t, i18n } = useTranslation();

  const [instagram, setInstagram] = useState(null);
  const [linkedin, setLinkedin] = useState(null);
  const [facebook, setFacebook] = useState(null)
  const [viber, setViber] = useState(null);

  return (
    <div className="social-card">
      <Item title={`${t('cabinet-social-user-name')} Telegram`} itemData={props.telegramValue} />
      <SocialItem socialName="Instagram" socialValue={instagram} />
      <SocialItem socialName="Linkedin" socialValue={linkedin} />
      <SocialItem socialName="Facebook" socialValue={facebook} />
      <SocialItem socialName="Viber" socialValue={viber} />
    </div>
  );
}
