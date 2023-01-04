import classNames from 'classnames'
import React, { useMemo } from 'react'

import { LoadingIcon } from '../Icons'

import style from './style.module.scss'

interface ButtonProps {
  pattern?: 'default' | 'primary'
  type?: 'submit' | 'button' | 'reset'
  size?: 'normal' | 'small' | 'xsmall' | 'medium'
  className?: string
  loading?: boolean
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  pattern = 'default',
  type = 'button',
  className,
  size = 'normal',
  loading = false,
  disabled = false,
  onClick,
  children,
}) => {
  const _className = useMemo(
    () =>
      classNames(
        style['cravis-button'],
        {
          [style['cravis-button-normal']]: size === 'normal',
          [style['cravis-button-small']]: size === 'small',
          [style['cravis-button-xsmall']]: size === 'xsmall',
          [style['cravis-button-medium']]: size === 'medium',

          [style['cravis-button-default']]: pattern === 'default',
          [style['cravis-button-primary']]: pattern === 'primary',
        },
        className,
      ),
    [className, size],
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    onClick?.(e)
  }

  return (
    <button type={type} disabled={loading || disabled} className={_className} onClick={handleClick}>
      {loading ? (
        <div className={style.loading}>
          <span>
            <LoadingIcon size={16} />
          </span>
          Loading
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
