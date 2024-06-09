import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import React from 'react'
import { Provider } from 'react-redux'
import { AuthProvider } from '../../context/auth.context'
import { store } from '../../store/store'

const queryClient = new QueryClient()

export function BaseProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>{children}</Provider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

BaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
