import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@views/constants'
import WelcomeHeader from '@views/components/WelcomeHeader'
import { MainCard } from '@views/components/Card'

import { AppDispatch } from '@/views/store'
import { fetchCreateWallet } from '@/views/store/wallet'

import Password from './Password'
import Mnemonic from './Mnemonic'
import Verify from './Verify'

import style from './style.module.scss'

enum STEP {
  PASSWORD = 1,
  MNEMONIC,
  VERIFY,
}

const Create: React.FC = () => {
  const [step, setStep] = useState(STEP.PASSWORD)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onPasswordNext = async (password: string): Promise<void> => {
    try {
      setLoading(true)
      await dispatch(fetchCreateWallet({ password }))
      setPassword(password)
      setStep(STEP.MNEMONIC)
    } finally {
      setLoading(false)
    }
  }

  const onMnemonicNext = (): void => {
    setStep(STEP.VERIFY)
  }

  const onVerifyNext = (): void => {
    navigate(ROUTES.WELCOME_SUCCESS)
  }

  return (
    <MainCard className={style.main}>
      <WelcomeHeader />
      {step === STEP.PASSWORD && <Password loading={loading} onNext={onPasswordNext} />}
      {step === STEP.MNEMONIC && <Mnemonic password={password} onNext={onMnemonicNext} />}
      {step === STEP.VERIFY && <Verify password={password} onNext={onVerifyNext} />}
    </MainCard>
  )
}

export default Create
