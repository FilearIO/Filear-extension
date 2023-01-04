import React, { useEffect, useMemo, useState } from 'react'

interface TransiitonProps {
  start?: string
  active?: string
  children: (props: { className?: string; style?: React.CSSProperties; [key: string]: any }) => React.ReactElement
}

const Start = Symbol('Start')
const Active = Symbol('Active')
const STEP_QUEUE = [Start, Active]

const Transiiton: React.FC<TransiitonProps> = ({ start = '', active = '', children }) => {
  const [step, setStep] = useState<number>(0)

  const className = useMemo(() => {
    switch (STEP_QUEUE[step]) {
      case Start:
        return start
      case Active:
        return active
      default:
        return ''
    }
  }, [active, start, step])

  useEffect(() => {
    if (step === STEP_QUEUE.length - 1) return
    const timer = setTimeout(() => setStep(step + 1), 0)
    return () => {
      clearTimeout(timer)
    }
  }, [step])

  return children({ className })
}

export default React.memo(Transiiton)
