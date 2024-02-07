import React, { Dispatch, FC, createContext, useReducer } from 'react'

// eslint-disable-next-line no-restricted-syntax, no-shadow
export enum ReducerTypes {
  setData = 'SET_DATA',
  setStep = 'SET_STEP',
}

type Action =
  | {
      type: ReducerTypes.setData
      data: Record<string, unknown>
    }
  | {
      type: ReducerTypes.setStep
      step: number
    }

export type DefaultValue = [Record<string, unknown>, Dispatch<Action>]

export const FormContext = createContext<DefaultValue>([{}, () => {}])

const reducer = (state: Record<string, unknown>, action: Action) => {
  console.info('State', state)
  switch (action.type) {
    case ReducerTypes.setData:
      return { ...state, ...action.data }

    case ReducerTypes.setStep:
      return { ...state, step: action.step }

    default:
      return state
  }
}

const FormContextProvider: FC = ({ children }) => {
  const value = useReducer(reducer, {})

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export default FormContextProvider
