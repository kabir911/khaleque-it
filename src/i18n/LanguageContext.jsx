import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './en.json'
import de from './de.json'

const translations = { en, de }
const SUPPORTED = ['en', 'de']
const STORAGE_KEY = 'kic-lang'

const LanguageContext = createContext(null)

function detectInitialLanguage() {
  // 1. Respect an explicit user choice saved previously.
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED.includes(saved)) return saved
  } catch (_) {
    /* localStorage may be unavailable — fall through to browser detection */
  }
  // 2. Otherwise fall back to the browser language.
  const candidates = [navigator.language, ...(navigator.languages || [])]
  for (const c of candidates) {
    if (!c) continue
    const code = c.toLowerCase().split('-')[0]
    if (SUPPORTED.includes(code)) return code
  }
  return 'en'
}

// Resolve a dotted key path ("services.title") against the active dictionary.
function resolve(dict, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dict)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch (_) {
      /* ignore persistence failure */
    }
  }, [lang])

  const value = useMemo(() => {
    // t() returns the translated string, falling back to English, then the key.
    const t = (key) => {
      const primary = resolve(translations[lang], key)
      if (primary !== undefined) return primary
      const fallback = resolve(translations.en, key)
      return fallback !== undefined ? fallback : key
    }
    const toggle = () => setLang((l) => (l === 'en' ? 'de' : 'en'))
    return { lang, setLang, toggle, t }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
