import { ChangeEvent } from 'react'

import { useForm } from '../../context/FormCtx'

const useInput = () => {
  const [state, dispatch] = useForm()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    dispatch({ type: 'SET_DATA', data: { [name]: value } })
  }

  return [state, handleInputChange]
}

export default useInput
