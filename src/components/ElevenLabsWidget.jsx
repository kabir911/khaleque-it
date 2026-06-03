import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx'; 

export default function ElevenLabsWidget() {
  const { lang } = useLang(); 

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
      language="{lang}"      
      >
    </elevenlabs-convai>
  );
}
