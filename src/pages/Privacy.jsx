import { useLang } from '../i18n/LanguageContext.jsx'
import LegalLayout, { LegalSection } from '../components/LegalLayout.jsx'

export default function Privacy() {
  const { t } = useLang()

  const sections = [
    ['controllerHeading', 'controllerBody'],
    ['hostingHeading', 'hostingBody'],
    ['collectHeading', 'collectBody'],
    ['captchaHeading', 'captchaBody'],
    ['cookiesHeading', 'cookiesBody'],
    ['rightsHeading', 'rightsBody'],
    ['sslHeading', 'sslBody'],
  ]

  return (
    <LegalLayout title={t('privacy.title')} showPlaceholderBanner>
      <p>{t('privacy.intro')}</p>
      {sections.map(([h, b]) => (
        <LegalSection key={h} heading={t(`privacy.${h}`)}>
          <p>{t(`privacy.${b}`)}</p>
        </LegalSection>
      ))}
    </LegalLayout>
  )
}
