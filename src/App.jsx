import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Impressum from './pages/Impressum.jsx'
import Privacy from './pages/Privacy.jsx'
import ChatWidget from './components/ChatWidget';
import ElevenLabsWidget from './components/ElevenLabsWidget.jsx'

// Scroll to top whenever the route (pathname) changes.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
   return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>        
      </main>      
      <Footer />
      <ElevenLabsWidget />
      <ChatWidget />
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.floatingButton}
      ></button>
      {isOpen && (
        <div style={styles.iframeContainer}>
          <iframe src="https://embed.liveavatar.com/v1/06dd7551-b9b6-40a9-b877-f630f1f32962?orientation=horizontal" allow="microphone" title="LiveAvatar Embed" style="aspect-ratio: 16/9;"></iframe>          
        </div>
      )}
    </div>
  )
}

// Inline styles for quick setup
const styles = {
  pageContainer: {
    position: 'relative',
    minHeight: '100vh',
    width: '100vw',
  },
  floatingButton: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    fontWeight: 'bold',
  },
  iframeContainer: {
    position: 'fixed',
    bottom: '80px', // Sits right above the button
    left: '50%',
    transform: 'translateX(-50%)',
    width: '350px',
    maxHeight: '500px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    zIndex: 999,
  },
};
