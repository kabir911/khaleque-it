import { useLang } from '../i18n/LanguageContext.jsx'
import Icon from './Icons.jsx'

export default function Services() {
  const { t } = useLang()
  const items = t('services.items')

  return (
    <section id="services" className="bg-navy-50/60 py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t('services.eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            {t('services.title')}
          </h2>
          <p className="mt-4 text-lg text-navy-600">{t('services.subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(Array.isArray(items) ? items : []).map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white">
                <Icon name={item.icon} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
