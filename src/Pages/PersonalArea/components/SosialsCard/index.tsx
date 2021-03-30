import React, { useState } from "react";

import SocialItem from "./SocialItem";
import Item from "../Item";
import "./index.scss";

interface SocialCardProps{
  telegramValue: string;
}

export default function SocialCard(props: SocialCardProps) {
  
  
  
  const [instagram, setInstagram] = useState(null);
  const [linkedin, setLinkedin] = useState(null);
  const [facebook, setFacebook] = useState(null)
  const [viber, setViber] = useState(null);

  return (
    <div className="social-card">
      <Item title="імя користувача у Telegram" itemData={props.telegramValue} />
      <SocialItem socialName="Instagram" socialValue={instagram} />
      <SocialItem socialName="Linkedin" socialValue={linkedin} />
      <SocialItem socialName="Facebook" socialValue={facebook} />
      <SocialItem socialName="Viber" socialValue={viber} />
    </div>
  );
}
