import { RootState } from '..'

import type { ArFileInfo } from '@views/types'

export const filesInfoSelector = (state: RootState): ArFileInfo[] => state.upload.filesInfo
