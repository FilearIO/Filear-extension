import React from 'react'
import { useSelector } from 'react-redux'

import { ArweaveIcon } from '@arshare/cravis/Icons'

import { priceSelector } from '@views/store/price'
import { balanceSelector } from '@views/store/wallet'
import { formatQuantity } from '@views/utils/fromat'

import style from './style.module.scss'

const CoinItem: React.FC = () => {
  const balance = useSelector(balanceSelector)
  const price = useSelector(priceSelector)

  return (
    <div className={style.coinItem}>
      <div className={style.left}>
        <div className={style.icon}>
          <ArweaveIcon />
        </div>
        <div className={style.info}>
          <div className={style.name}>Arweave</div>
          <div className={style.symbol}>AR</div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.quantity}>
          {formatQuantity(parseFloat(balance))}
          <span>&nbsp;AR</span>
        </div>
        <div className={style.amount}>{`$ ${formatQuantity(parseFloat(balance) * price)}`}</div>
      </div>
    </div>
  )
}

export default CoinItem
