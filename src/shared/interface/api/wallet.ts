import InterfaceProxy from '@shared/utils/InterfaceProxy'

import type { JWKInterface, Mnemonic } from '../base'

import { type Params, ApiKey } from './base'

export interface WalletCreateParams extends Params {
  password: string
}

export interface WalletReCreateParams extends Params {
  password: string
  mnemonic: string
}

export interface WalletUnlockParams extends Params {
  password: string
}

export type WalletUnlockResponse = Mnemonic

export interface WalletUnlockWithDataResponse {
  jwk: JWKInterface
}

export enum WalletApiFunction {
  Create = 'create',
  Recreate = 'reCreate',
  CheckLock = 'checkLock',
  Lock = 'lock',
  Unlock = 'unlock',
  UnlockWithData = 'unlockWithData',
}

export const WalletInterface = InterfaceProxy(WalletApiFunction, ApiKey.WalletApi)
