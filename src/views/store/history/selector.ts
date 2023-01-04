import { TransactionEdge } from '@shared/interface'

import { RootState } from '..'

export const historyListSelector = (state: RootState): TransactionEdge[] => state.history.historyList
