import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

const CONTACT = JSON.parse(import.meta.env.VITE_CONTACT);
const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// Load the reCAPTCHA script once and resolve when grecaptcha is ready.
let recaptchaPromise = null
function loadRecaptcha() {
  if (recaptchaPromise) return recaptchaPromise
  recaptchaPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha && window.grecaptcha.render) return resolve(window.grecaptcha)
    window.__onRecaptchaLoad = () => resolve(window.grecaptcha)
    const s = document.createElement('script')
    s.src = 'https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit'
    s.async = true
    s.defer = true
    s.onerror = reject
    document.head.appendChild(s)
  })
  return recaptchaPromise
}

const isConfigured =
  GOOGLE_SHEETS_URL && !GOOGLE_SHEETS_URL.startsWith('REPLACE_WITH')

export default function Contact() {
  const { t, lang } = useLang()
  const widgetRef = useRef(null)
  const widgetId = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  // Render the reCAPTCHA widget once the script is available.
  useEffect(() => {
    let cancelled = false
    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled || !widgetRef.current || widgetId.current !== null) return
        widgetId.current = grecaptcha.render(widgetRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          hl: lang,
        })
      })
      .catch(() => {
        /* reCAPTCHA failed to load — form will still validate other fields */
      })
    return () => {
      cancelled = true
    }
    // We intentionally render the widget only once; language change for the
    // widget chrome requires a reload, which is an acceptable trade-off.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    const form = e.target
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
      language: lang,
      page: window.location.href,
    }

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      setStatus('error')
      setErrorMsg(t('contact.errorRequired'))
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setStatus('error')
      setErrorMsg(t('contact.errorEmail'))
      return
    }

    // CAPTCHA check
    let token = ''
    try {
      token = window.grecaptcha?.getResponse(widgetId.current) || ''
    } catch (_) {
      token = ''
    }
    if (!token) {
      setStatus('error')
      setErrorMsg(t('contact.errorCaptcha'))
      return
    }
    data['g-recaptcha-response'] = token

    setStatus('sending')

    // If the destination hasn't been configured yet, surface a helpful notice
    // rather than failing silently.
    if (!isConfigured) {
      setStatus('error')
      setErrorMsg(t('contact.notConfigured'))
      window.grecaptcha?.reset(widgetId.current)
      return
    }

    try {
      const body = new FormData()
      Object.entries(data).forEach(([k, v]) => body.append(k, v))
      // Google Apps Script web apps typically don't return CORS headers, so we
      // POST with no-cors. We can't read the response, but the row is written.
      await fetch(GOOGLE_SHEETS_URL, { method: 'POST', mode: 'no-cors', body })
      setStatus('success')
      form.reset()
      window.grecaptcha?.reset(widgetId.current)
    } catch (_) {
      setStatus('error')
      setErrorMsg(t('contact.errorGeneric'))
      window.grecaptcha?.reset(widgetId.current)
    }
  }

  const field =
    'w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-900 placeholder-navy-400 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200'

  return (
    <section id="contact" className="bg-navy-950 py-16 text-white sm:py-24">
      <div className="container-narrow grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow text-amber-400">{t('contact.eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t('contact.title')}
          </h2>
          <p className="mt-4 max-w-md text-lg text-navy-200">{t('contact.subtitle')}</p>

          <div className="mt-8 space-y-3 text-navy-200">
            <p>
              {t('contact.directEmail')}{' '}
              <a href={`mailto:${CONTACT.email}`} className="font-semibold text-amber-400 hover:underline">
                {CONTACT.email}
              </a>
            </p>
            <p>{CONTACT.phone}</p>
            <p>{CONTACT.city}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 text-navy-900 shadow-xl sm:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy-900">{t('contact.successTitle')}</h3>
              <p className="mt-2 text-navy-600">{t('contact.successBody')}</p>
              <button onClick={() => setStatus('idle')} className="btn-secondary mt-6">
                ↺
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-navy-700">
                    {t('contact.name')} *
                  </label>
                  <input id="name" name="name" type="text" autoComplete="name" className={field} required />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-navy-700">
                    {t('contact.email')} *
                  </label>
                  <input id="email" name="email" type="email" autoComplete="email" className={field} required />
                </div>
                <div>
                  <label htmlFor="company" className="mb-1 block text-sm font-medium text-navy-700">
                    {t('contact.company')}
                  </label>
                  <input id="company" name="company" type="text" autoComplete="organization" className={field} />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-navy-700">
                    {t('contact.phone')}
                  </label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-navy-700">
                  {t('contact.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className={field}
                  placeholder={t('contact.messagePlaceholder')}
                  required
                />
              </div>

              <div>
                <p className="mb-2 text-sm text-navy-500">{t('contact.captchaNote')}</p>
                <div ref={widgetRef} />
              </div>

              {status === 'error' && errorMsg && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</p>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
                {status === 'sending' ? t('contact.sending') : t('contact.submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
