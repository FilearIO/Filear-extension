import React from 'react'

import { MainCard } from '@views/components/Card'
import useTrans from '@views/i18n/useTrans'

import welcomeSuccessPng from '@views/images/welcome_success.png'

import style from './style.module.scss'

const Success: React.FC = () => {
  const { t } = useTrans()

  return (
    <MainCard className={style.main}>
      <img src={welcomeSuccessPng} />
      <div className={style.title}>{t('welcomeSuccess')}</div>
      <div className={style.tips}>{t('welcomeSuccessTips')}</div>
    </MainCard>
  )
}

export default Success
