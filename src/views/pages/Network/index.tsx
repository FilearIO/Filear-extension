import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Toast } from '@views/cravis'

import { ROUTES } from '@views/constants'
import { ReturnLayout } from '@views/components/Layout'
import { AppDispatch } from '@views/store'
import { currentNetworkSelector, fetchNetworkList, fetchChangeNetwork, networkListSelector } from '@views/store/network'
import useTrans from '@views/i18n/useTrans'

// import AddNetwork from './AddNetwork'
import NetworkItem from './NetworkItem'

import style from './style.module.scss'

const Network: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { t } = useTrans()
  const curNetwork = useSelector(currentNetworkSelector)
  const networkList = useSelector(networkListSelector)

  useEffect(() => {
    void dispatch(fetchNetworkList())
  }, [])

  const onClick = async (id: number): Promise<void> => {
    if (id === curNetwork.id) return

    await dispatch(fetchChangeNetwork(id))
    Toast.success({ message: t('networkSuccessToast') })
    navigate(`${ROUTES.ROOT}${ROUTES.HOME}`)
  }

  return (
    <ReturnLayout>
      <div className={style.neetwork}>
        {networkList.map(network => (
          <NetworkItem key={network.id} network={network} onClick={onClick} />
        ))}
        {/* <AddNetwork /> */}
      </div>
    </ReturnLayout>
  )
}

export default Network
