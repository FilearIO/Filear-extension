import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik, FieldProps } from 'formik'

import { Button, Input, Toast } from '@arshare/cravis'
import { FILEAR_BIZTYPE, FILEAR_BIZTYPE_DICT } from '@shared/constants'

import { HomeLayout } from '@views/components/Layout'
import { ROUTES } from '@views/constants'
import { useArFee, useArTransaction } from '@views/hooks'
import useTrans from '@views/i18n/useTrans'

import style from './style.module.scss'

const initialState = {
  address: '',
  quantity: '',
}

type FormikValues = typeof initialState

const Send: React.FC = () => {
  const { t } = useTrans()
  const { createTransaction } = useArTransaction()
  const navigate = useNavigate()
  const { fees } = useArFee()

  const onSubmit = useCallback(async (values: FormikValues) => {
    try {
      const tags = [{ name: `${FILEAR_BIZTYPE}`, value: FILEAR_BIZTYPE_DICT.SEND }]
      const res = await createTransaction({
        target: values.address,
        quantity: values.quantity,
        tags,
      })
      // eslint-disable-next-line no-console
      console.log('res', res)
      Toast.success({ message: t('commonSuccess') })
    } catch {
      Toast.fail({ message: t('sendFail') })
    }
  }, [])

  return (
    <HomeLayout hideMenu={true}>
      <div className={style.send}>
        <Formik initialValues={initialState} onSubmit={onSubmit}>
          <Form>
            <Field name="address">
              {({ field: { name, value, onChange }, meta }: FieldProps) => (
                <div className={style.field}>
                  <label className={style.label}>{t('sendAddress')}</label>
                  <Input
                    name={name}
                    type="text"
                    placeholder=""
                    value={value}
                    onChange={onChange}
                    showError={meta.touched && meta.error !== ''}
                  />
                </div>
              )}
            </Field>
            <Field name="quantity">
              {({ field: { name, value, onChange }, meta }: FieldProps) => (
                <div className={style.field}>
                  <label className={style.label}>{t('sendAmount')}</label>
                  <Input
                    name={name}
                    type="text"
                    placeholder=""
                    value={value}
                    onChange={onChange}
                    showError={meta.touched && meta.error !== ''}
                  />
                </div>
              )}
            </Field>
            <div className={style.fee}>
              {t('sendFees')} {fees} AR
            </div>
            <Button className={style.confirm} type="submit">
              {t('commonNext')}
            </Button>
            <Button
              pattern="primary"
              className={style.cancel}
              onClick={() => navigate(`${ROUTES.ROOT}${ROUTES.WALLET}`)}
            >
              {t('commonCancel')}
            </Button>
          </Form>
        </Formik>
      </div>
    </HomeLayout>
  )
}

export default Send
