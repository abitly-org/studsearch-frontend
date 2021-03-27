import React, { useState } from "react";

import SocialsInput from "./SocialsInput";

export default function SocialCard() {
  const [value, setValue] = useState("");

  return (
    <>
      <SocialsInput
        value={value}
        onChange={(changedVal: string) => {
          setValue(changedVal);
        }}
        title="імя користувача у телеграм"
        placeholder="katerin___a"
      />
    </>
  );
}
