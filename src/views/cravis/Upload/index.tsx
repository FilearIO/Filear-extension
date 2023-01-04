import classNames from 'classnames'
import React, { useCallback, useEffect, useRef } from 'react'

import style from './style.module.scss'

interface UploadProps {
  className?: string
  directory?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  children: React.ReactNode
}

const Upload: React.FC<UploadProps> = ({ className, onChange, directory = false, children }) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current !== null && directory) {
      ref.current.setAttribute('directory', '')
      ref.current.setAttribute('webkitdirectory', '')
    }
  }, [ref])

  const _onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (ref.current === null) return
      ref.current.click()
    },
    [ref],
  )

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    },
    [onChange],
  )

  return (
    <div className={classNames(style.upload, className)} onClick={_onClick}>
      <input type="file" ref={ref} onChange={_onChange} />
      {children}
    </div>
  )
}

export default Upload
