import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'

import style from './style.module.scss'

interface ModalProps {
  show: boolean
  title?: string
  onCancel: () => void
  children: React.ReactNode
  width?: string | number
}

const Modal: React.FC<ModalProps> = ({ width, show, title, onCancel, children }) => {
  const modalStyle = useMemo(() => {
    if (width !== undefined) {
      return {
        width,
      }
    }
    return {}
  }, [width])

  return show
    ? ReactDOM.createPortal(
        <div className={style.modal}>
          <div className={style.mask} onClick={onCancel} />
          <div className={style.content} style={modalStyle}>
            <p className={style.title}>{title}</p>
            {children}
          </div>
        </div>,
        document.body,
      )
    : null
}

export default Modal
