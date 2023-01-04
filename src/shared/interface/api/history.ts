import InterfaceProxy from '../../utils/InterfaceProxy'

import { type Params, ApiKey } from './base'

export interface GetHistoryListParams extends Params {
  address: string
  after?: string
}

export enum HistoryApiFunction {
  GetHisotryList = 'getHistoryList',
  GetAppFileList = 'getAppFileList',
}

export const HistoryInterface = InterfaceProxy(HistoryApiFunction, ApiKey.Histroy)
