import React from "react";

import SocialItem from "./SocialItem";
import "./index.scss";

export default function SocialCard() {
  return (
    <div className="social-card">
      <SocialItem socialName="Telegram" socialValue={"Malyutina14"} />
      <SocialItem socialName="Instagram" socialValue={null} />
      <SocialItem socialName="Linkedin" socialValue={null} />
      <SocialItem socialName="Facebook" socialValue={null} />
      <SocialItem socialName="Viber" socialValue={null} />
    </div>
  );
}
