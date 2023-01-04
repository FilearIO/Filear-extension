import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import type { PageInfo, TransactionConnection } from '@shared/interface'
import { HistoryInterface, GetHistoryListParams } from '@shared/interface/api'
import client from '@views/client'

export const fetchAppList = createAsyncThunk('app/fetchAppList', async ({ address, after }: GetHistoryListParams) => {
  const msg = {
    methods: HistoryInterface.GetAppFileList,
    params: {
      address,
      after,
    },
  }
  const { data, success } = await client().request<GetHistoryListParams, TransactionConnection>(msg)
  if (success) {
    return data
  }
  return {
    pageInfo: { hasNextPage: false },
    edges: [],
  }
})

interface State {
  list: any[]
  pageInfo: PageInfo
}

const initialState: State = {
  list: [],
  pageInfo: {
    hasNextPage: true,
  },
}

const historySlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAppList.fulfilled, (state, { payload }) => {
      state.list = [...state.list.concat(payload.edges)]
      state.pageInfo = payload.pageInfo
    })
  },
})

export default historySlice.reducer
