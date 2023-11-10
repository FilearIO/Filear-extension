import InterfaceProxy from '../../utils/InterfaceProxy'

import { type Params, ApiKey } from './base'

export interface UploadFileParams extends Params {
  data: string
  name: string
  type: string
  tags?: Array<{ name: string; value: string }>
}

export enum UploadApiFunction {
  UploadFile = 'uploadFile',
  GetUploadFile = 'getUploadFile',
  DelUploadFile = 'delUploadFile',
}

export interface UploadFile {
  id: number
  data: string
  name: string
  type: string
}

export const UploadInterface = InterfaceProxy(UploadApiFunction, ApiKey.Upload)
