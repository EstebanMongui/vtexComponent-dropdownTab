import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useMutation } from 'react-apollo'
import { Input, Button, RadioGroup, Box } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import './styles.css'

import CreateOrganizationRequest from '../graphql/createOrganizationRequest.graphql'
import FormContextProvider, {
  DefaultValue,
  FormContext,
  ReducerTypes,
} from '../context/FormCtx'

const CSS_HANDLES = ['buttonsSet', 'spacing'] as const

const CustomRequestOrganizationForm = () => {
  const LAST_STEP = 4
  const INITIAL_STEP = 1

  const handles = useCssHandles(CSS_HANDLES)
  const [userType, setUserType] = useState(0)
  const [organizationData] = useState({})

  const [createOrganizationRequest] = useMutation(CreateOrganizationRequest)
  const ctx: DefaultValue = useContext(FormContext)

  const [contextState, dispatch] = ctx

  useEffect(() => {
    console.info(contextState)
  }, [contextState])

  const isNaturalPerson: boolean = useMemo(() => userType === 0, [userType])
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

  const currentStep =
    'step' in contextState && typeof contextState.step === 'number'
      ? contextState.step
      : 1

  const handleSteps = () => {
    dispatch({
      type: ReducerTypes.setStep,
      step: currentStep + 1,
    })
  }

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
      <Input
        placeholder={`${!isNaturalPerson ? 'Name' : 'Organization Name'}`}
        type="file"
        multiple
        name="organizationName"
        size="small"
        label={`Enter your ${!isNaturalPerson ? '' : 'corporative'} name`}
        className="ma4"
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
        className="ma4"
      />
      <span className="ma4" />
      <Input
        placeholder="Commercial name"
        name="organizationName"
        size="small"
        label="Commercial name"
      />
      <span className="ma4" />
      {isNaturalPerson && (
        <Input
          placeholder="TIN"
          name="organizationName"
          size="small"
          label="Tax Identification Number"
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
        className="ma4"
      />
      <span className="ma4" />
      <Input
        placeholder="Admin Last Name"
        name="AdminLastName"
        size="small"
        label="Admin Last Name"
      />
      <span className="ma4" />
      <Input
        placeholder="Admin email"
        name="AdminEmail"
        size="small"
        label="Admin email"
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
      />
      <span className="ma4" />
      <Input
        placeholder="Phone number"
        name="Cost Center Phone Number"
        size="small"
        label="Cost center's phone number"
        type="phone"
      />
      <span className="ma4" />
      <Input
        placeholder="Country"
        name="CostCenterCountry"
        size="small"
        label="Cost Center Country"
      />
      <span className="ma4" />
      <Input
        placeholder="Department"
        name="CostCenterDepartment"
        size="small"
        label="Cost Center Department"
      />
      <span className="ma4" />
      <Input
        placeholder="City"
        name="CostCenterCity"
        size="small"
        label="Cost Center City"
      />
      <span className="ma4" />
      <Input
        placeholder="Address"
        name="CostCenterAddress"
        size="small"
        label="Cost Center Address"
      />
      <span className="ma4" />
      <Input
        placeholder="Receiver"
        name="Receiver"
        size="small"
        label="Receiver"
      />
      <span className="ma4" />
    </fieldset>
  )

  const handleBackButtonClick = () =>
    dispatch({ type: ReducerTypes.setStep, step: currentStep - 1 })

  const handleMainButtonClick =
    currentStep < LAST_STEP ? handleSteps : sendRequest

  const formSteps: { [key: number]: ReactElement } = {
    1: stepOne,
    2: stepTwo,
    3: stepThree,
    4: stepFour,
  }

  return (
    <FormContextProvider>
      <Box>
        {formSteps[currentStep]}
        <div className="mt7" />
        <span className={`ma5 ${handles.buttonsSet}`}>
          <Button
            disabled={currentStep === INITIAL_STEP}
            onClick={handleBackButtonClick}
          >{`${'< Back'}`}</Button>
          <Button onClick={handleMainButtonClick}>
            {currentStep < LAST_STEP ? 'Next >' : 'Send Request'}
          </Button>
        </span>
      </Box>
    </FormContextProvider>
  )
}

export default CustomRequestOrganizationForm
