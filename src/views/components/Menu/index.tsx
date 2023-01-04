import classNames from 'classnames'
import React from 'react'
import { useNavigate, useMatch } from 'react-router-dom'

import { FileIcon, HistoryIcon, SettingsIcon, WalletIcon } from '@arshare/cravis/Icons'
import { ROUTES } from '@views/constants'
import useTrans from '@views/i18n/useTrans'

import style from './style.module.scss'

interface MenuItemProps {
  to: string
  i18nKey: string
  icon: React.ReactNode
}

const menu = [
  {
    path: `${ROUTES.ROOT}${ROUTES.HOME}`,
    i18nKey: 'menuFiles',
    icon: <FileIcon />,
  },
  {
    path: `${ROUTES.ROOT}${ROUTES.WALLET}`,
    i18nKey: 'menuWallet',
    icon: <WalletIcon />,
  },
  {
    path: `${ROUTES.ROOT}${ROUTES.HISTORY}`,
    i18nKey: 'menuHistory',
    icon: <HistoryIcon />,
  },
  {
    path: `${ROUTES.ROOT}${ROUTES.SETTINGS}`,
    i18nKey: 'menuSettings',
    icon: <SettingsIcon />,
  },
]

const MenuItem: React.FC<MenuItemProps> = ({ to, i18nKey, icon }) => {
  const navigate = useNavigate()
  const match = useMatch(to)
  const { t } = useTrans()

  return (
    <div
      className={classNames(style.menuitem, { [style.active]: match !== null })}
      onClick={() => {
        navigate(to)
      }}
    >
      <i>{icon}</i>
      <span>{t(i18nKey)}</span>
    </div>
  )
}

const Menu: React.FC = () => {
  return (
    <menu className={style.menu}>
      {menu.map(item => (
        <MenuItem key={item.i18nKey} to={item.path} i18nKey={item.i18nKey} icon={item.icon} />
      ))}
    </menu>
  )
}

export default React.memo(Menu)
