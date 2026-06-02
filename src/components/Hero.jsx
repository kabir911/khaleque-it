import { useLang } from '../i18n/LanguageContext.jsx'
// 1. Import the image at the top
import logoImage from '../assets/facepic.jpg';

export default function Hero() {
  const { t } = useLang()

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const stats = [
    { value: t('hero.stat1Value'), label: t('hero.stat1Label') },
    { value: t('hero.stat2Value'), label: t('hero.stat2Label') },
    { value: t('hero.stat3Value'), label: t('hero.stat3Label') },    
  ]

  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 text-white">
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-navy-500/30 blur-3xl" />
      </div>

      <div className="container-narrow relative grid items-center gap-12 pb-20 pt-28 lg:grid-cols-12 lg:pb-28 lg:pt-36">
        <div className="lg:col-span-7">
          <p className="eyebrow text-amber-400">{t('hero.eyebrow')}</p>
          <div className="mt-4 flex items-center gap-4">  
            <img src={logoImage} alt="consultant picture" className="mt-6 h-24 w-24 rounded-full object-cover" />
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {t('hero.title')}
            </h1>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => scrollTo('contact')} className="btn-primary">
              {t('hero.primaryCta')}
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="btn-secondary border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
              {t('hero.secondaryCta')}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="grid gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-3xl font-extrabold text-amber-400">{s.value}</p>
                <p className="mt-1 text-sm text-navy-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative">
        <svg viewBox="0 0 1440 80" className="block w-full text-white" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  )
}
