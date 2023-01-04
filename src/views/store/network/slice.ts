import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import type { Network } from '@shared/interface'
import { NetworkInterface } from '@shared/interface/api'
import { DEFAULT_AR_CONFIG } from '@shared/constants'

import client from '@views/client'

export const fetchCurrentNetwork = createAsyncThunk('history/fetchCurrentNetwork', async () => {
  const msg = {
    methods: NetworkInterface.GetCurrentNetwork,
    params: {},
  }
  const { data, success } = await client().request<any, Network>(msg)
  if (success) {
    return data
  }
  return DEFAULT_AR_CONFIG
})

export const fetchNetworkList = createAsyncThunk('history/fetchNetworkList', async () => {
  const msg = {
    methods: NetworkInterface.GetNetworkList,
    params: {},
  }
  const { data, success } = await client().request<any, Network[]>(msg)
  if (success) {
    return data
  }
  return []
})

export const fetchChangeNetwork = createAsyncThunk('history/fetchChangeNetwor', async (id: number) => {
  const msg = {
    methods: NetworkInterface.ChangeNetwork,
    params: id,
  }
  const { success } = await client().request<number, undefined>(msg)
  if (success) {
    return true
  }
  return false
})

interface State {
  current: Network
  list: Network[]
}

const initialState: State = {
  current: DEFAULT_AR_CONFIG,
  list: [],
}

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCurrentNetwork.fulfilled, (state, { payload }) => {
      state.current = payload
    })
    builder.addCase(fetchNetworkList.fulfilled, (state, { payload }) => {
      state.list = payload
    })
  },
})

export default networkSlice.reducer
