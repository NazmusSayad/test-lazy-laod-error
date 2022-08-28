import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import React from 'react'

const rootElement = document.getElementById('Root')
const root = createRoot(rootElement)

root.render(<App />)
