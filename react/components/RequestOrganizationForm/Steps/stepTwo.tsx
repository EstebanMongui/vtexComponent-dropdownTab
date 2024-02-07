import React from 'react'
import { Input } from 'vtex.styleguide'

import useInput from '../../hooks/useInput'

const StepTwo = () => {
  const [state, handleInputChange] = useInput()
  const isNaturalPerson =
    'userType' in state ? state.userType === 'natural' : true

  return (
    <fieldset className="pa5">
      <legend>Organization data:</legend>
      <Input
        placeholder={`${isNaturalPerson ? 'Name' : 'Organization Name'}`}
        name="organizationName"
        size="small"
        label={`Enter your ${isNaturalPerson ? '' : 'corporative'} name`}
        onChange={handleInputChange}
        value={'organizationName' in state ? state.organizationName : ''}
        className="ma4"
      />
      <span className="ma4" />
      <Input
        placeholder="Commercial name"
        name="commercialName"
        size="small"
        label="Commercial name"
        onChange={handleInputChange}
        value={'commercialName' in state ? state.commercialName : ''}
      />
      <span className="ma4" />
      {isNaturalPerson && (
        <Input
          placeholder="TIN"
          name="tin"
          size="small"
          label="Tax Identification Number"
          onChange={handleInputChange}
          value={'tin' in state ? state.tin : ''}
          className="ma4"
        />
      )}
    </fieldset>
  )
}

export default StepTwo
