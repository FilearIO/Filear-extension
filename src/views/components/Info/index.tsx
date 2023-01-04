import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@views/constants'
import { useCopyToClipBoard } from '@views/hooks'
import { accountSelector } from '@views/store/wallet'

import Avatar from '../Avatar'

import style from './style.module.scss'

const Info: React.FC = () => {
  const navigate = useNavigate()
  const account = useSelector(accountSelector)
  const { onCopy } = useCopyToClipBoard(account?.address)

  const showAddress = useMemo(() => {
    if (account === undefined) {
      return ''
    }
    const address = account.address
    return address.substring(0, 8) + '...' + address.substring(address.length - 4)
  }, [account])

  return (
    <div className={style.info}>
      <div className={style.account} onClick={onCopy}>
        <Avatar />
        <span className={style.name}>{showAddress}</span>
      </div>
      {/* <span className={style.address} onClick={onCopy}>
        {showAddress}
      </span> */}
      <span className={style.network} onClick={() => navigate(`${ROUTES.ROOT}${ROUTES.NETWORK}`)}>
        network
      </span>
    </div>
  )
}

export default Info
