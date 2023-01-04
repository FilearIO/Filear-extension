import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Field, Form, Formik, FieldProps } from 'formik'

import { Button, Input, Modal, Toast } from '@arshare/cravis'

import { fetchUnlockWithKey } from '@views/client/api'
import useTrans from '@views/i18n/useTrans'
import { accountSelector } from '@views/store/wallet'
import downloadFile from '@views/utils/downloadFile'
import { validatePassword } from '@views/utils/validate'

import style from './style.module.scss'

const initialState = {
  password: '',
}

type FormikValues = typeof initialState

const ShowKey: React.FC = () => {
  const { t } = useTrans()
  const account = useSelector(accountSelector)
  const [show, setShow] = useState(false)

  const onSubmit = useCallback(async (values: FormikValues) => {
    try {
      const res = await fetchUnlockWithKey(values.password)
      downloadFile(JSON.stringify(res, null, 2), 'application/json', `arweave-privateKey-${account.address}.json`)
      setShow(false)
    } catch {
      Toast.fail({ message: t('commonPasswordError') })
    }
  }, [])

  return (
    <>
      <div className={style.title}>{t('securityPrivateKey')}</div>
      <div className={style.desc}>{t('securityPrivateKeyTips')}</div>
      <Button className={style.button} onClick={() => setShow(true)}>
        {t('securityPrivateKeyShow')}
      </Button>

      <Modal title={t('securityPrivateKeyShow')} show={show} onCancel={() => setShow(false)}>
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
                    showError={meta.touched && meta.error !== ''}
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
    </>
  )
}

export default ShowKey
