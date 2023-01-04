import React from 'react'

import type { IconProps } from './types'

const Info: React.FC<IconProps> = ({ classname, color, size = 32 }) => {
  return (
    <svg
      className={classname}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M15.0076 2.50488C21.9126 2.50488 27.5101 8.10244 27.5101 15.0074C27.5101 21.9123 21.9126 27.5099 15.0076 27.5099C8.10269 27.5099 2.50513 21.9123 2.50513 15.0074C2.50513 8.10244 8.10269 2.50488 15.0076 2.50488Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5284 9.31705C13.5284 8.48638 14.2018 7.81299 15.0325 7.81299C15.8632 7.81299 16.5366 8.48638 16.5366 9.31705C16.5366 10.1477 15.8632 10.8211 15.0325 10.8211C14.2018 10.8211 13.5284 10.1477 13.5284 9.31705ZM16.2858 20.8481C16.2858 21.5403 15.7247 22.1015 15.0324 22.1015C14.3402 22.1015 13.779 21.5403 13.779 20.8481V13.3278C13.779 12.6356 14.3402 12.0744 15.0324 12.0744C15.7247 12.0744 16.2858 12.6356 16.2858 13.3278V20.8481Z"
        fill="white"
      />
    </svg>
  )
}

export default React.memo(Info)
