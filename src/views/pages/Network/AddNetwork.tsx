import React, { useState, useCallback } from 'react'
import { Field, Form, Formik, FieldProps } from 'formik'

import { Button, Input, Modal } from '@arshare/cravis'
import useTrans from '@views/i18n/useTrans'

import style from './style.module.scss'

const initialState = {
  url: '',
  tag: '',
}

type FormikValues = typeof initialState

const AddNetwork: React.FC = () => {
  const { t } = useTrans()
  const [show, setShow] = useState(false)

  const onSubmit = useCallback((values: FormikValues) => {
    // eslint-disable-next-line no-console
    console.log(values)
  }, [])

  return (
    <>
      <div className={style.addNetwork} onClick={() => setShow(true)}>
        + {t('networkAdd')}
      </div>
      <Modal title={t('networkAddTitle')} show={show} onCancel={() => setShow(false)}>
        <Formik initialValues={initialState} onSubmit={onSubmit}>
          <Form>
            <Field name="url">
              {({ field: { name, value, onChange }, meta }: FieldProps) => (
                <div className={style.field}>
                  <Input
                    name={name}
                    type="text"
                    placeholder={t('networkAddUrl')}
                    value={value}
                    onChange={onChange}
                    showError={meta.touched && meta.error !== ''}
                  />
                </div>
              )}
            </Field>
            <Field name="tag">
              {({ field: { name, value, onChange }, meta }: FieldProps) => (
                <div className={style.field}>
                  <Input
                    name={name}
                    type="text"
                    placeholder={t('networkAddTag')}
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

export default AddNetwork
