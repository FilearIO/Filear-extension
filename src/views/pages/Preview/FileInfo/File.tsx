import React from 'react'

import style from './style.module.scss'

interface FileProps {
  file: File
}

const File: React.FC<FileProps> = ({ file }) => {
  if (file.type.includes('image')) {
    return <img className={style.image} src={URL.createObjectURL(file)} alt="" />
  }
  return <div>{file.type}</div>
}

export default File
