import React from 'react'

import type { IconProps } from './types'

const Arrow: React.FC<IconProps> = ({ classname, color, size = 32 }) => {
  return (
    <svg
      className={classname}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.07107 15.1424L14.1421 8.07129L7.07107 1.00022"
        stroke="#B1B5C4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default React.memo(Arrow)
