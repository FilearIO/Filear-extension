import React from 'react'

import type { IconProps } from './types'

const Edit: React.FC<IconProps> = ({ classname, color, size = 32 }) => {
  return (
    <svg
      className={classname}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M8.30435 1.52197H2C1.44771 1.52197 1 1.96969 1 2.52197V12.0002C1 12.5525 1.44772 13.0002 2 13.0002H11.4783C12.0305 13.0002 12.4783 12.5525 12.4783 12.0002V6.21762"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M13 1L5.69565 8.30435" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

export default React.memo(Edit)
