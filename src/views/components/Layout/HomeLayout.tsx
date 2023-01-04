import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { openHomePage } from '@shared/borwser/open'
import { ROUTES } from '@views/constants'
import { accountSelector } from '@views/store/wallet'

import Info from '../Info'
import Menu from '../Menu'

import style from './homelayout.module.scss'

interface HomeLayoutProps {
  hideMenu?: boolean
  children: React.ReactNode
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ hideMenu = false, children }) => {
  const account = useSelector(accountSelector)

  useEffect(() => {
    if (account === undefined) {
      void openHomePage(ROUTES.WELCOME)
    }
  }, [])

  return account === undefined ? (
    <Navigate to={ROUTES.WELCOME} />
  ) : (
    <div className={style.layout}>
      <Info />
      <div className={style.main}>{children}</div>
      {!hideMenu && <Menu />}
    </div>
  )
}

export default HomeLayout
