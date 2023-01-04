import React from 'react'

const ImgThumbnail: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="53" height="64" viewBox="0 0 53 64" fill="none">
      <path
        d="M3 0H35.0685L52.6027 16.6575V61C52.6027 62.6569 51.2596 64 49.6027 64H3C1.34315 64 0 62.6569 0 61V3C0 1.34315 1.34315 0 3 0Z"
        fill="#FFD166"
      />
      <path
        d="M52.6027 16.6575L35.0685 0V14.6575C35.0685 15.7621 35.9639 16.6575 37.0685 16.6575H52.6027Z"
        fill="#F1BB3E"
      />
      <circle cx="15.7808" cy="28.0547" r="3.50685" fill="white" />
      <path
        d="M12.7243 51.7264H42.9589L42.1854 33.9362C42.1469 33.0516 41.0624 32.6497 40.4568 33.2957L28.9315 45.5894L23.5384 38.6555C23.1526 38.1595 22.4103 38.138 21.9965 38.611L11.9717 50.0679C11.4059 50.7145 11.8651 51.7264 12.7243 51.7264Z"
        fill="white"
      />
    </svg>
  )
}

export default React.memo(ImgThumbnail)
