import React from 'react'

import useTrans from '@views/i18n/useTrans'

import style from './style.module.scss'

const WelcomeHeader: React.FC = () => {
  const { t } = useTrans()
  return (
    <div className={style.head}>
      {t('welcomeTo')} <br /> <span>{APP_NAME}</span>
    </div>
  )
}

export default WelcomeHeader
