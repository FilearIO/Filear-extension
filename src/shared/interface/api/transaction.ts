import InterfaceProxy from '../../utils/InterfaceProxy'

import { type Params, ApiKey } from './base'

export interface TransactionParams {
  target: string
  quantity: string
  data: string | Uint8Array | ArrayBuffer
  reward: string
  dataSize: string
  tags: Array<{ name: string; value: string }>
}

export interface GetBalanceParams extends Params {
  address: string
}

export enum TransactionApiFunction {
  GetPrice = 'getPrice',
  GetBalance = 'getBalance',
  CreateTransaction = 'createTransaction',
  Sign = 'sign',
  Upload = 'upload',
}

export const TransactionInterface = InterfaceProxy(TransactionApiFunction, ApiKey.TransactionApi)
