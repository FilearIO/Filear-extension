import classNames from 'classnames'
import React from 'react'

import style from './style.module.scss'

interface Props {
  className: string
  children: React.ReactNode
}

const MainCard: React.FC<Props> = ({ className, children }) => {
  return <div className={classNames(style.maincard, className)}>{children}</div>
}

export default MainCard
