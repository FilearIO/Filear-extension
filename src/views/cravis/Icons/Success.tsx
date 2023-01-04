import React from 'react'

import type { IconProps } from './types'

const Success: React.FC<IconProps> = ({ classname, color, size = 32 }) => {
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
      <g id="sucess">
        <path
          id="Vector"
          d="M15 27.5C18.4518 27.5 21.5768 26.1009 23.8388 23.8388C26.1009 21.5768 27.5 18.4518 27.5 15C27.5 11.5483 26.1009 8.42325 23.8388 6.16116C21.5768 3.89911 18.4518 2.5 15 2.5C11.5483 2.5 8.42325 3.89911 6.16116 6.16116C3.89911 8.42325 2.5 11.5483 2.5 15C2.5 18.4518 3.89911 21.5768 6.16116 23.8388C8.42325 26.1009 11.5483 27.5 15 27.5Z"
          fill="currentColor"
        />
        <path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.8305 10.3158C21.3464 10.7744 21.3929 11.5645 20.9343 12.0805L14.2676 19.5805C14.0304 19.8473 13.6904 20 13.3333 20C12.9763 20 12.6363 19.8473 12.3991 19.5805L9.06575 15.8305C8.6071 15.3145 8.65358 14.5244 9.16956 14.0658C9.68554 13.6071 10.4756 13.6536 10.9343 14.1696L13.3333 16.8685L19.0658 10.4196C19.5244 9.90358 20.3145 9.8571 20.8305 10.3158Z"
          fill="white"
        />
      </g>
    </svg>
  )
}

export default React.memo(Success)
