import React, { Component } from 'react'

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from './ErrorBoundary.styles'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError(error) {
    // process the error
    return {
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log('error: ', error)
    console.log('errorInfo: ', errorInfo)
  }

  render() {
    return this.state.hasError ? (
      <ErrorImageOverlay>
        <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
        <ErrorImageText>Sorry this page is broken</ErrorImageText>
      </ErrorImageOverlay>
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary
