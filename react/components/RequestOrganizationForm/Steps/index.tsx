import React, { ReactElement } from 'react'

import StepOne from './stepOne'
import StepThree from './stepThree'
import StepFour from './stepFour'
import StepTwo from './stepTwo'

export const formSteps: { [key: number]: ReactElement } = {
  1: <StepOne />,
  2: <StepTwo />,
  3: <StepThree />,
  4: <StepFour />,
}
