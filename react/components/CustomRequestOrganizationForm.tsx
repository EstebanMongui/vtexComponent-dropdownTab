import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useMutation } from 'react-apollo'
import { Input, Button, RadioGroup, Box } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import './styles.css'

import CreateOrganizationRequest from '../graphql/createOrganizationRequest.graphql'

const CSS_HANDLES = ['buttonsSet', 'spacing'] as const

const CustomRequestOrganizationForm = () => {
  const LAST_STEP = 4
  const INITIAL_STEP = 1

  const handles = useCssHandles(CSS_HANDLES)
  const [userType, setUserType] = useState(0)
  const [step, setStep] = useState(INITIAL_STEP)
  const [organizationData, setOrganizationData] = useState({})

  const [createOrganizationRequest] = useMutation(CreateOrganizationRequest)

  const isNaturalPerson: boolean = userType === 0
  const handleRadioClick = () => {
    if (!isNaturalPerson) return setUserType(0)

    return setUserType(1)
  }

  const sendRequest = () => {
    createOrganizationRequest({
      variables: {
        ...organizationData,
      },
    })
  }

  const handleSteps = () => {
    console.info('handling step...')
    setStep((currentStep) => (currentStep += 1))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setOrganizationData({ ...organizationData, [name]: [value] })
  }

  useEffect(() => {
    console.info(organizationData)
  }, [organizationData])

  const stepOne = (
    <fieldset className="pa5">
      <legend>Select a kind of user:</legend>

      <RadioGroup
        hideBorder
        name="paymentMethods"
        options={[
          { value: 'natural', label: 'Natural' },
          { value: 'juridic', label: 'Juridic' },
        ]}
        value={!isNaturalPerson ? 'natural' : 'juridic'}
        onChange={handleRadioClick}
      />
    </fieldset>
  )

  const stepTwo = (
    <fieldset className="pa5">
      <legend>Organization data:</legend>
      <Input
        placeholder={`${!isNaturalPerson ? 'Name' : 'Organization Name'}`}
        name="organizationName"
        size="small"
        label={`Enter your ${!isNaturalPerson ? '' : 'corporative'} name`}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        className="ma4"
      />
      <span className="ma4" />
      <Input
        placeholder="Commercial name"
        name="organizationName"
        size="small"
        label="Commercial name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
      />
      <span className="ma4" />
      {isNaturalPerson && (
        <Input
          placeholder="TIN"
          name="organizationName"
          size="small"
          label="Tax Identification Number"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          className="ma4"
        />
      )}
    </fieldset>
  )

  const stepThree = (
    <fieldset className="pa5">
      <legend>Organization Administrator: </legend>
      <Input
        placeholder="Admin Name"
        name="AdminName"
        size="small"
        label="Admin name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        className="ma4"
      />
      <span className="ma4" />
      <Input
        placeholder="Admin Last Name"
        name="AdminLastName"
        size="small"
        label="Admin Last Name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
      />
      <span className="ma4" />
      <Input
        placeholder="Admin email"
        name="AdminEmail"
        size="small"
        label="Admin email"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        type="email"
      />
    </fieldset>
  )

  const stepFour = (
    <fieldset className="pa5">
      <legend> Standard Const Center </legend>
      <Input
        placeholder="Cost center name"
        name="CostCenterName"
        size="small"
        label="Cost center name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
      />
      <span className="ma4" />
      <Input
        placeholder="Phone number"
        name="Cost Center Phone Number"
        size="small"
        label="Cost center's phone number"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        type="phone"
      />
      <span className="ma4" />
      <Input
        placeholder="Country"
        name="CostCenterCountry"
        size="small"
        label="Cost Center Country"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
      />
      <span className="ma4" />
      <Input
        placeholder="Department"
        name="CostCenterDepartment"
        size="small"
        label="Cost Center Department"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
      />
      <span className="ma4" />
      <Input
        placeholder="City"
        name="CostCenterCity"
        size="small"
        label="Cost Center City"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
      />
      <span className="ma4" />
      <Input
        placeholder="Address"
        name="CostCenterAddress"
        size="small"
        label="Cost Center Address"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
      />
      <span className="ma4" />
      <Input
        placeholder="Receiver"
        name="Receiver"
        size="small"
        label="Receiver"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
      />
      <span className="ma4" />
    </fieldset>
  )

  const handleBackButtonClick = () =>
    setStep((currentStep) => (currentStep -= 1))

  const handleMainButtonClick = step < LAST_STEP ? handleSteps : sendRequest

  const formSteps: { [key: number]: ReactElement } = {
    1: stepOne,
    2: stepTwo,
    3: stepThree,
    4: stepFour,
  }

  return (
    <Box>
      <h1>Powered by Tebi</h1>
      {formSteps[step]}
      <div className="mt7" />
      <span className={`ma5 ${handles.buttonsSet}`}>
        <Button
          disabled={step === INITIAL_STEP}
          onClick={handleBackButtonClick}
        >{`${'< Back'}`}</Button>
        <Button onClick={handleMainButtonClick}>
          {step < LAST_STEP ? 'Next >' : 'Send Request'}
        </Button>
      </span>
    </Box>
  )
}

export default CustomRequestOrganizationForm
