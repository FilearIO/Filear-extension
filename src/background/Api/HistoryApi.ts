import { type Params, type GetHistoryListParams } from '@shared/interface/api'
import { type TransactionConnection } from '@shared/interface'

import Arweave from '../Arweave'
import { queryUserHistory, queryUserFile } from '../graphql'

export default class History {
  private readonly _arweave = Arweave.arweave

  async getHistoryList(params: Params): Promise<TransactionConnection> {
    const { address, after } = params as GetHistoryListParams

    const { status, data } = await this._arweave.api.post('/graphql', queryUserHistory(address, after))
    if (status === 200) {
      return data?.data?.transactions
    }
    return {
      edges: [],
      pageInfo: { hasNextPage: false },
    }
  }

  async getAppFileList(params: Params): Promise<TransactionConnection> {
    const { address, after } = params as GetHistoryListParams

    const { status, data } = await this._arweave.api.post('/graphql', queryUserFile(address, after))
    if (status === 200) {
      return data?.data?.transactions
    }
    return {
      edges: [],
      pageInfo: { hasNextPage: false },
    }
  }
}
