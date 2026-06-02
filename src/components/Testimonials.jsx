import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${count} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < count ? 'text-amber-400' : 'text-navy-200'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t, lang } = useLang()
  const [items, setItems] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Testimonials are read at runtime from a JSON file in /public/data,
    // so they can be edited without rebuilding the app.
    const url = `${import.meta.env.BASE_URL}data/testimonials.json`
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load testimonials')
        return r.json()
      })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setError(true))
  }, [])

  return (
    <section id="testimonials" className="bg-white py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t('testimonials.eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 text-lg text-navy-600">{t('testimonials.subtitle')}</p>
        </div>

        {items === null && !error && (
          <p className="mt-12 text-center text-navy-400">{t('testimonials.empty')}</p>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(items || []).map((item, i) => {
            const quote = typeof item.quote === 'string' ? item.quote : item.quote?.[lang] || item.quote?.en
            return (
              <figure
                key={i}
                className="flex h-full flex-col rounded-2xl border border-navy-100 bg-navy-50/40 p-6"
              >
                <Stars count={item.rating || 5} />
                <blockquote className="mt-4 flex-1 text-navy-700">“{quote}”</blockquote>
                <figcaption className="mt-5 border-t border-navy-100 pt-4">
                  <p className="font-bold text-navy-900">{item.name}</p>
                  <p className="text-sm text-navy-500">
                    {[item.role, item.company].filter(Boolean).join(' · ')}
                  </p>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
