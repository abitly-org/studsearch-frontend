import React, { useState, useEffect } from "react";

import SocialItem from "./SocialItem";
import Item from "../Item";
import {
  SocialsData,
  fetchSocials,
  postSocials,
} from "../../../../Helpers/api";
import Spinner from "../../../../Components/LoadingSpinner";
import "./index.scss";
import { useTranslation } from "react-i18next";

interface SocialCardProps {}

export default function SocialCard(props: SocialCardProps) {
  const [socialsData, setSocialsData] = useState<SocialsData>();
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    fetchSocials(setSocialsData);
    return () => {};
  }, [update]);
  const { t, i18n } = useTranslation();

  return (
    <div className="social-card">
      {socialsData ? (
        <>
          <Item
              title={`${t('cabinet-social-user-name')} Telegram`}
              itemData={socialsData?.telegram}
          />
          <SocialItem
            socialName="Instagram"
            socialValue={socialsData?.instagram}
            onSubmit={(newValue) =>
              postSocials(socialsData, newValue, setUpdate)
            }
          />
          <SocialItem
            socialName="Linkedin"
            socialValue={socialsData?.linkedin}
            onSubmit={(newValue) =>
              postSocials(socialsData, newValue, setUpdate)
            }
          />
          <SocialItem
            socialName="Facebook"
            socialValue={socialsData?.facebook}
            onSubmit={(newValue) =>
              postSocials(socialsData, newValue, setUpdate)
            }
          />
          {/* <SocialItem socialName="Viber" socialValue={viber} /> */}
        </>
      ) : (
        <Spinner center-x center-y />
      )}
    </div>
  );
}


{/* const { t, i18n } = useTranslation();

  

  return (
    <div className="social-card">
      <Item title={`${t('cabinet-social-user-name')} Telegram`} itemData={props.telegramValue} />
      <SocialItem socialName="Instagram" socialValue={instagram} />
      <SocialItem socialName="Linkedin" socialValue={linkedin} />
      <SocialItem socialName="Facebook" socialValue={facebook} />
      <SocialItem socialName="Viber" socialValue={viber} />
>>>>>>> origin/registration
    </div>
  ); */}
