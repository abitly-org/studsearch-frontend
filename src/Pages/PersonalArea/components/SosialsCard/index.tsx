import React, { useState } from "react";

import SocialItem from "./SocialItem";
import "./index.scss";

export default function SocialCard() {
  
  
  const [telegram, setTelegram] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [linkedin, setLinkedin] = useState(null);
  const [facebook, setFacebook] = useState(null)
  const [viber, setViber] = useState(null);

  return (
    <div className="social-card">
      <SocialItem socialName="Telegram" socialValue={"Malyutina14"} />
      <SocialItem socialName="Instagram" socialValue={instagram} />
      <SocialItem socialName="Linkedin" socialValue={linkedin} />
      <SocialItem socialName="Facebook" socialValue={facebook} />
      <SocialItem socialName="Viber" socialValue={viber} />
    </div>
  );
}
