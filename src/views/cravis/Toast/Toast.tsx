import classnames from 'classnames'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import { SuccessIcon, InfoIcon } from '@arshare/cravis/Icons'
import type { BaseConfig } from './types'

import style from './style.module.scss'

interface ToastProps {
  className?: string
  duration?: number
  config: BaseConfig
  onClose: (_: number) => void
}

const Toast: React.FC<ToastProps> = ({ className, duration = 2, config, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const icon = useMemo(() => {
    switch (config.type) {
      case 'info':
        return <InfoIcon size={26} color="#3C66FF" />
      case 'success':
        return <SuccessIcon size={26} color="#00A830" />
      case 'fail':
        return <InfoIcon size={26} color="#EB2F58" />
      default:
        return null
    }
  }, [config.type])

  const _onClose = useCallback(async () => {
    try {
      const animate = ref.current?.animate(
        [
          { height: '54px', opacity: 1, marginTop: '4px' },
          { height: 0, opacity: 0, marginTop: 0 },
        ],
        {
          fill: 'forwards',
          easing: 'linear',
          duration: 300,
        },
      )
      await animate?.finished
      onClose(config.id)
    } catch {
      onClose(config.id)
    }
  }, [config])

  useEffect(() => {
    const timer = setTimeout(() => {
      void _onClose()
    }, duration * 1000)
    return () => clearTimeout(timer)
  }, [_onClose, duration])

  return (
    <div className={classnames(style.toast, className)} ref={ref}>
      <span>{icon}</span>
      {config.message}
    </div>
  )
}

export default React.memo(Toast)
