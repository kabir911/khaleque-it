import { useLang } from '../i18n/LanguageContext.jsx'
import LegalLayout, { LegalSection } from '../components/LegalLayout.jsx'

export default function Impressum() {
  const { t } = useLang()

  return (
    <LegalLayout title={t('impressum.title')} showPlaceholderBanner={false}>
      <p>{t('impressum.intro')}</p>

      <LegalSection heading={t('impressum.providerHeading')}>
        <p>
          Kabir Nazmul Khaleque
          <br />
          Khaleque IT Consulting
          <br />
          60594 Frankfurt am Main
          <br />
          Germany
        </p>
      </LegalSection>

      <LegalSection heading={t('impressum.contactHeading')}>
        <p>
          {t('contact.email')}: support@divm.com
        </p>
      </LegalSection>

      <LegalSection heading={t('impressum.vatHeading')}>
        <p>{t('impressum.vatBody')}</p>
        <p>USt-IdNr.: DE 189948397</p>
      </LegalSection>

      <LegalSection heading={t('impressum.responsibleHeading')}>
        <p>
          Kabir Nazmul Khaleque
          <br />
          60594 Frankfurt am Main
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
