import Arweave from 'arweave'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import type { Network } from '@shared/interface'

import style from './style.module.scss'

interface NetworkItemProps {
  network: Network
  onClick: (id: number) => {}
}

enum Status {
  Unknow = 'unknow',
  Failed = 'failed',
  Success = 'success',
}

let statusCache: Status = Status.Unknow

const NetworkItem: React.FC<NetworkItemProps> = ({ network, onClick }) => {
  const [status, setStatus] = useState<Status>(statusCache)
  const statusClass = classNames(style.status, {
    [style.unknow]: status === Status.Unknow,
    [style.failed]: status === Status.Failed,
    [style.success]: status === Status.Success,
  })
  const { id, url, tag } = network

  useEffect(() => {
    if (statusCache === Status.Success) return
    const urlParse = new URL(url)
    const defaultPort = urlParse.protocol.includes('https') ? 443 : 80
    const arweave = new Arweave({
      host: urlParse.hostname,
      port: urlParse.port ?? defaultPort,
      protocol: urlParse.protocol.slice(0, -1),
    })
    arweave.network
      .getInfo()
      .then(() => {
        setStatus(Status.Success)
        statusCache = Status.Success
      })
      .catch(() => {
        setStatus(Status.Failed)
      })
  }, [id])

  return (
    <div className={style.item} key={id} onClick={() => onClick(id)}>
      <div className={style.url}>
        <span className={statusClass} />
        {url}
      </div>
      <div className={style.tag}>{tag}</div>
    </div>
  )
}

export default NetworkItem
