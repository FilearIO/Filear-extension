import { RootState } from '..'

export const priceSelector = (state: RootState): number => state.price.price
