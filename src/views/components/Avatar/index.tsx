import classNames from 'classnames'
import React from 'react'

import Example1 from './Example1'

import style from './style.module.scss'

interface AvatarProps {
  className?: string
  size?: number
}

const Avatar: React.FC<AvatarProps> = ({ className, size }) => {
  return (
    <div className={classNames(style.avatar, className)}>
      <Example1 size={size} />
    </div>
  )
}

export default Avatar
