import React from 'react'

import Header from '../Header'

import style from './welcomelayout.module.scss'

interface WelcomeLayoutProps {
  children: React.ReactNode
}

const WelcomeLayout: React.FC<WelcomeLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={style.layout}>{children}</div>
    </>
  )
}

export default WelcomeLayout
