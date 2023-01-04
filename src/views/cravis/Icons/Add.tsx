import React from 'react'

import type { IconProps } from './types'

const Add: React.FC<IconProps> = ({ classname, color, size = 32 }) => {
  return (
    <svg
      className={classname}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <circle cx="16" cy="16" r="16" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 11C17 10.4477 16.5523 10 16 10C15.4477 10 15 10.4477 15 11V15H11C10.4477 15 10 15.4477 10 16C10 16.5523 10.4477 17 11 17H15V21C15 21.5523 15.4477 22 16 22C16.5523 22 17 21.5523 17 21V17H21C21.5523 17 22 16.5523 22 16C22 15.4477 21.5523 15 21 15H17V11Z"
        fill="#F5F5F5"
      />
    </svg>
  )
}

export default React.memo(Add)
