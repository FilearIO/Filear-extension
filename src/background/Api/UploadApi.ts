import { UploadApiFunction, type Params, type UploadFileParams } from '@shared/interface/api'

import { BackgroundStorage } from '../Storage'

export default class Upload {
  private readonly _storage: BackgroundStorage

  constructor() {
    this._storage = new BackgroundStorage()
  }

  async [UploadApiFunction.UploadFile](params: Params): Promise<void> {
    const { data } = params as UploadFileParams

    await this._storage.setUploadFile(data)
  }

  async [UploadApiFunction.GetUploadFile](params: Params): Promise<string | undefined> {
    return await this._storage.getUploadFile()
  }
}
