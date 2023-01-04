import { useEffect, useState } from 'react'

import { WalletInterface, WalletUnlockParams, WalletUnlockResponse } from '@shared/interface/api'
import client from '@views/client'

interface DecryptArKey {
  loading: boolean
  mnemonic: WalletUnlockResponse
}

export function useDecryptMnemonic(password: string): DecryptArKey {
  const [loading, setLoading] = useState(true)
  const [mnemonic, setMnemonic] = useState<WalletUnlockResponse>('')

  useEffect(() => {
    async function decryptArkey(): Promise<void> {
      if (password === '') {
        return
      }
      try {
        const req = {
          methods: WalletInterface.Unlock,
          params: {
            password,
          },
        }
        const { data, success } = await client().request<WalletUnlockParams, WalletUnlockResponse>(req)
        if (success) {
          setLoading(false)
          setMnemonic(data)
        }
      } catch {
        setLoading(false)
      }
    }
    void decryptArkey()
  }, [password])

  return {
    loading,
    mnemonic,
  }
}
