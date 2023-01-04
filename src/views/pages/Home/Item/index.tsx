import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { type TransactionEdge } from '@shared/interface'
import { openExternalPage } from '@shared/borwser/open'

import { currentNetworkSelector } from '@views/store/network'
import { formatImageUrl, formatFileSize, formatTime } from '@views/utils/fromat'

import Thumbnail from './Thumbnail'

import style from './style.module.scss'

interface ItemProps {
  item: TransactionEdge
  index?: number
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const { node } = item
  const networkInfo = useSelector(currentNetworkSelector)

  const url = useMemo(() => formatImageUrl(networkInfo?.url, node.id), [networkInfo, node])

  const tagMap = useMemo(() => {
    const map: Record<string, string> = {}
    node.tags.forEach(item => (map[item.name] = item.value))
    return map
  }, [node.tags])

  return (
    <div className={style.item} onClick={async () => await openExternalPage(url)}>
      <Thumbnail url={url} item={item} />
      <div className={style.content}>
        <div className={style.title}>{tagMap.Title}</div>
        <div className={style.desc}>{tagMap.Description}</div>
        <div className={style.more}>
          <span>{formatFileSize(Number(node.data.size))}</span>
          <span>{formatTime(Number(tagMap['Unix-Time']))}</span>
        </div>
      </div>
    </div>
  )
}

export default Item
