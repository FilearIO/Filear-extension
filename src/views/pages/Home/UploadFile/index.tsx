import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Upload } from '@arshare/cravis'
import { UploadIcon } from '@arshare/cravis/Icons'

import { ROUTES } from '@views/constants'
import useTrans from '@views/i18n/useTrans'
import { setFilesInfo, fileStore } from '@views/store/upload'

import style from './style.module.scss'

const UploadFile: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTrans()

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const { files } = e.target
    if (files === null || files.length === 0) {
      return
    }
    fileStore.setFile([...files])
    const filesInfo = new Array(files.length).fill({ title: '', desc: '' })
    await dispatch(setFilesInfo(filesInfo))
    await navigate(`${ROUTES.ROOT}${ROUTES.PREVIEW}`)
  }

  const onDrag = (e: React.DragEvent<HTMLElement>): void => {
    // eslint-disable-next-line no-console
    console.log(e.dataTransfer.files)
  }

  return (
    <div className={style.container} onDrag={onDrag}>
      <div>{t('upload')}</div>
      <div>
        <Upload onChange={onChange}>
          <div className={style.icon}>
            <UploadIcon color="#3772FF" size={20} />
          </div>
        </Upload>
        {/* <span>&nbsp;</span> */}
        {/* <Upload directory={true} onChange={onChange}>
          di
        </Upload> */}
      </div>
    </div>
  )
}

export default UploadFile
