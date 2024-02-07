import React, { ChangeEvent } from 'react'
import { RadioGroup, Input } from 'vtex.styleguide'

import { useForm } from '../../../context/FormCtx'

const StepOne = () => {
  const [state, dispatch] = useForm()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target

    dispatch({ type: 'SET_DATA', data: { [name]: value } })
  }

  const typeOfUser = 'userType' in state ? state.userType : 'natural'
  const isNaturalPerson = typeOfUser === 'natural'

  return (
    <fieldset className="pa5">
      <legend>Select a kind of user:</legend>

      <RadioGroup
        hideBorder
        name="userType"
        options={[
          { value: 'natural', label: 'Natural' },
          { value: 'juridic', label: 'Juridic' },
        ]}
        value={typeOfUser}
        onChange={handleChange}
      />
      <Input
        placeholder={`${isNaturalPerson ? 'Name' : 'Organization Name'}`}
        type="file"
        multiple
        name="userType"
        size="small"
        label={`Enter your ${isNaturalPerson ? '' : 'corporative'} name`}
        className="ma4"
      />
    </fieldset>
  )
}

export default StepOne
