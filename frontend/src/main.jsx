import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './i18n/i18n.js'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/common/AuthContext'

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter basename="/Bolivia-ludica">
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
