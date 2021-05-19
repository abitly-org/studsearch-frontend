import * as React from 'react';

import BlockAbout from '../../Blocks/About';
import BlockTeam from '../../Blocks/Team';
import BlockStats from '../../Blocks/Stats';

import './index.scss';

const AboutPage = () => {

  return (
    <div className="AboutPage">
      <div className="Content">
        <BlockAbout />
        <BlockStats />
        <BlockTeam />
      </div>
    </div>
  )
}

export default AboutPage;