import React from 'react'
import { useSelector } from 'react-redux'

import { openExternalPage } from '@shared/borwser/open'

import { HomeLayout } from '@views/components/Layout'
import useTrans from '@views/i18n/useTrans'
import underDevelopPng from '@views/images/under_develop.png'
import { accountSelector } from '@views/store/wallet'

import style from './style.module.scss'

const History: React.FC = () => {
  const { t } = useTrans()
  const account = useSelector(accountSelector)

  const onClick = (): void => {
    if (account !== undefined) {
      void openExternalPage(`https://viewblock.io/arweave/address/${account.address}`)
      return
    }
    void openExternalPage(`https://viewblock.io/arweave`)
  }

  return (
    <HomeLayout>
      <div className={style.main}>
        <img src={underDevelopPng} />
        <div className={style.title}>{t('historyTitle')}</div>
        <div className={style.desc} onClick={onClick}>
          {t('historyTips')}
        </div>
      </div>
    </HomeLayout>
  )
}

export default History
