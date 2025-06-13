import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './i18n/i18n.js'
import { HashRouter } from 'react-router-dom'

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
