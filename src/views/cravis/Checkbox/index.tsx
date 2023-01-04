import classNames from 'classnames'
import React, { useMemo } from 'react'

import style from './style.module.scss'

interface CheckboxProps {
  name?: string
  className?: string
  checked?: boolean
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  children: React.ReactNode
}

const Checkbox: React.FC<CheckboxProps> = ({ name, className, disabled, checked, onChange, children }) => {
  const _className = useMemo(() => classNames(style['cravis-checkbox'], className), [className])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e)
  }

  return (
    <label className={_className}>
      <input id={name} type="checkbox" checked={checked} onChange={handleChange} />
      <div className="label-text">{children}</div>
    </label>
  )
}

export default Checkbox
