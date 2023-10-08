import React from 'react'

import Info from '../Info'
import Menu from '../Menu'

import style from './homelayout.module.scss'

interface HomeLayoutProps {
  hideMenu?: boolean
  children: React.ReactNode
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ hideMenu = false, children }) => {
  return (
    <div className={style.layout}>
      <Info />
      <div className={style.main}>{children}</div>
      {!hideMenu && <Menu />}
    </div>
  )
}

export default HomeLayout
