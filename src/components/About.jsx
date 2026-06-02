import { useLang } from '../i18n/LanguageContext.jsx'

export default function About() {
  const { t } = useLang()
  const points = [t('about.point1'), t('about.point2'), t('about.point3')]

  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <div className="container-narrow grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">{t('about.eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            {t('about.title')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-600">{t('about.body')}</p>
        </div>

        <ul className="grid gap-4">
          {points.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-navy-50/50 p-5"
            >
              <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-amber-500 font-bold text-white">
                {i + 1}
              </span>
              <span className="text-navy-700">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
