export type ToastType = 'info' | 'success' | 'fail'

export interface BaseConfig {
  type: ToastType
  id: number
  message: string
}
