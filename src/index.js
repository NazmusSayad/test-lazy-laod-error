import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import React from 'react'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
const rootElement = document.getElementById('Root')
const root = createRoot(rootElement)

root.render(<App />)
