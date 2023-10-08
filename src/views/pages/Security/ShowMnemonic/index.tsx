import React, { useState, useCallback } from 'react'
import { Field, Form, Formik, FieldProps } from 'formik'

import { Button, Input, Modal, Toast } from '@arshare/cravis'

import { fetchUnlock } from '@views/client/api'
import useTrans from '@views/i18n/useTrans'
import checkError from '@views/utils/checkError'
import { validatePassword } from '@views/utils/validate'

import style from './style.module.scss'

const initialState = {
  password: '',
}

type FormikValues = typeof initialState

const ShowMnemonic: React.FC = () => {
  const { t } = useTrans()
  const [show, setShow] = useState(false)
  const [mnemoinic, setMnemonic] = useState('')

  const onSubmit = useCallback(async (values: FormikValues) => {
    try {
      const res = await fetchUnlock(values.password)
      setMnemonic(res)
      setShow(false)
    } catch {
      Toast.fail({ message: t('commonPasswordError') })
    }
  }, [])

  return (
    <>
      <div className={style.title}>{t('securityMnemonic')}</div>
      <div className={style.desc}>{t('securityMnemonicTips')}</div>
      <Button className={style.button} onClick={() => setShow(true)}>
        {t('securityMnemonicShow')}
      </Button>

      <Modal title={t('securityMnemonicShow')} show={show} onCancel={() => setShow(false)}>
        <Formik initialValues={initialState} onSubmit={onSubmit}>
          <Form>
            <Field name="password" validate={validatePassword}>
              {({ field: { name, value, onChange }, meta }: FieldProps) => (
                <div className={style.field}>
                  <Input
                    name={name}
                    type="password"
                    placeholder={t('password')}
                    value={value}
                    onChange={onChange}
                    showError={meta.touched && checkError(meta.error)}
                  />
                </div>
              )}
            </Field>
            <div className={style.buttonWarp}>
              <Button pattern="primary" className={style.cancel} onClick={() => setShow(false)}>
                {t('commonCancel')}
              </Button>
              <Button type="submit">{t('commonConfirm')}</Button>
            </div>
          </Form>
        </Formik>
      </Modal>

      <Modal title={t('securityMnemonic')} show={mnemoinic !== ''} onCancel={() => setShow(false)}>
        <div className={style.mnemoinic}>{mnemoinic}</div>
        <Button onClick={() => setMnemonic('')}>{t('commonConfirm')}</Button>
      </Modal>
    </>
  )
}

export default ShowMnemonic
