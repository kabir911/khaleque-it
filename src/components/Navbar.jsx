import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Navbar() {
  const { t } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll to an in-page section. If we're on another route (e.g. /impressum),
  // navigate home first, then scroll once the home page has rendered.
  const goToSection = (id) => {
    setOpen(false)
    const scroll = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(scroll, 60)
    } else {
      scroll()
    }
  }

  const links = [
    { id: 'services', label: t('nav.services') },
    { id: 'approach', label: t('nav.approach') },
    { id: 'pricing', label: t('nav.pricing') },
    { id: 'testimonials', label: t('nav.testimonials') },
    { id: 'contact', label: t('nav.contact') },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur' : 'bg-white/80 backdrop-blur'
      }`}
    >
      <nav className="container-narrow flex h-16 items-center justify-between">
        <button
          onClick={() => goToSection('top')}
          className="flex items-center gap-2 text-left"
          aria-label="Khaleque IT Consulting — home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 font-extrabold text-amber-500">
            K
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-extrabold text-navy-900">Khaleque IT</span>
            <span className="block text-[11px] font-medium uppercase tracking-wider text-navy-500">
              Consulting
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => goToSection(l.id)}
              className="text-sm font-medium text-navy-700 transition hover:text-amber-600"
            >
              {l.label}
            </button>
          ))}
          <LanguageSwitcher />
          <button onClick={() => goToSection('contact')} className="btn-primary !px-5 !py-2 text-sm">
            {t('nav.cta')}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 text-navy-800"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-100 bg-white lg:hidden">
          <div className="container-narrow flex flex-col gap-1 py-3">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => goToSection(l.id)}
                className="rounded-lg px-3 py-2.5 text-left font-medium text-navy-800 hover:bg-navy-50"
              >
                {l.label}
              </button>
            ))}
            <button onClick={() => goToSection('contact')} className="btn-primary mt-2">
              {t('nav.cta')}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
