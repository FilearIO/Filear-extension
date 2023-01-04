import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { openExternalPage } from '@shared/borwser/open'
import { OFFICIAL_WEBSITE, OFFICIAL_TWITTER } from '@shared/constants'

import { WalletIcon, SecurityIcon, ComputerIcon, TwitterIcon } from '@views/cravis/Icons'

import { ROUTES } from '@views/constants'
import Avatar from '@views/components/Avatar'
import { HomeLayout } from '@views/components/Layout'
import useTrans from '@views/i18n/useTrans'

import { accountSelector } from '@views/store/wallet'

import Item from './Item'
import style from './style.module.scss'

const Settings: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTrans()
  const account = useSelector(accountSelector)

  return (
    <HomeLayout>
      <div className={style.main}>
        <div className={style.info}>
          <Avatar size={70} />
          <div className={style.name}>{account?.name}</div>
        </div>
        <div className={style.operate}>
          <Item icon={<WalletIcon color={'#936EFC'} size={24} />} text={t('settingWallet')} onClick={() => {}} />
          <Item
            icon={<SecurityIcon color={'#EF466F'} size={24} />}
            text={t('settingSecurity')}
            onClick={() => navigate(`${ROUTES.ROOT}${ROUTES.SECURITY}`)}
          />
        </div>
        <div className={style.operate}>
          <Item
            icon={<WalletIcon color={'#936EFC'} size={24} />}
            text={t('settingLock')}
            onClick={() => navigate(`${ROUTES.UNLOCK}`)}
          />
        </div>
        <div className={style.operate}>
          <Item
            icon={<ComputerIcon color={'#FFD166'} size={24} />}
            text={t('settingWebsite')}
            onClick={async () => await openExternalPage(OFFICIAL_WEBSITE)}
          />
          <Item
            icon={<TwitterIcon color={'#56E7CD'} size={24} />}
            text={'X(Twitter)'}
            onClick={async () => await openExternalPage(OFFICIAL_TWITTER)}
          />
          {/* <Item icon={<WalletIcon />} text={'Discord'} onClick={() => navigate(`${ROUTES.UNLOCK}`)} /> */}

          {/* <div onClick={() => navigate(`${ROUTES.ROOT}${ROUTES.PERMISSIONS}`)}>Permissions</div> */}
          {/* <div onClick={() => navigate(`${ROUTES.ROOT}${ROUTES.NETWORK}`)}>Network</div> */}
        </div>
        <div className={style.version}>Version {APP_VERSION}</div>
      </div>
    </HomeLayout>
  )
}

export default Settings
