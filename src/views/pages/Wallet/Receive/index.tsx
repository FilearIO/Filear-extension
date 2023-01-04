import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { QRCodeSVG } from 'qrcode.react'

import { Button, Modal } from '@arshare/cravis'

import useTrans from '@views/i18n/useTrans'
import { accountSelector } from '@views/store/wallet'

import style from './style.module.scss'

const Receive: React.FC = () => {
  const { t } = useTrans()
  const account = useSelector(accountSelector)
  const [show, setShow] = useState(false)

  return (
    <>
      <Button className={style.receive} onClick={() => setShow(true)}>
        {t('walletReceive')}
      </Button>

      <Modal title={t('commonAddress')} show={show} onCancel={() => setShow(false)} width="70%">
        <div className={style.qrcode}>
          <QRCodeSVG size={192} value={account.address} />
          <Button className={style.close} onClick={() => setShow(false)}>
            {t('commonClose')}
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default Receive
