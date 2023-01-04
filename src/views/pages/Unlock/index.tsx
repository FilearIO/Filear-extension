import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik, FieldProps } from 'formik'

import { Input, Button, ErrorText } from '@arshare/cravis'
import { openHomePage } from '@shared/borwser/open'

import { fetchLock } from '@views/client/api'
import { ROUTES } from '@views/constants'
import { ReturnLayout } from '@views/components/Layout'
import useTrans from '@views/i18n/useTrans'
import { AppDispatch } from '@views/store'
import { fetchUnlock } from '@views/store/wallet'
import { validatePassword } from '@views/utils/validate'

import style from './style.module.scss'

const initialValues = {
  password: '',
}

type FormikValues = typeof initialValues

const Unlock: React.FC = () => {
  const { t } = useTrans()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  useEffect(() => {
    void fetchLock()
  }, [])

  const onSubmit = async (values: FormikValues): Promise<void> => {
    const result = await dispatch(fetchUnlock(values.password)).unwrap()
    if (result) {
      navigate('/')
      return
    }
    setError(true)
  }

  return (
    <ReturnLayout hideReturn={true}>
      <div className={style.main}>
        <div className={style.title}>
          {t('unlockTitle')}
          <br />
          <span>{APP_NAME}</span>
        </div>
        <div className={style.desc}>{t('unlockSubline')}</div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnChange={false}>
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
                    showError={error}
                  />
                  {error && <ErrorText className={style.err}>{t('commonPasswordError')}</ErrorText>}
                </div>
              )}
            </Field>
            <div className={style.forgetPassword} onClick={async () => await openHomePage(ROUTES.IMPORT)}>
              {t('unlockForgetPassword')}
            </div>
            <Button className={style.confirm} size="medium" type="submit">
              {t('commonNext')}
            </Button>
          </Form>
        </Formik>
      </div>
    </ReturnLayout>
  )
}

export default Unlock
