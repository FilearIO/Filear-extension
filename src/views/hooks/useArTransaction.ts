import { useState, useCallback } from 'react'

import { TransactionInterface, TransactionParams } from '@shared/interface/api'
import client from '@views/client'

interface ArTransaction {
  loading: boolean
  createTransaction: (params: Partial<TransactionParams>) => Promise<boolean>
}

export function useArTransaction(): ArTransaction {
  const [loading, setLoading] = useState(false)

  const createTransaction = useCallback(async (params: Partial<TransactionParams>): Promise<boolean> => {
    try {
      setLoading(true)
      const req = {
        methods: TransactionInterface.CreateTransaction,
        params,
      }
      const res = await client().request<Partial<TransactionParams>, boolean>(req)
      setLoading(false)
      return res.data
    } catch {
      setLoading(false)
      return false
    }
  }, [])

  return {
    loading,
    createTransaction,
  }
}
