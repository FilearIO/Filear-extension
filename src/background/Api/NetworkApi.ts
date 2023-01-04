import { type Network } from '@shared/interface'
import { NetworkApiFunction } from '@shared/interface/api'
import netwrokSwitch from '@shared/utils/networkSwitch'

import Arweave from '../Arweave'
import BackgroundStorage from '../Storage'

const DefaultNetworkList: Network[] = [
  {
    id: 1,
    url: 'https://arweave.net',
    tag: 'official',
  },
  {
    id: 2,
    url: 'https://arweave.dev',
    tag: 'backup',
  },
]

export default class NetworkApi {
  private readonly _storage: BackgroundStorage

  constructor() {
    this._storage = new BackgroundStorage()
  }

  async [NetworkApiFunction.GetCurrentNetwork](): Promise<Network> {
    const id = await this._storage.getCurrentNetwork()
    const list = await this[NetworkApiFunction.GetNetworkList]()
    const config = list.find(item => item.id === Number(id))
    if (config === undefined) {
      return DefaultNetworkList[0]
    }
    return config
  }

  async [NetworkApiFunction.ChangeNetwork](id: number): Promise<void> {
    await this._storage.setCurrentNetwork(String(id))

    const list = await this[NetworkApiFunction.GetNetworkList]()
    const config = list.find(item => item.id === Number(id))
    if (config === undefined) throw new Error('Network Switch Internal Error')

    Arweave.emit('arweaveConfigUpdate', netwrokSwitch(config.url))
  }

  async [NetworkApiFunction.GetNetworkList](): Promise<Network[]> {
    const customNetworkListString = await this._storage.getNetworkList()
    if (customNetworkListString === undefined) {
      return DefaultNetworkList
    }
    try {
      const newNetwork = ([] as Network[]).concat(DefaultNetworkList).concat(JSON.parse(customNetworkListString))
      return newNetwork
    } catch {
      return DefaultNetworkList
    }
  }

  async [NetworkApiFunction.AddNetwork](url: string, tag: string): Promise<void> {
    const id = DefaultNetworkList.length + 1
    const network = [{ id, url, tag }]
    const customNetworkList = await this._storage.getNetworkList()

    const newNetwork: Network[] = []
    if (customNetworkList !== undefined) {
      newNetwork.concat(JSON.parse(customNetworkList))
    }
    newNetwork.concat(network)

    await this._storage.setNetworkList(JSON.stringify(newNetwork))
  }
}
