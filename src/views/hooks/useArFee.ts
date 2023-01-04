import { useEffect, useState } from 'react'

import { TransactionInterface } from '@shared/interface/api'
import client from '@views/client'

interface ArFee {
  loading: boolean
  fees: string
}

export function useArFee(byteSize?: number, targetAddress?: string): ArFee {
  const [loading, setLoading] = useState(true)
  const [fees, setFees] = useState<string>('')

  useEffect(() => {
    async function getArFee(): Promise<void> {
      try {
        const req = {
          methods: TransactionInterface.GetPrice,
          params: {
            byteSize,
            targetAddress,
          },
        }
        const { data, success } = await client().request<typeof req.params, string>(req)
        if (success) {
          setLoading(false)
          setFees(data)
        }
      } catch {
        setLoading(false)
      }
    }
    void getArFee()
  }, [byteSize, targetAddress])

  return {
    loading,
    fees,
  }
}
