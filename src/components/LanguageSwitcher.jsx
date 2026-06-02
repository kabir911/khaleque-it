import { useLang } from '../i18n/LanguageContext.jsx'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLang()
  const langs = [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'de', label: 'DE', full: 'Deutsch' },
  ]
  return (
    <div
      className={`inline-flex items-center rounded-full border border-navy-200 bg-white p-0.5 text-sm font-semibold ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {langs.map((l) => {
        const active = lang === l.code
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            title={l.full}
            className={`rounded-full px-3 py-1 transition ${
              active ? 'bg-navy-800 text-white' : 'text-navy-600 hover:text-navy-900'
            }`}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
