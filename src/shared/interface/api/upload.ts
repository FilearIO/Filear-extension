import InterfaceProxy from '../../utils/InterfaceProxy'

import { type Params, ApiKey } from './base'

export interface UploadFileParams extends Params {
  data: string
  tags?: Array<{ name: string; value: string }>
}

export enum UploadApiFunction {
  UploadFile = 'uploadFile',
  GetUploadFile = 'getUploadFile',
}

export const UploadInterface = InterfaceProxy(UploadApiFunction, ApiKey.Upload)
