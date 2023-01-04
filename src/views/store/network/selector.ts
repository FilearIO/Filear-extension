import { Network } from '@shared/interface'
import { RootState } from '..'

export const currentNetworkSelector = (state: RootState): Network => state.network.current
export const networkListSelector = (state: RootState): Network[] => state.network.list
