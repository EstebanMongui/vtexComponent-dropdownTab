import React, { useEffect } from 'react'
import { Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { useMutation } from 'react-apollo'

import CREATE_ORGANIZATION_REQUEST from '../../graphql/createOrganization.graphql'
import { INITIAL_STEP, useForm } from '../../context/FormCtx'

import './styles.css'
import { parseOrganizationRequestData } from '../utils/parseOrganizationData'

const CSS_HANDLES = ['buttonsSet'] as const
const LAST_STEP = 4

const NavigationButtons = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const [state, dispatch] = useForm()
  const { step } = state
  const [createOrganizationRequest] = useMutation(CREATE_ORGANIZATION_REQUEST)

  const isLastStep = !(step < LAST_STEP)

  useEffect(() => {
    console.info('state', step, state)
  }, [step])

  const handleBackButtonClick = () => dispatch({ type: 'BACK_STEP' })
  const handleMainButtonClick = () => {
    if (isLastStep)
      return createOrganizationRequest({
        variables: {
          input: parseOrganizationRequestData(state),
        },
      })

    return dispatch({ type: 'NEXT_STEP' })
  }

  return (
    <span className={`ma5 ${handles.buttonsSet}`}>
      <Button
        disabled={step === INITIAL_STEP}
        onClick={handleBackButtonClick}
      >{`< Back`}</Button>
      <Button onClick={handleMainButtonClick}>
        {!isLastStep ? 'Next >' : 'Send Request'}
      </Button>
    </span>
  )
}

export default NavigationButtons
