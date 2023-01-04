import { JWKInterface } from 'arweave/web/lib/wallet'

export type { JWKInterface }

export type Mnemonic = string

export interface Account {
  id: number
  name: string
  address: string
  encryptedEntropy: string
  extraData: string // for Arweave is encryptedJwk
}

export type Code = 'AR'

export interface Keyring {
  code: Code
  accounts: Account[]
  selectedID: number
  nextDeriveID: number
}

export interface Network {
  id: number
  url: string
  tag: string
}
