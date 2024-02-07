import React from 'react'
import { Input } from 'vtex.styleguide'

import useInput from '../../hooks/useInput'

const StepFour = () => {
  const [state, handleInputChange] = useInput() as any

  return (
    <fieldset className="pa5">
      <legend> Standard Const Center </legend>
      <Input
        placeholder="Cost center name"
        name="costCenterName"
        size="small"
        label="Cost center name"
        onChange={handleInputChange}
        value={'costCenterName' in state ? state.costCenterName : ''}
      />
      <span className="ma4" />
      <Input
        placeholder="Phone number"
        name="costCenterPhoneNumber"
        size="small"
        label="Cost center's phone number"
        onChange={handleInputChange}
        value={
          'costCenterPhoneNumber' in state ? state.costCenterPhoneNumber : ''
        }
        type="phone"
      />
      <span className="ma4" />
      <Input
        placeholder="Country"
        name="costCenterCountry"
        size="small"
        label="Cost Center Country"
        onChange={handleInputChange}
        value={'costCenterCountry' in state ? state.costCenterCountry : ''}
      />
      <span className="ma4" />
      <Input
        placeholder="Department"
        name="costCenterDepartment"
        size="small"
        label="Cost Center Department"
        onChange={handleInputChange}
        value={
          'costCenterDepartment' in state ? state.costCenterDepartment : ''
        }
      />
      <span className="ma4" />
      <Input
        placeholder="City"
        name="costCenterCity"
        size="small"
        label="Cost Center City"
        onChange={handleInputChange}
        value={'costCenterCity' in state ? state.costCenterCity : ''}
      />
      <span className="ma4" />
      <Input
        placeholder="Address"
        name="costCenterAddress"
        size="small"
        label="Cost Center Address"
        onChange={handleInputChange}
        value={'costCenterAddress' in state ? state.costCenterAddress : ''}
      />
      <span className="ma4" />
      <Input
        placeholder="Receiver"
        name="receiver"
        size="small"
        label="Receiver"
        onChange={handleInputChange}
        value={'receiver' in state ? state.receiver : ''}
      />
      <span className="ma4" />
    </fieldset>
  )
}

export default StepFour
