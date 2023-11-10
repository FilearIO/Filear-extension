import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import type { PageInfo, TransactionConnection } from '@shared/interface'
import { HistoryInterface, type GetHistoryListParams } from '@shared/interface/api'
import client from '@views/client'

export const fetchHistoryList = createAsyncThunk(
  'history/fetchHistoryList',
  async ({ address }: GetHistoryListParams) => {
    const msg = {
      methods: HistoryInterface.GetHisotryList,
      params: {
        address,
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
  },
)

interface State {
  historyList: any[]
  pageInfo: PageInfo
}

const initialState: State = {
  historyList: [],
  pageInfo: {
    hasNextPage: true,
  },
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchHistoryList.fulfilled, (state, { payload }) => {
      state.historyList = payload.edges
      state.pageInfo = payload.pageInfo
    })
  },
})

export default historySlice.reducer
