import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { openHomePage } from '@shared/borwser/open'

import { ROUTES } from '@views/constants'
import { useCheckLock } from '@views/hooks'
import { AppDispatch } from '@views/store'
import { fetchNetworkList, fetchCurrentNetwork } from '@views/store/network'
import { accountSelector } from '@views/store/wallet'

interface InitialProps {
  children: React.ReactNode
}

const Initial: React.FC<InitialProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const account = useSelector(accountSelector)
  const { loading, locked } = useCheckLock()

  useEffect(() => {
    if (account === undefined) {
      void openHomePage(ROUTES.WELCOME)
      return
    }
    if (!loading && locked) {
      navigate(ROUTES.UNLOCK)
    }
  }, [account, loading, locked])

  useEffect(() => {
    async function init(): Promise<void> {
      await Promise.all([dispatch(fetchNetworkList()), dispatch(fetchCurrentNetwork())])
    }
    if (!loading && !locked) {
      void init()
    }
  }, [loading, locked])

  return <>{!loading && !locked && children}</>
}

export default Initial
