import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './component/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ErrorBoundary>
      {/* Please do not comment till after payment */}
      {/* <App /> */}
    </ErrorBoundary>
  </StrictMode>,
)
