import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { H1, H3, H4, P1, P2 } from '../../Components/Text';
import Members from './Members/index';

import './index.scss';
import Button from '../../Components/Button';

const BlockTeam = () => {
  const { t } = useTranslation();

  return (
    <div className="BlockTeam">
      <H1>{t('block-team-header')}</H1>
      <div className="Members">
        {
          Members?.map?.((member, i) => 
            member ?
              <a
                key={i}
                className="Member"
                href={member?.link}
                target='_blank'
              >
                <img src={member?.photo} />
                <H4>{member?.name}</H4>
                <P1>{member?.role}</P1>
              </a>
              :
              <br />
          )
        }
      </div>
      <Button
        href='https://t.me/VladBandurin'
      >
        <P2>{t('block-team-join')}</P2>
      </Button>
    </div>
  )
}
export default BlockTeam;