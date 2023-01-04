import React from 'react'

import { ArrowIcon } from '@views/cravis/Icons'
import useTrans from '@views/i18n/useTrans'

import style from './returnLayout.module.scss'

interface WelcomeLayoutProps {
  hideReturn?: boolean
  children: React.ReactNode
}

const ReturnLayout: React.FC<WelcomeLayoutProps> = ({ hideReturn = false, children }) => {
  const { t } = useTrans()

  const onBack = (): void => {
    history.back()
  }

  return (
    <div className={style.layout}>
      {!hideReturn && (
        <div className={style.arrow} onClick={onBack}>
          <span>
            <ArrowIcon size={20} />
          </span>
          {t('commonBack')}
        </div>
      )}
      {children}
    </div>
  )
}

export default ReturnLayout
