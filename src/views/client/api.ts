import { WalletInterface, type WalletUnlockParams } from '@shared/interface/api'
import client from '.'

export const fetchLock = async (): Promise<boolean> => {
  const req = {
    methods: WalletInterface.Lock,
    params: {},
  }
  const { data, success } = await client().request<any, boolean>(req)
  if (success) {
    return data
  }
  return false
}

export const fetchUnlock = async (password: string): Promise<string> => {
  const req = {
    methods: WalletInterface.Unlock,
    params: {
      password,
    },
  }
  const { data, success } = await client().request<WalletUnlockParams, string>(req)
  if (success) {
    return data
  }
  throw new Error('error')
}

export const fetchUnlockWithKey = async (password: string): Promise<string> => {
  const req = {
    methods: WalletInterface.UnlockWithData,
    params: {
      password,
    },
  }
  const { data, success } = await client().request<WalletUnlockParams, string>(req)
  if (success) {
    return data
  }
  throw new Error('error')
}
