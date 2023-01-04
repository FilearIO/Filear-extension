import redstone from 'redstone-api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPrice = createAsyncThunk('price/getPrice', async () => {
  try {
    const { value } = await redstone.getPrice('AR')
    return value
  } catch {
    return 0
  }
})

interface State {
  price: number
}

const initialState: State = {
  price: 0,
}

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPrice.fulfilled, (state, { payload }) => {
      state.price = payload
    })
  },
})

export default priceSlice.reducer
