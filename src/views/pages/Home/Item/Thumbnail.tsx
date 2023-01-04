import React, { useMemo } from 'react'

import { type TransactionEdge } from '@shared/interface'
import { ArweaveIcon } from '@views/cravis/Icons'
import { ImgThumbnail } from '@views/components/Thumbnail'

import style from './style.module.scss'

interface ThumbnailProps {
  url: string
  item: TransactionEdge
}

const PicShowSize = 200 * 1024

const Thumbnail: React.FC<ThumbnailProps> = ({ url, item }) => {
  const {
    node: { data },
  } = item

  const content = useMemo(() => {
    if ((data.type?.includes('image') ?? false) && Number(data.size) < PicShowSize) {
      return <img src={url} />
    }
    if (data.type?.includes('image') ?? false) {
      return <ImgThumbnail />
    }
    return <ArweaveIcon size={48} />
  }, [url, item])

  return <div className={style.thumbnail}>{content}</div>
}

export default Thumbnail
