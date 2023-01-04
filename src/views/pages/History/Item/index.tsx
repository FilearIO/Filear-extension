import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Transaction } from '@shared/interface'
import { accountSelector } from '@views/store/wallet'
import { formatTime, formatFileSize } from '@views/utils/fromat'

import style from './style.module.scss'

interface Props {
  transaction: Transaction
}

const TransferItem: React.FC<Props> = ({ transaction }) => {
  const { recipient, owner, quantity, block } = transaction
  const account = useSelector(accountSelector)

  const time = useMemo(() => {
    if (block === undefined || block === null) return ''
    return formatTime(block.timestamp)
  }, [block])

  return (
    <div className={style.content}>
      <div className={style.left}>
        <span className={style.app}>{recipient === account?.address ? 'Receive' : 'Send'}</span>
        <span className={style.address}>
          {recipient === account?.address ? `From ${owner.address}` : `To ${recipient}`}
        </span>
      </div>
      <div className={style.right}>
        <span className={style.text}>{`${quantity.ar.replace(/(0+)$/g, '')} AR`}</span>
        <span className={style.date}>{time}</span>
      </div>
    </div>
  )
}

const AppItem: React.FC<Props> = ({ transaction }) => {
  const { data, block, tags } = transaction

  const app = useMemo(() => tags.find(tag => tag.name === 'App-Name')?.value, [tags])

  const time = useMemo(() => {
    if (block === undefined || block === null) return ''
    return formatTime(block.timestamp)
  }, [block])
  return (
    <div className={style.content}>
      <div className={style.left}>
        <span className={style.app}>{app}</span>
        <span className={style.address}>{'www.arweave.com'}</span>
      </div>
      <div className={style.right}>
        <span className={style.text}>{formatFileSize(Number(data.size))}</span>
        <span className={style.date}>{time}</span>
      </div>
    </div>
  )
}

const Item: React.FC<Props> = ({ transaction }) => {
  return (
    <div className={style.item}>
      {transaction.recipient === '' ? (
        <AppItem transaction={transaction} />
      ) : (
        <TransferItem transaction={transaction} />
      )}
    </div>
  )
}

export default Item
