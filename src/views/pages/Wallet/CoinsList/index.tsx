import React from 'react'
import CoinItem from './CoinItem'

import style from './style.module.scss'

const CoinsList: React.FC = () => {
  return (
    <div className={style.coinsList}>
      <div>
        <CoinItem />
      </div>
    </div>
  )
}

export default CoinsList
