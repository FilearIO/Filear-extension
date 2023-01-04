import type { PageInfo, TransactionEdge } from '@shared/interface'

import { RootState } from '..'

export const listSelector = (state: RootState): TransactionEdge[] => state.app.list
export const pageInfoSelector = (state: RootState): PageInfo => state.app.pageInfo
