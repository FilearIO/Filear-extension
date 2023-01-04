import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@views/constants'
import WelcomeHeader from '@views/components/WelcomeHeader'
import { MainCard } from '@views/components/Card'
import { AppDispatch } from '@/views/store'
import { fetchReCreateWallet, fetchUnlock } from '@/views/store/wallet'

import Password from './Password'
import Mnemonic from './Mnemonic'

import style from './style.module.scss'

enum STEP {
  MNEMONIC = 1,
  PASSWORD,
}

const Import: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [step, setStep] = useState(STEP.MNEMONIC)
  const [mnemonic, setMnemonic] = useState('')

  const onMnemonicNext = (mnemonic: string): void => {
    setMnemonic(mnemonic)
    setStep(STEP.PASSWORD)
  }

  const onPasswordNext = async (password: string): Promise<void> => {
    await dispatch(
      fetchReCreateWallet({
        password,
        mnemonic,
      }),
    )
    await dispatch(fetchUnlock(password))
    navigate(ROUTES.WELCOME_SUCCESS)
  }

  return (
    <MainCard className={style.main}>
      <WelcomeHeader />
      {step === STEP.MNEMONIC && <Mnemonic onNext={onMnemonicNext} />}
      {step === STEP.PASSWORD && <Password onNext={onPasswordNext} />}
    </MainCard>
  )
}

export default Import
