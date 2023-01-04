import React, { useState, useImperativeHandle } from 'react'

import Toast from './Toast'
import Transiiton from './Transiiton'

import type { BaseConfig } from './types'

import style from './style.module.scss'

interface ToastListProps {
  maxCount?: number
  queue: BaseConfig[]
}

export interface ToastListRef {
  open: (config: BaseConfig) => void
  close: (key: React.Key) => void
}

const ToastList = React.forwardRef<ToastListRef, ToastListProps>((props, ref) => {
  const { queue, maxCount = 0 } = props
  const [configList, setConfigList] = useState<BaseConfig[]>(queue)

  const onClose = (key: React.Key): void => {
    setConfigList(list => list.filter(item => item.id !== key))
  }

  useImperativeHandle(ref, () => ({
    open: config => {
      let newConfig = [...configList, config]

      if (maxCount > 0 && newConfig.length > maxCount) {
        newConfig = newConfig.slice(-maxCount)
      }
      setConfigList(newConfig)
    },
    close: key => {
      onClose(key)
    },
  }))

  return (
    <div className={style.toastlist}>
      {configList.map(config => (
        <Transiiton key={`${config.id}`} start={style.toastStart} active={style.toastActive}>
          {({ className }) => <Toast onClose={onClose} className={className} config={config} />}
        </Transiiton>
      ))}
    </div>
  )
})

ToastList.displayName = 'ToastList'

export default ToastList
