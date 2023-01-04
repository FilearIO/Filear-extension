import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from '@arshare/cravis'
import { FILEAR_BIZTYPE, FILEAR_BIZTYPE_DICT } from '@shared/constants'

import { ROUTES } from '@views/constants'
import { ReturnLayout } from '@views/components/Layout'
import { useArFee, useArTransaction } from '@views/hooks'
import useTrans from '@views/i18n/useTrans'
import { filesInfoSelector, fileStore } from '@views/store/upload'
import { readFile } from '@views/utils/readFile'

import FileInfo from './FileInfo'

import style from './style.module.scss'

const Preview: React.FC = () => {
  const { t } = useTrans()
  const navigate = useNavigate()
  const { loading, createTransaction } = useArTransaction()
  const filesInfo = useSelector(filesInfoSelector)
  const files = fileStore.getFile()

  const size = useMemo(() => {
    let size = 0
    for (let i = 0; i < files.length; i++) {
      size += files[i].size
    }
    return size
  }, [filesInfo])
  const { fees } = useArFee(size)

  const confirm = async (): Promise<void> => {
    if (loading) {
      return
    }
    if (files.length === 1) {
      const data = await readFile(files[0])
      const tags = [
        { name: 'Content-Type', value: files[0].type },
        { name: 'Title', value: filesInfo[0].title !== '' ? filesInfo[0].title : files[0].name },
        { name: 'Description', value: filesInfo[0].desc },
        { name: `${FILEAR_BIZTYPE}`, value: FILEAR_BIZTYPE_DICT.FILE },
      ]
      const res = await createTransaction({ data, dataSize: String(files[0].size), tags })
      if (res) {
        setTimeout(() => {
          navigate(`${ROUTES.ROOT}${ROUTES.HOME}`)
        }, 100)
      }
    }
  }

  return (
    <ReturnLayout>
      <div className={style.main}>
        <div className={style.infoContainer}>
          {filesInfo.length === 1 ? (
            <FileInfo index={0} file={files[0]} fileInfo={filesInfo[0]} />
          ) : (
            <div className={style.infolist}>
              {filesInfo.map((info, index) => (
                <FileInfo key={files[index].name} index={index} file={files[index]} fileInfo={info} />
              ))}
            </div>
          )}
        </div>
        <div className={style.fees}>
          {t('previewFees')}
          {fees} AR
        </div>
        <Button loading={loading} onClick={confirm} size="medium">
          {t('previewUpload')}
        </Button>
      </div>
    </ReturnLayout>
  )
}

export default Preview
