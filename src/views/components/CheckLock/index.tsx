import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@views/constants'
import { useCheckLock } from '@views/hooks'

interface CheckLockProps {
  children: React.ReactNode
}

const CheckLock: React.FC<CheckLockProps> = ({ children }) => {
  const navigate = useNavigate()
  const { locked } = useCheckLock()

  useEffect(() => {
    if (locked) {
      navigate(ROUTES.UNLOCK)
    }
  }, [locked])

  return <>{children}</>
}

export default CheckLock
