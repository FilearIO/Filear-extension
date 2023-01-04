import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@views/cravis'
import { HomeLayout } from '@views/components/Layout'
import { ROUTES } from '@views/constants'
import useTrans from '@views/i18n/useTrans'
import { AppDispatch } from '@views/store'
import { getPrice, priceSelector } from '@views/store/price'
import { accountSelector, balanceSelector, fetchGetBalance } from '@views/store/wallet'
import { formatQuantity } from '@views/utils/fromat'

import Receive from './Receive'
import CoinsList from './CoinsList'

import style from './style.module.scss'

const Wallet: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTrans()
  const account = useSelector(accountSelector)
  const dispatch = useDispatch<AppDispatch>()
  const balance = useSelector(balanceSelector)
  const price = useSelector(priceSelector)

  useEffect(() => {
    if (account === undefined) return
    void dispatch(fetchGetBalance())
    void dispatch(getPrice())
  }, [account])
  return (
    <HomeLayout>
      <div className={style.main}>
        <div className={style.balanceWrapper}>
          <div className={style.balance}>
            {formatQuantity(parseFloat(balance))}
            <span>&nbsp;AR</span>
          </div>
          <div className={style.value}>
            {`$ ${formatQuantity(parseFloat(balance) * price)}`}
            <span>&nbsp;USD</span>
          </div>
          <div className={style.actions}>
            <Receive />
            <Button className={style.send} onClick={() => navigate(`${ROUTES.ROOT}${ROUTES.SEND}`)}>
              {t('walletSend')}
            </Button>
          </div>
        </div>
        <CoinsList />
      </div>
    </HomeLayout>
  )
}

export default Wallet
