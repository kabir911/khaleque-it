import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'

// Shared wrapper for the Impressum and Privacy pages.
export default function LegalLayout({ title, children, showPlaceholderBanner = false }) {
  const { t } = useLang()
  return (
    <article className="bg-white pb-20 pt-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t('footer.backHome')}
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{title}</h1>

        {showPlaceholderBanner && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            ⚠ {t('legal.placeholderBanner')}
          </p>
        )}

        <div className="legal-prose mt-8 space-y-6 text-navy-700">{children}</div>
      </div>
    </article>
  )
}

// Small helpers for consistent legal-page typography.
export function LegalSection({ heading, children }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-navy-900">{heading}</h2>
      <div className="mt-2 space-y-2 leading-relaxed">{children}</div>
    </section>
  )
}
