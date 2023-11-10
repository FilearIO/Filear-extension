import { Buffer } from 'buffer'

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { UploadInterface, type Params, type UploadFile } from '@shared/interface/api'
import client from '@views/client'

import type { ArFileInfo } from '../../types'

export const fetchUploadFile = createAsyncThunk('upload/fetchUploadFile', async () => {
  const msg = {
    methods: UploadInterface.GetUploadFile,
    params: {},
  }
  const { data, success } = await client().request<Params, UploadFile | undefined>(msg)
  if (success) {
    return data
  }
})

export const delUploadFile = createAsyncThunk('upload/delUploadFile', async () => {
  const msg = {
    methods: UploadInterface.DelUploadFile,
    params: {},
  }
  const { data, success } = await client().request<Params, boolean>(msg)
  if (success && data) {
    return true
  }
  return false
})

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
  extraReducers: builder => {
    builder.addCase(fetchUploadFile.fulfilled, (state, { payload }) => {
      if (payload !== undefined) {
        const unit8arr = new Uint8Array(Buffer.from(payload.data, 'hex'))
        const file = new File([unit8arr], payload.name, { type: payload.type })
        fileStore.setFile([file])
        state.filesInfo = [{ title: '', desc: '' }]
      }
    })
    builder.addCase(delUploadFile.fulfilled, (state, { payload }) => {
      fileStore.setFile([])
      state.filesInfo = []
    })
  },
})

export const fileStore = new FileStore()
export const { setFilesInfo, setFileInfo, clearFiles } = uploadSlice.actions
export default uploadSlice.reducer
