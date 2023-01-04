import classNames from 'classnames'
import React, { useState, useCallback, useMemo } from 'react'

import ErrorText from '../ErrorText'

import style from './style.module.scss'

interface InputProps {
  showError?: boolean
  error?: string
  name?: string
  type?: string
  placeholder?: string
  value?: React.InputHTMLAttributes<HTMLInputElement>['value']
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  showError = false,
  error = '',
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  onPaste,
}) => {
  const [focus, setFocus] = useState(false)

  const _onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>): void => {
      setFocus(false)
      if (typeof onBlur === 'function') {
        onBlur(e)
      }
    },
    [onBlur],
  )

  const _onFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>): void => {
      setFocus(true)
      if (typeof onFocus === 'function') {
        onFocus(e)
      }
    },
    [onFocus],
  )

  const _onPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>): void => {
      if (typeof onPaste === 'function') {
        onPaste(e)
      }
    },
    [onPaste],
  )

  const _wrapperClassName = useMemo(
    () =>
      classNames(style['cravis-input-wrapper'], {
        [style['cravis-input-wrapper-focus']]: focus && error === '' && !showError,
        [style['cravis-input-wrapper-error']]: showError || error !== '',
      }),
    [focus, showError, error],
  )

  return (
    <div className={_wrapperClassName}>
      <input
        name={name}
        className={style['cravis-input']}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        onPaste={_onPaste}
      />
      {error !== '' && <ErrorText className={style['carvis-input-error']}>{error}</ErrorText>}
    </div>
  )
}

export default Input
