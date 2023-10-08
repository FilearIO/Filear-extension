import React from 'react'
import { FilearIcon } from '@arshare/cravis/Icons'

import style from './style.module.scss'

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <i className={style.logo}>
        <FilearIcon size={28} />
      </i>
      {APP_NAME}
    </header>
  )
}

export default Header
