import React, { useState } from 'react'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'

import { Button, Input, ErrorText } from '@arshare/cravis'
import useTrans from '@views/i18n/useTrans'

import style from './style.module.scss'

interface MnemonicProps {
  onNext: (mnemonic: string) => void
}

const defaultValue = new Array(12).fill('')

const Mnemonic: React.FC<MnemonicProps> = ({ onNext }) => {
  const { t } = useTrans()
  const [mnemonicList, setMnemonicList] = useState(defaultValue)
  const [error, setError] = useState(false)

  const onClick = (): void => {
    if (!bip39.validateMnemonic(mnemonicList.join(' '), wordlist)) {
      setError(true)
      return
    }
    setError(false)
    onNext?.(mnemonicList.join(' '))
  }

  const onChangeWord = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMnemonic = [...mnemonicList]
    newMnemonic.splice(index, 1, e.target.value)
    setMnemonicList(newMnemonic)
  }

  const onPaste = (index: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
    try {
      const items = e.clipboardData.items
      if (items.length === 0) return
      e.preventDefault()
      const item = items[0]
      if (item.kind === 'string') {
        item.getAsString(data => {
          const copyMnemonic = data.split(' ')
          if (copyMnemonic.length === 1) {
            const newMnemonic = [...mnemonicList]
            newMnemonic.splice(index, 1, copyMnemonic)
            setMnemonicList(newMnemonic)
          }
          if (copyMnemonic.length === 12) {
            setMnemonicList(copyMnemonic)
          }
        })
      }
    } catch {
      //
    }
  }

  return (
    <div className={style.mnemonic}>
      <div className={style.tips}>{t('importMnemonicTips')}</div>
      <div className={style.flex}>
        {mnemonicList.map((word, i) => (
          <div className={style.inputWarpper} key={i}>
            <Input value={word} onChange={onChangeWord(i)} onPaste={onPaste(i)} placeholder={`word ${i}`} />
          </div>
        ))}
      </div>
      <div className={style.error}>{error && <ErrorText>{t('importMnemonicError')}</ErrorText>}</div>
      <Button className={style.confirm} size="medium" onClick={onClick}>
        {t('commonNext')}
      </Button>
    </div>
  )
}

export default Mnemonic
