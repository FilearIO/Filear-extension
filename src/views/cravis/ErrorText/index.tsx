import classNames from 'classnames'
import React from 'react'

import style from './style.module.scss'

interface ErrorTextProps {
  className?: string
  children: React.ReactNode
}

const ErrorText: React.FC<ErrorTextProps> = ({ className, children }) => {
  return <div className={classNames(style.error, className)}>{children}</div>
}

export default ErrorText
