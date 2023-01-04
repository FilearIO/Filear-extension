/**
 * todo: support multi wallet
 */

import * as bip39 from '@scure/bip39'

import type { Keyring, JWKInterface, Account } from '@shared/interface'

import Store from '../Store'

import { generateSeedToArJwk, generateArJwkToAddress } from './generateSeedToArAddress'
import { encrypt, decrypt } from './password'
import Vault from './Vault'

export default class Keyrings {
  private readonly locked = true
  private data: Keyring
  private readonly store: Store

  constructor(store: Store) {
    this.data = {
      code: 'AR',
      accounts: [],
      selectedID: 0,
      nextDeriveID: 1,
    }
    this.store = store
  }

  public async createVault(password: string): Promise<Account> {
    const vault = new Vault(this.data.nextDeriveID)
    const { mnemonic, encryptedEntropy } = await vault.create(password)
    const seed = await bip39.mnemonicToSeed(mnemonic)
    const jwk = await generateSeedToArJwk(seed)
    const encryptedJwk = await encrypt(jwk, password)
    const address = await generateArJwkToAddress(jwk)

    const account = {
      id: 1,
      name: 'wallet 1',
      address,
      encryptedEntropy,
      extraData: encryptedJwk,
    }
    this.data.selectedID = account.id
    this.data.nextDeriveID += 1
    this.data.accounts.push(account)

    this.store.setLock(false)
    return account
  }

  public async reCreateVault(password: string, mnemonic: string): Promise<Account> {
    const vault = new Vault(this.data.nextDeriveID)
    const encryptedEntropy = await vault.reCreate(password, mnemonic)
    const seed = await bip39.mnemonicToSeed(mnemonic)
    const jwk = await generateSeedToArJwk(seed)
    const encryptedJwk = await encrypt(jwk, password)
    const address = await generateArJwkToAddress(jwk)

    const account = {
      id: 1,
      name: vault.name,
      address,
      encryptedEntropy,
      extraData: encryptedJwk,
    }
    this.data.selectedID = account.id
    this.data.nextDeriveID += 1
    this.data.accounts.push(account)

    this.store.setLock(false)
    return account
  }

  public getKeyringsDate(): Keyring {
    return this.data
  }

  public setKeyringsDate(data: Keyring): void {
    this.data = data
  }

  public checkLock(): boolean {
    return this.store.getLock()
  }

  public lock(): void {
    this.store.setLock(true)
  }

  public async unlock(password: string): Promise<string> {
    const account = this.data.accounts.find(account => account.id === this.data.selectedID)
    const vault = new Vault()
    vault.setDate(account)
    const mnemonic = await vault.unlock(password)
    this.store.setLock(false)
    return mnemonic
  }

  public async unlockExtraDate(password: string): Promise<{ jwk: JWKInterface }> {
    const account = this.data.accounts.find(account => account.id === this.data.selectedID) as Account
    const jwk = await decrypt(account.extraData, password)
    return {
      jwk: jwk as JWKInterface,
    }
  }
}
