import React, {
  Dispatch,
  FC,
  createContext,
  useContext,
  useReducer,
} from 'react'

type Action =
  | {
      type: 'SET_DATA'
      data: Record<string, unknown>
    }
  | {
      type: 'NEXT_STEP' | 'BACK_STEP'
    }

export type State = { step: number } & Record<string, unknown>

export type DefaultValue = [State, Dispatch<Action>]

export const INITIAL_STEP = 1

export const FormContext = createContext<DefaultValue>([
  { step: INITIAL_STEP },
  () => {},
])

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, ...action.data }

    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 }

    case 'BACK_STEP':
      return { ...state, step: state.step - 1 }

    default:
      return state
  }
}

export const useForm = () => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('useForm must be used within a FormProvider')
  }

  return context
}

const FormContextProvider: FC = ({ children }) => {
  const value = useReducer(reducer, { step: INITIAL_STEP })

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export default FormContextProvider
