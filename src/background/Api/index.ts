import { type Message } from '@shared/interface'
import { ApiKey } from '@shared/interface/api'

import WalletApi from './WalletApi'
import HistoryApi from './HistoryApi'
import NetworkApi from './NetworkApi'
import TransactionApi from './TransactionApi'

class ApiHandler {
  private apiProxy: Record<string, any> = {}

  constructor() {
    this.serviceRegister(ApiKey.WalletApi, new WalletApi())
    this.serviceRegister(ApiKey.NetworkApi, new NetworkApi())
    this.serviceRegister(ApiKey.TransactionApi, new TransactionApi())
    this.serviceRegister(ApiKey.Histroy, new HistoryApi())
  }

  public async handler<T = any>(msg: Message<any>): Promise<any> {
    const { methods, params } = msg
    const [serviceName, method] = methods.split('_')
    const service = this.apiProxy[serviceName]
    if (service === undefined) {
      throw new Error(`service [${serviceName}] not exist`)
    }
    return await (service[method](params) as Promise<T>)
  }

  private serviceRegister(servName: string, service: Object): void {
    const proxyService = new Proxy(service, {
      get: function (target, prop) {
        if ((target as any)[prop] === undefined) {
          throw new Error(`Method [${prop as string}] not exist in Service [${servName}]`)
        }
        return (target as any)[prop]
      },
    })
    this.apiProxy[servName] = proxyService
  }
}

export default async function handler(msg: Message<any>): Promise<any> {
  // eslint-disable-next-line no-console
  console.log('handler', msg)
  const apiHandler = new ApiHandler()
  return await apiHandler.handler(msg)
}
