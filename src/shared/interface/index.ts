import {
  WalletApiFunction,
  NetworkApiFunction,
  HistoryApiFunction,
  TransactionApiFunction,
  UploadApiFunction,
} from './api'

export * as Api from './api'
export * from './Arweave'
export * from './base'

export interface Message<Req> {
  uuid: string
  methods: WalletApiFunction | NetworkApiFunction | HistoryApiFunction | TransactionApiFunction | UploadApiFunction
  params: Req
  action?: string
}

export interface Response<Req, Res> {
  uuid: string
  success: boolean
  data: Res
  message: string
  payload: Message<Req>
}
