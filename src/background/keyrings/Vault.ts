import { Buffer } from 'buffer'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'

import type { Account } from '@shared/interface'
import { encrypt, decrypt, Password } from './password'

export default class Vault {
  public id: number
  public address: string = ''
  public name: string
  public encryptedEntropy: string = ''
  public extraData: string = ''

  constructor(id: number = 1) {
    this.id = id
    this.name = `Account ${id}`
  }

  public setDate(account: Account | undefined): void {
    if (account === undefined) return

    this.id = account.id
    this.name = account.name
    this.address = account.address
    this.encryptedEntropy = account.encryptedEntropy
    this.extraData = account.extraData
  }

  public async create(password: Password): Promise<{ mnemonic: string; encryptedEntropy: string }> {
    const mnemonic = bip39.generateMnemonic(wordlist)
    const entropy = bip39.mnemonicToEntropy(mnemonic, wordlist)
    this.encryptedEntropy = await encrypt(Buffer.from(entropy).toString('hex'), password)
    return {
      mnemonic,
      encryptedEntropy: this.encryptedEntropy,
    }
  }

  public async reCreate(password: Password, mnemonic: string): Promise<string> {
    const entropy = bip39.mnemonicToEntropy(mnemonic, wordlist)
    this.encryptedEntropy = await encrypt(Buffer.from(entropy).toString('hex'), password)
    return this.encryptedEntropy
  }

  public async unlock(password: Password): Promise<string> {
    const entropy = await decrypt(this.encryptedEntropy, password)
    const mnemonic = bip39.entropyToMnemonic(new Uint8Array(Buffer.from(entropy as string, 'hex')), wordlist)
    return mnemonic
  }
}
