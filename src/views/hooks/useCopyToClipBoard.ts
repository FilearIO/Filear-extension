import React, { useCallback, useState } from 'react'
import { Toast } from '@arshare/cravis'

interface UseCopyToClipBoardRetObj {
  copied: boolean
  onCopy: React.MouseEventHandler<HTMLElement>
}

type UseCopyToClipBoardRet = UseCopyToClipBoardRetObj & [boolean, React.MouseEventHandler<HTMLElement>]

export function useCopyToClipBoard(text = ''): UseCopyToClipBoardRet {
  const [copied, setCopied] = useState(false)
  const onCopy = useCallback<React.MouseEventHandler<HTMLElement>>(
    e => {
      e.stopPropagation()
      e.preventDefault()
      if (text === '') {
        return
      }
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true)
          Toast.success({ message: 'copy success' })
        })
        .catch(() => setCopied(true))
    },
    [text],
  )

  const ret = [copied, onCopy] as UseCopyToClipBoardRet
  ret.copied = copied
  ret.onCopy = onCopy

  return ret
}
