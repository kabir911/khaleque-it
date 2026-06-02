import { useLang } from '../i18n/LanguageContext.jsx'
import LegalLayout, { LegalSection } from '../components/LegalLayout.jsx'

export default function Impressum() {
  const { t } = useLang()

  return (
    <LegalLayout title={t('impressum.title')} showPlaceholderBanner>
      <p>{t('impressum.intro')}</p>

      <LegalSection heading={t('impressum.providerHeading')}>
        <p>
          [FULL NAME]
          <br />
          Khaleque IT Consulting
          <br />
          [STREET &amp; HOUSE NUMBER]
          <br />
          [POSTAL CODE] Frankfurt am Main
          <br />
          [COUNTRY: Germany]
        </p>
      </LegalSection>

      <LegalSection heading={t('impressum.contactHeading')}>
        <p>
          {t('contact.phone')}: [PHONE NUMBER]
          <br />
          {t('contact.email')}: [EMAIL ADDRESS]
        </p>
      </LegalSection>

      <LegalSection heading={t('impressum.vatHeading')}>
        <p>{t('impressum.vatBody')}</p>
        <p>[USt-IdNr.: DE XXXXXXXXX]</p>
      </LegalSection>

      <LegalSection heading={t('impressum.responsibleHeading')}>
        <p>
          [FULL NAME]
          <br />
          [STREET &amp; HOUSE NUMBER], [POSTAL CODE] Frankfurt am Main
        </p>
      </LegalSection>

      <LegalSection heading={t('impressum.disputeHeading')}>
        <p>{t('impressum.disputeBody')}</p>
      </LegalSection>

      <LegalSection heading={t('impressum.liabilityHeading')}>
        <p>{t('impressum.liabilityBody')}</p>
      </LegalSection>

      <LegalSection heading={t('impressum.liabilityLinksHeading')}>
        <p>{t('impressum.liabilityLinksBody')}</p>
      </LegalSection>

      <LegalSection heading={t('impressum.copyrightHeading')}>
        <p>{t('impressum.copyrightBody')}</p>
      </LegalSection>
    </LegalLayout>
  )
}
