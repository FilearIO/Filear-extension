import Storage from '@shared/borwser/storage'
import type { Keyring } from '@shared/interface'

enum StorageKey {
  CURRENT_NETWORK = 'filear:currentNetwork',
  NETWORK_LIST = 'filear:networkList',
  WALEET = 'filear:wallet',
  UPLOAD_FILE = 'filear:uploadFIle',
}

export default class BackgroundStorage {
  private readonly _storage: Storage

  constructor() {
    this._storage = new Storage()
  }

  async setWallet(value: Keyring[]): Promise<void> {
    return await this._storage.setItem(StorageKey.WALEET, JSON.stringify(value))
  }

  async getWallet(): Promise<Keyring[]> {
    const wallet = await this._storage.getItem(StorageKey.WALEET)
    if (wallet === undefined) {
      return []
    }
    return JSON.parse(wallet)
  }

  async setCurrentNetwork(value: string): Promise<void> {
    return await this._storage.setItem(StorageKey.CURRENT_NETWORK, value)
  }

  async getCurrentNetwork(): Promise<string | undefined> {
    return await this._storage.getItem(StorageKey.CURRENT_NETWORK)
  }

  async setNetworkList(value: string): Promise<void> {
    return await this._storage.setItem(StorageKey.NETWORK_LIST, value)
  }

  async getNetworkList(): Promise<string | undefined> {
    return await this._storage.getItem(StorageKey.NETWORK_LIST)
  }

  async getUploadFile(): Promise<string | undefined> {
    return await this._storage.getItem(StorageKey.UPLOAD_FILE)
  }

  async setUploadFile(value: string): Promise<void> {
    return await this._storage.setItem(StorageKey.UPLOAD_FILE, value)
  }

  async clear(): Promise<void> {
    return await this._storage.clear()
  }
}
