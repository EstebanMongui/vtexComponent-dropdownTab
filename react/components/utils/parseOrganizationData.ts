import { State } from '../../context/FormCtx'

export const parseOrganizationRequestData = (data: State) => ({
  name: data.organizationName,
  tradeName: data.commercialName,
  b2bCustomerAdmin: {
    firstName: data.adminName,
    lastName: data.adminLastName,
    email: data.adminEmail,
  },
  defaultCostCenter: {
    name: data.costCenterName,
    phoneNumber: data.costCenterPhoneNumber,
  },
})
