import React from 'react'
import { Box } from 'vtex.styleguide'

import FormContextProvider from '../context/FormCtx'
import NavigationButtons from './RequestOrganizationForm/NavigationButtons'
import StepsResolver from './RequestOrganizationForm/Steps/StepsResolver'

const CustomRequestOrganizationForm = () => {
  return (
    <FormContextProvider>
      <Box>
        <StepsResolver />
        <div className="mt7" />
        <NavigationButtons />
      </Box>
    </FormContextProvider>
  )
}

export default CustomRequestOrganizationForm
