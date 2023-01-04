import React, { useCallback, useState } from 'react'

import defaultLocales from '../../../app/_locales/en/messages.json'

import type { LocalesDict } from './types'

interface Props {
  children: React.ReactElement
}

export interface I18nContextInterface {
  t: (key: string, defaultTrans?: string) => string
  changeLocales: () => void
}

export const I18nContext = React.createContext<I18nContextInterface>({
  t: (key: string, defaultTrans?: string) => '',
  changeLocales: () => {},
})

export const I18nContextProvider: React.FC<Props> = ({ children }) => {
  const [translation, setTranslation] = useState<LocalesDict>(defaultLocales)

  const changeLocales = useCallback(() => {
    setTranslation(defaultLocales)
  }, [])

  const t = useCallback((key: string, defaultTrans = '') => {
    const trans = translation[key]
    if (trans === undefined) return defaultTrans
    return trans.message ?? key
  }, [])

  return <I18nContext.Provider value={{ t, changeLocales }}>{children}</I18nContext.Provider>
}
