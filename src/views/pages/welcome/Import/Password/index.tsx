import React, { useCallback, useState } from 'react'
import { Field, Form, Formik, FieldProps } from 'formik'

import { Button, Input, ErrorText } from '@arshare/cravis'
import useTrans from '@views/i18n/useTrans'
import { validatePassword, validatePasswordAgain } from '@views/utils/validate'
import checkError from '@views/utils/checkError'

import style from './style.module.scss'

interface PasswordProps {
  onNext: (password: string) => void
}

interface FormikValues {
  password: string
  passwordAgain: string
  checked: boolean
}

const Password: React.FC<PasswordProps> = ({ onNext }) => {
  const { t } = useTrans()
  const [loading, setLoading] = useState(false)

  const onSubmit = useCallback(
    async (values: FormikValues) => {
      try {
        setLoading(true)
        await onNext?.(values.password)
        setLoading(false)
      } catch (e) {
        setLoading(false)
      }
      onNext?.(values.password)
    },
    [onNext],
  )

  return (
    <div className={style.password}>
      <div className={style.tips}>{t('importPasswordTips')}</div>
      <Formik
        initialValues={{ password: '', passwordAgain: '', checked: false }}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
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
                    showError={meta.touched && checkError(meta.error)}
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
                    showError={meta.touched && checkError(meta.error)}
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
            <Button loading={loading} className={style.confirm} size="medium" type="submit">
              {t('commonNext')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Password
