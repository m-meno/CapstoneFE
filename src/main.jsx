import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/appContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </CookiesProvider>
  </StrictMode>,
)
