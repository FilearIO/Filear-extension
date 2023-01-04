import { shuffle } from 'lodash'
import classNames from 'classnames'
import React, { useMemo, useState } from 'react'

import { Button, ErrorText } from '@arshare/cravis'
import { useDecryptMnemonic } from '@views/hooks'
import useTrans from '@views/i18n/useTrans'

import style from './style.module.scss'

interface VerifyProps {
  password: string
  onNext: () => void
}

const Verify: React.FC<VerifyProps> = ({ password, onNext }) => {
  const { t } = useTrans()
  const { mnemonic } = useDecryptMnemonic(password)
  const mnemonicList = useMemo(() => mnemonic.split(' '), [mnemonic])
  const mnemonicShuffleList = useMemo(
    () => [shuffle(mnemonicList.slice(0, 4)), shuffle(mnemonicList.slice(4, 8)), shuffle(mnemonicList.slice(8, 12))],
    [mnemonicList],
  )
  const listItem = useMemo(
    () => [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4 + 4), Math.floor(Math.random() * 4 + 8)],
    [],
  )
  const [selected, setSelected] = useState<string[]>(['', '', ''])
  const [err, showErr] = useState(false)

  const onClick = (): void => {
    if (
      mnemonicList[listItem[0]] !== selected[0] ||
      mnemonicList[listItem[1]] !== selected[1] ||
      mnemonicList[listItem[2]] !== selected[2]
    ) {
      showErr(true)
      return
    }
    onNext?.()
  }

  const onSelect = (index: number, value: string) => () => {
    const newValue = [...selected]
    newValue.splice(index, 1, value)
    setSelected(newValue)
  }

  return (
    <div className={style.verify}>
      <div className={style.tips}>{t('createVerifyTips')}</div>
      <div className={style.main}>
        {[0, 1, 2].map(item => (
          <div className={style.row} key={item}>
            <div className={style.head}>
              {t('createVerifySelect')} <span>#{listItem[item] + 1}</span>
            </div>
            <div className={style.content}>
              {mnemonicShuffleList[item].map((word, index) => (
                <span
                  className={classNames({ [style.selected]: selected[item] === word })}
                  key={word}
                  onClick={onSelect(item, word)}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={style.error}>{err && <ErrorText>{t('createVerifyError')}</ErrorText>}</div>
      <Button size="medium" className={style.confirm} onClick={onClick}>
        {t('commonNext')}
      </Button>
    </div>
  )
}

export default Verify
