import React from 'react'

import type { IconProps } from './types'

const Wallet: React.FC<IconProps> = ({ classname, color, size = 24 }) => {
  return (
    <svg
      className={classname}
      color={color}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.991 5.98445L15.8923 2L18.1985 5.99445L8.991 5.98445Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 7C2 6.4477 2.44771 6 3 6H21C21.5523 6 22 6.4477 22 7V21C22 21.5523 21.5523 22 21 22H3C2.44771 22 2 21.5523 2 21V7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M17.625 16.5H22V11.5H17.625C16.1753 11.5 15 12.6193 15 14C15 15.3807 16.1753 16.5 17.625 16.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M22 8.25V20.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default React.memo(Wallet)
