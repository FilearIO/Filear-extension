import React from 'react'

import type { IconProps } from './types'

const Network: React.FC<IconProps> = ({ classname, color, size = 32 }) => {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 29.3332C23.3638 29.3332 29.3333 23.3636 29.3333 15.9998C29.3333 8.63604 23.3638 2.6665 16 2.6665C8.63619 2.6665 2.66666 8.63604 2.66666 15.9998C2.66666 23.3636 8.63619 29.3332 16 29.3332Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66666 16H29.3333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 29.3332C18.9455 29.3332 21.3333 23.3636 21.3333 15.9998C21.3333 8.63604 18.9455 2.6665 16 2.6665C13.0545 2.6665 10.6667 8.63604 10.6667 15.9998C10.6667 23.3636 13.0545 29.3332 16 29.3332Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.57193 6.76123C8.98479 9.1741 12.3181 10.6665 16 10.6665C19.6819 10.6665 23.0153 9.1741 25.4281 6.76123"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.4281 25.2388C23.0153 22.8259 19.6819 21.3335 16 21.3335C12.3181 21.3335 8.98479 22.8259 6.57193 25.2388"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default React.memo(Network)
