import { useContext } from 'react'

import { I18nContext, type I18nContextInterface } from './Context'

export default function useTrans(): I18nContextInterface {
  const { t, changeLocales } = useContext(I18nContext)

  return { t, changeLocales }
}
