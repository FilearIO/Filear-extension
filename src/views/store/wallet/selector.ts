import { Account } from '@shared/interface'

import { RootState } from '..'

export const accountSelector = (state: RootState): Account => state.wallet.account
export const balanceSelector = (state: RootState): string => state.wallet.balance
