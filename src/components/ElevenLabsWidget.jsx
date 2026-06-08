import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx'; 

export default function ElevenLabsWidget() {
  const { t, lang } = useLang()
  const widgetRef = useRef(null)

  const setWidgetAttributes = () => {
    try {
      if (widgetRef && widgetRef.current) {
        const shadowHost = widgetRef.current.shadowRoot 
        ? widgetRef.current 
        : widgetRef.current.querySelector('*')?.shadowRoot ? widgetRef.current.querySelector('*') : null;

        if (shadowHost && shadowHost.shadowRoot) {
          const childDivAction = shadowHost.shadowRoot.querySelector('div.text-sm.max-w-64'); 
          if (childDivAction) {
            childDivAction.textContent = t('widget.action');
          }
          const childDivStartCall = shadowHost.shadowRoot.querySelector('span.block.whitespace-nowrap.max-w-64.truncate.px-1\\.5'); 
          if (childDivStartCall) {
            childDivStartCall.textContent = t('widget.start');
          }          
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  const observer = new MutationObserver((mutations, obs) => {
    // Check if the script added elements inside your container
    setWidgetAttributes();
    obs.disconnect();     
  });
  
  useEffect(() => {            
    // 1. Inject the ElevenLabs widget script into the document body
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    
    document.body.appendChild(script);

    script.onload = () => {
      observer.observe(widgetRef.current.shadowRoot, { childList: true, subtree: true });      
    };
    // 2. Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setWidgetAttributes();
  }, [lang])

  return (
    // 3. Render the official web component using your unique Agent ID
    <elevenlabs-convai
      ref={widgetRef}
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
