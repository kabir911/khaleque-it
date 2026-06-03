import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { ConversationProvider } from '@elevenlabs/react'
import './index.css'

const script = document.createElement('script');
script.type = 'module';
script.src = 'https://jsdelivr.net';
document.head.appendChild(script);

// HashRouter is used so deep links (e.g. /#/impressum) work on GitHub Pages
// without needing server-side rewrite rules.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <HashRouter>
        <ConversationProvider>
          <App />
        </ConversationProvider>
      </HashRouter>
    </LanguageProvider>
  </React.StrictMode>,
)
