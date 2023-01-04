import React, { useCallback } from 'react'
import { Field, Form, Formik, FieldProps } from 'formik'

import { Button, Input, ErrorText } from '@arshare/cravis'
import useTrans from '@views/i18n/useTrans'
import { validatePassword, validatePasswordAgain } from '@views/utils/validate'

import style from './style.module.scss'

interface PasswordProps {
  loading: boolean
  onNext: (password: string) => void
}

const initialValues = {
  password: '',
  passwordAgain: '',
  checked: false,
}

type FormikValues = typeof initialValues

const Password: React.FC<PasswordProps> = ({ loading, onNext }) => {
  const { t } = useTrans()

  const onSubmit = useCallback(
    (values: FormikValues) => {
      onNext?.(values.password)
    },
    [onNext],
  )

  return (
    <div className={style.password}>
      <div className={style.tips}>{t('createPasswordTips')}</div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnChange={false}>
        {({ values, getFieldMeta }) => (
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
            <Field name="passwordAgain" validate={validatePasswordAgain(values.password)}>
              {({ field: { name, value, onChange }, meta }: FieldProps) => (
                <div className={style.field}>
                  <Input
                    name={name}
                    type="password"
                    placeholder={t('passwordConfirm')}
                    value={value}
                    onChange={onChange}
                    showError={meta.touched && meta.error !== ''}
                  />
                </div>
              )}
            </Field>
            <div className={style.error}>
              <ErrorText>{getFieldMeta('password').error}</ErrorText>
              <ErrorText>{getFieldMeta('passwordAgain').error}</ErrorText>
            </div>
            {/* <Field name="checked" validate={validateCheckboxRequire}>
              {({ field: { name, value, onChange }, meta }: FieldProps) => (
                <div className={style.agree}>
                  <Checkbox name={name} checked={value} onChange={onChange}>
                    I have read and agree to the <a>Terms of Service</a> and Privacy Policy
                  </Checkbox>
                </div>
              )}
            </Field> */}
            <Button className={style.confirm} size="medium" loading={loading} type="submit">
              {t('commonNext')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Password
