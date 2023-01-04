import React from 'react'
import { ArrowIcon } from '@views/cravis/Icons'

import style from './style.module.scss'

interface ItemProps {
  icon: React.ReactElement
  text: string
  onClick: VoidFunction
}

const Item: React.FC<ItemProps> = ({ onClick, icon, text }) => {
  return (
    <div className={style.item} onClick={onClick}>
      <div className={style.left}>
        {icon}
        <span>{text}</span>
      </div>
      <div className={style.right}>
        <ArrowIcon size={16} />
      </div>
    </div>
  )
}

export default Item
