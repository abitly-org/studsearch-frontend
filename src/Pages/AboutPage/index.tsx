import * as React from 'react';
import { Helmet } from 'react-helmet';

import BlockAbout from '../../Blocks/About';
import BlockTeam from '../../Blocks/Team';
import BlockStats from '../../Blocks/Stats';

import './index.scss';

import { useTranslation } from 'react-i18next';
import useTitle from '../../Helpers/useTitle';

const AboutPage = () => {
  const { t } = useTranslation();
  useTitle(t('title') + ' — ' + t('title-about'));

  return (
    <div className="AboutPage">
      {/* <Helmet>
        <title>StudSearch — Про нас</title>
        <meta name="title" content="StudSearch — Про нас" />
        <meta property="og:title" content="StudSearch — Про нас" />
        <meta name="twitter:title" content="StudSearch — Про нас" />
      </Helmet> */}
      <div className="Content">
        <BlockAbout />
        <BlockStats />
        <BlockTeam />
      </div>
    </div>
  )
}

export default AboutPage;