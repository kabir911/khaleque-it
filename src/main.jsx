import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import './index.css'

const script = document.createElement('script');
script.type = 'module';
document.head.appendChild(script);

// HashRouter is used so deep links (e.g. /#/impressum) work on GitHub Pages
// without needing server-side rewrite rules.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <HashRouter>
          <App />
      </HashRouter>
    </LanguageProvider>
  </React.StrictMode>,
)
