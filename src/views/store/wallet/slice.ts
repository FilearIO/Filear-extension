import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import type { Account } from '@shared/interface'
import {
  WalletInterface,
  TransactionInterface,
  type WalletCreateParams,
  type WalletReCreateParams,
  type WalletUnlockParams,
  type GetBalanceParams,
} from '@shared/interface/api'
import client from '@views/client'

import { RootState } from '../index'

export const fetchCreateWallet = createAsyncThunk(
  'wallet/fetchCreateWallet',
  async ({ password }: WalletCreateParams) => {
    const msg = {
      methods: WalletInterface.Create,
      params: {
        password,
      },
    }
    const { data, success } = await client().request<WalletCreateParams, Account>(msg)
    if (success) {
      return data
    }
    return undefined
  },
)

export const fetchReCreateWallet = createAsyncThunk(
  'wallet/fetchReCreateWallet',
  async ({ password, mnemonic }: WalletReCreateParams) => {
    const msg = {
      methods: WalletInterface.Recreate,
      params: {
        password,
        mnemonic,
      },
    }
    const { data, success } = await client().request<WalletReCreateParams, Account>(msg)
    if (success) {
      return data
    }
    return undefined
  },
)

export const fetchUnlock = createAsyncThunk('wallet/fetchUnlock', async (password: string, { getState }) => {
  const state = getState() as RootState
  const msg = {
    methods: WalletInterface.Unlock,
    params: {
      password,
      address: state.wallet.account?.address,
    },
  }
  const res = await client().request<WalletUnlockParams, string>(msg)
  if (res.success) {
    return true
  }
  return false
})

export const fetchGetBalance = createAsyncThunk('wallet/fetchGetBalance', async (_, { getState }) => {
  const state = getState() as RootState
  const msg = {
    methods: TransactionInterface.GetBalance,
    params: {
      address: state.wallet.account?.address,
    },
  }
  const { success, data } = await client().request<GetBalanceParams, string>(msg)
  if (success) {
    return data
  }
  return ''
})

interface State {
  initialised: boolean
  isLocked: boolean
  account: Account | undefined
  balance: string
}

const initialState: State = { account: undefined, initialised: false, isLocked: true, balance: '0' }

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<Account>) {
      state.account = action.payload
    },
    setIsLocked(state, action: PayloadAction<boolean>) {
      state.isLocked = action.payload
    },
    setUnLock(state) {
      state.isLocked = true
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCreateWallet.fulfilled, (state, { payload }) => {
      state.initialised = true
      state.isLocked = false
      state.account = payload
    })
    builder.addCase(fetchReCreateWallet.fulfilled, (state, { payload }) => {
      state.initialised = true
      state.isLocked = false
      state.account = payload
    })
    builder.addCase(fetchUnlock.fulfilled, (state, { payload }) => {
      state.isLocked = !payload
    })
    builder.addCase(fetchGetBalance.fulfilled, (state, { payload }) => {
      state.balance = payload
    })
  },
})

export const { setAddress, setIsLocked, setUnLock } = walletSlice.actions
export default walletSlice.reducer
