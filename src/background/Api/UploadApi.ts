import { popupWindow } from '@shared/borwser/popupWindow'
import { UploadApiFunction, type Params, type UploadFileParams, type UploadFile } from '@shared/interface/api'

import { BackgroundStorage, BackgroundIndexedDB } from '../Storage'

export default class Upload {
  private readonly _storage: BackgroundStorage
  private readonly _indexedBD: BackgroundIndexedDB

  constructor() {
    this._storage = new BackgroundStorage()
    this._indexedBD = new BackgroundIndexedDB()
  }

  async [UploadApiFunction.UploadFile](params: Params): Promise<undefined> {
    const { data, name, type } = params as UploadFileParams

    const res = await this._indexedBD.saveUploadFile(data, name, type)

    if (res) {
      await popupWindow('/preview')
    }
  }

  async [UploadApiFunction.GetUploadFile](): Promise<UploadFile | undefined> {
    return await this._indexedBD.getUploadFile()
  }

  async [UploadApiFunction.DelUploadFile](): Promise<boolean> {
    return await this._indexedBD.delUploadFile()
  }
}
