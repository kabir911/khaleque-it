import { useLang } from '../i18n/LanguageContext.jsx'

function Check() {
  return (
    <svg className="mt-0.5 h-5 w-5 flex-none text-amber-500" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function Pricing() {
  const { t } = useLang()
  const tiers = t('pricing.tiers')

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="pricing" className="bg-navy-50/60 py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t('pricing.eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 text-lg text-navy-600">{t('pricing.subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {(Array.isArray(tiers) ? tiers : []).map((tier, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl border p-7 shadow-xs ${
                tier.highlight
                  ? 'border-amber-400 bg-white ring-2 ring-amber-400 lg:-mt-3 lg:mb-0'
                  : 'border-navy-100 bg-white'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {tier.cta}
                </span>
              )}
              <h3 className="text-lg font-bold text-navy-900">{tier.name}</h3>
              <p className="mt-1 text-sm text-navy-500">{tier.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                {tier.discountedPrice === '' && (
                  <div>
                    <span className="text-3xl font-extrabold text-navy-900">{tier.price}</span>
                    <span className="text-sm font-medium text-navy-500">{tier.unit}</span>
                  </div>)}
                {tier.discountedPrice !== '' && (
                  <div>
                  <span className="text-3xl font-extrabold text-navy-900">{tier.price}</span>                  
                  &nbsp;{t('pricing.or')}&nbsp;
                  <span className="text-3xl font-extrabold text-navy-900">{tier.discountedPrice}</span>
                  <span className="text-sm font-medium text-navy-500">{tier.unit}</span>
                  &nbsp;<span className="text-sm font-medium text-navy-500">{tier.discountedText}</span>
                  </div>
                )}                
              </div>
              <p className="mt-1 text-xs text-navy-400">{tier.altPrice}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {(tier.features || []).map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-navy-700">
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`mt-7 w-full ${tier.highlight ? 'btn-primary' : 'btn-secondary'}`}
              >
                {tier.highlight ? t('nav.cta') : tier.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-navy-500">{t('pricing.currencyNote')}</p>
      </div>
    </section>
  )
}
