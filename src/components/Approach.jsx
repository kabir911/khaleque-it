import { useLang } from '../i18n/LanguageContext.jsx'

export default function Approach() {
  const { t } = useLang()
  const steps = t('approach.steps')

  return (
    <section id="approach" className="bg-white py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t('approach.eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            {t('approach.title')}
          </h2>
          <p className="mt-4 text-lg text-navy-600">{t('approach.subtitle')}</p>
        </div>

        <div className="relative mt-14 grid gap-8 lg:grid-cols-3">
          {/* connecting line on large screens */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-navy-100 lg:block" />
          {(Array.isArray(steps) ? steps : []).map((s, i) => (
            <div key={i} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-500 bg-white text-xl font-extrabold text-amber-600">
                {i + 1}
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy-900">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-navy-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
