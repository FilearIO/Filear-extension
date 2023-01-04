import { useEffect, useState } from 'react'

import { WalletInterface } from '@shared/interface/api'
import errorCatch from '@shared/utils/errorCatch'
import client from '@views/client'

interface DecryptArKey {
  loading: boolean
  locked: boolean
}

export function useCheckLock(): DecryptArKey {
  const [loading, setLoading] = useState(true)
  const [locked, setLocked] = useState<boolean>(false)

  useEffect(() => {
    async function checkLock(): Promise<void> {
      try {
        const req = {
          methods: WalletInterface.CheckLock,
          params: {},
        }
        const { data, success } = await client().request<any, boolean>(req)
        if (success) {
          setLoading(false)
          setLocked(data)
        }
      } catch (err) {
        errorCatch(err)
        setLoading(false)
      }
    }
    void checkLock()
  }, [])

  return {
    loading,
    locked,
  }
}
