import classNames from 'classnames'
import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'

import { Input } from '@views/cravis'
import { EditIcon } from '@views/cravis/Icons'

import { setFileInfo } from '@views/store/upload'
import useTrans from '@views/i18n/useTrans'
import type { ArFileInfo } from '@views/types'
import { formatFileSize } from '@views/utils/fromat'

import File from './File'
import style from './style.module.scss'

interface FileInfoProps {
  index: number
  file: File
  fileInfo: ArFileInfo
}

const FileInfo: React.FC<FileInfoProps> = ({ file, fileInfo, index }) => {
  const dispatch = useDispatch()
  const { t } = useTrans()

  const [editDesc, setEditDesc] = useState<boolean>(false)
  const [desc, setDesc] = useState(fileInfo.desc)

  const onBlur = (): void => {
    dispatch(setFileInfo({ index, fileInfo: { ...fileInfo, desc } }))
    setEditDesc(false)
  }

  return (
    <div className={style.fileinfo}>
      <File file={file} />
      <div className={style.name}>
        {t('previewName')}
        {file.name}
      </div>
      <div className={classNames(style.desc, { [style.edit]: editDesc })}>
        {t('previewDesc')}
        {editDesc ? (
          <div style={{ flex: 1 }}>
            <Input value={desc} onChange={e => setDesc(e.target.value)} onBlur={onBlur} />
          </div>
        ) : (
          <Fragment>
            {fileInfo.desc}
            <span onClick={() => setEditDesc(true)}>
              <EditIcon size={14} color="#B1B5C4" />
            </span>
          </Fragment>
        )}
      </div>
      <div className={style.size}>
        {t('previewFileSize')}
        {formatFileSize(file.size)}
      </div>
    </div>
  )
}

export default FileInfo
