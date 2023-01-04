import type { Code, Keyring, Account, JWKInterface } from '@shared/interface'

import {
  WalletApiFunction,
  Params,
  WalletCreateParams,
  WalletReCreateParams,
  WalletUnlockParams,
} from '@shared/interface/api'

import { Keyrings } from '../keyrings'
import Storage from '../Storage'
import Store from '../Store'

class WalletApi {
  private readonly _keyrings: Keyrings
  private readonly _storage: Storage
  private readonly _store: Store

  constructor() {
    this._store = Store.getStore()
    this._keyrings = new Keyrings(this._store)
    this._storage = new Storage()
  }

  public async getWalletList(code: Code = 'AR'): Promise<Keyring> {
    const keyringList = await this._storage.getWallet()
    const keyring = keyringList.find(item => item.code === code) as Keyring
    return keyring
  }

  public async [WalletApiFunction.Create](params: Params): Promise<Account> {
    const { password } = params as WalletCreateParams

    await this._storage.clear()
    const account = await this._keyrings.createVault(password)
    await this._storage.setWallet([this._keyrings.getKeyringsDate()])

    return account
  }

  public async [WalletApiFunction.Recreate](params: Params): Promise<Account> {
    const { password, mnemonic } = params as WalletReCreateParams

    await this._storage.clear()
    const account = await this._keyrings.reCreateVault(password, mnemonic)

    await this._storage.setWallet([this._keyrings.getKeyringsDate()])

    return account
  }

  public [WalletApiFunction.CheckLock](): boolean {
    return this._store.getLock()
  }

  public [WalletApiFunction.Lock](): void {
    this._store.setLock(true)
    this._store.setJwk(undefined)
  }

  public async [WalletApiFunction.Unlock](params: Params): Promise<string> {
    const { password } = params as WalletUnlockParams

    const keyring = await this.getWalletList()

    if (keyring.accounts.length === 0) {
      throw new Error('Wallet Not Initialized.')
    }

    this._keyrings.setKeyringsDate(keyring)

    const mnemonic = await this._keyrings.unlock(password)
    const { jwk } = await this._keyrings.unlockExtraDate(password)
    this._store.setJwk(jwk)
    return mnemonic
  }

  public async [WalletApiFunction.UnlockWithData](params: Params): Promise<{ jwk: JWKInterface }> {
    const { password } = params as WalletUnlockParams

    const keyring = await this.getWalletList()

    if (keyring.accounts.length === 0) {
      throw new Error('Wallet Not Initialized.')
    }

    this._keyrings.setKeyringsDate(keyring)

    const data = await this._keyrings.unlockExtraDate(password)
    return data
  }
}

export default WalletApi
