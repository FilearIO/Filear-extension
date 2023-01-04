import React from 'react'

import style from './style.module.scss'

const Header: React.FC = () => {
  return <header className={style.header}>{APP_NAME}</header>
}

export default Header
