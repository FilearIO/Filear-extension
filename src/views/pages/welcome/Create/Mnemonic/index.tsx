import React from 'react'

import { Button } from '@arshare/cravis'

import { useCopyToClipBoard, useDecryptMnemonic } from '@views/hooks'
import useTrans from '@views/i18n/useTrans'

import style from './style.module.scss'

interface MnemonicProps {
  password: string
  onNext: React.MouseEventHandler<HTMLButtonElement>
}

const Mnemonic: React.FC<MnemonicProps> = ({ password, onNext }) => {
  const { t } = useTrans()
  const { mnemonic } = useDecryptMnemonic(password)
  const [copied, onCopy] = useCopyToClipBoard(mnemonic)

  return (
    <div className={style.mnemonic}>
      <div className={style.tips}>{t('createMnemonicTips')}</div>
      <div className={style.wrapper}>
        {mnemonic?.split(' ').map(word => (
          <span className={style.word} key={word}>
            {word}
          </span>
        ))}
      </div>
      <Button size="medium" pattern="primary" className={style.copy} onClick={onCopy}>
        {t('commonCopy')}
      </Button>
      <Button size="medium" className={style.confirm} disabled={!copied} onClick={onNext}>
        {t('commonNext')}
      </Button>
    </div>
  )
}

export default Mnemonic
