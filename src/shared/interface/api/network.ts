import InterfaceProxy from '../../utils/InterfaceProxy'

import { ApiKey } from './base'

export enum NetworkApiFunction {
  GetCurrentNetwork = 'getCurrentNetwork',
  GetNetworkList = 'getNetworkList',
  AddNetwork = 'addNetwork',
  ChangeNetwork = 'changeNetwork',
}

export const NetworkInterface = InterfaceProxy(NetworkApiFunction, ApiKey.NetworkApi)
