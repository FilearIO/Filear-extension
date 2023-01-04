import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { ArFileInfo } from '../../types'

interface State {
  filesInfo: ArFileInfo[]
}

class FileStore {
  private fileList: File[] = []

  getFile(): File[] {
    return this.fileList
  }

  setFile(files: File[]): void {
    this.fileList = files
  }
}

const initialState: State = {
  filesInfo: [],
}

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFilesInfo(state, action: PayloadAction<ArFileInfo[]>) {
      state.filesInfo = action.payload
    },
    setFileInfo(state, action: PayloadAction<{ index: number; fileInfo: ArFileInfo }>) {
      const { index, fileInfo } = action.payload
      const files = [...state.filesInfo]
      files.splice(index, 1, fileInfo)
      state.filesInfo = files
    },
    clearFiles(state) {
      state.filesInfo = []
    },
  },
})

export const fileStore = new FileStore()
export const { setFilesInfo, setFileInfo, clearFiles } = uploadSlice.actions
export default uploadSlice.reducer
