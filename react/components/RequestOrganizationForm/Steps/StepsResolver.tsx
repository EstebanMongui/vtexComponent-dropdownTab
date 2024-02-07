import React from 'react'

import { formSteps } from './index'
import { DefaultValue, useForm } from '../../../context/FormCtx'

const StepsResolver = () => {
  const ctx: DefaultValue = useForm()
  const [state] = ctx
  const { step } = state

  return <>{formSteps[step]}</>
}

export default StepsResolver
