import React from 'react'

import { ReturnLayout } from '@views/components/Layout'

import ShowMnemonic from './ShowMnemonic'
import ShowKey from './ShowKey'

import style from './style.module.scss'

const Security: React.FC = () => {
  return (
    <ReturnLayout>
      <div className={style.main}>
        <ShowMnemonic />
        <ShowKey />
      </div>
    </ReturnLayout>
  )
}

export default Security
