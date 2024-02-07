import React from 'react'
import { Input } from 'vtex.styleguide'

import useInput from '../../hooks/useInput'

const stepThree = () => {
  const [state, handleInputChange] = useInput()

  return (
    <fieldset className="pa5">
      <legend>Organization Administrator: </legend>
      <Input
        placeholder="Admin Name"
        name="adminName"
        size="small"
        label="Admin name"
        onChange={handleInputChange}
        value={'adminName' in state ? state.adminName : ''}
        className="ma4"
      />
      <span className="ma4" />
      <Input
        placeholder="Admin Last Name"
        name="adminLastName"
        size="small"
        label="Admin Last Name"
        onChange={handleInputChange}
        value={'adminLastName' in state ? state.organizationName : ''}
      />
      <span className="ma4" />
      <Input
        placeholder="Admin email"
        name="adminEmail"
        size="small"
        label="Admin email"
        onChange={handleInputChange}
        value={'adminEmail' in state ? state.adminEmail : ''}
        type="email"
      />
    </fieldset>
  )
}

export default stepThree
