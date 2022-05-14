import { createContext, useEffect, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INIT_STATE = {
  error: false,
  isLoading: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
}

export const AuthContext = createContext(INIT_STATE)

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INIT_STATE)

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
