import React from 'react'

import style from './style.module.scss'

interface TextAreaProps {
  id?: string
  name?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLElement>
}

const TextArea: React.FC<TextAreaProps> = ({ id, name, value, onChange }) => {
  return <textarea className={style.textarea} id={id} name={name} value={value} onChange={onChange} />
}

export default TextArea
