import React from 'react'

import type { IconProps } from './types'

const File: React.FC<IconProps> = ({ classname, size = 24 }) => {
  return (
    <svg
      className={classname}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 2H3V7H21V2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M21 9.5H3V14.5H21V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M21 17H3V22H21V17Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10.5 4.5H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 19.5H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default React.memo(File)
