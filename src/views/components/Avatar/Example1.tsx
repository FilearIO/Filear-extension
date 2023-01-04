import React from 'react'

interface Example1Props {
  size?: number
}

const Example1: React.FC<Example1Props> = ({ size = 28 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="14" fill="url(#paint0_linear_118_131)" />
      <defs>
        <linearGradient id="paint0_linear_118_131" x1="4.5" y1="4" x2="23" y2="24.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3772FF" />
          <stop offset="1" stopColor="#7B61FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Example1
