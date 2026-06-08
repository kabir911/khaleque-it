import { useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx'; 

export default function ElevenLabsWidget() {
  const { t } = useLang()
  
  useEffect(() => {            
    // 1. Inject the ElevenLabs widget script into the document body
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    
    document.body.appendChild(script);
    // 2. Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    // 3. Render the official web component using your unique Agent ID
    <elevenlabs-convai
      agent-id={import.meta.env.VITE_ELEVENLABS_AGENT_ID}      
      action-text={t('widget.action')}
      start-call-text={t('widget.start')}
      end-call-text={t('widget.end')}
      listen-text={t('widget.listen')}
      speak-text={t('widget.speak')}
    >
    </elevenlabs-convai>    
  );
}
