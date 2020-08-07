import React from 'react'

class ErrorBoundary extends React.Component {
  state = {hasError: false}

  static getDerivedStateFromError(error) {
    console.log(error)
    return {hasError: true}
  }

  componentDidCatch(error, info) {
    console.log('Logging error to extenal log service ...', error, info)
  }

  render() {
    return this.state.hasError
        ? <h1>Something went wrong.</h1>
        : this.props.children
  }
}

export default ErrorBoundary
