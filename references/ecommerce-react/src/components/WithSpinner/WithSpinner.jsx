import React from 'react'

// styled components
import { SpinnerOverlay, SpinnerContainer } from './WithSpinner.styles'

const WithSpinner = (WrappedComponent) => ({ isLoading, ...rest }) =>
  isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...rest} />
  )

export default WithSpinner
