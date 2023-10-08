import classNames from 'classnames'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@views/constants'
import { AddIcon, FilearIcon } from '@views/cravis/Icons'
import WelcomeHeader from '@views/components/WelcomeHeader'
import { MainCard } from '@views/components/Card'
import useTrans from '@views/i18n/useTrans'

import style from './style.module.scss'

const Welcome: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTrans()

  return (
    <MainCard className={style.main}>
      <div className={style.logo}>
        <FilearIcon />
      </div>
      <WelcomeHeader />
      <div className={style.tips}>{t('welcomeTips')}</div>
      <div className={style.content}>
        <div className={classNames(style.card, style.import)} onClick={() => navigate(ROUTES.IMPORT)}>
          <AddIcon color="#3772FF" />
          <div dangerouslySetInnerHTML={{ __html: t('welcomeImport') }} />
        </div>
        <div className={classNames(style.card, style.new)} onClick={() => navigate(ROUTES.CREATE)}>
          <AddIcon color="#B1B5C3" />
          <div dangerouslySetInnerHTML={{ __html: t('welcomeCreate') }} />
        </div>
      </div>
    </MainCard>
  )
}

export default Welcome
