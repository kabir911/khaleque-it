import React, { useState, useEffect, useRef } from 'react';
// Import the configuration block from your project's shared config file
import { useLang } from '../i18n/LanguageContext.jsx'

export default function ChatWidget() {
  const { t } = useLang()
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState('ollama'); 

  const CHAT_CONFIG = JSON.parse(import.meta.env.VITE_CHATCONFIG);

    // Track the user-provided Gemini API key
  const [userGeminiKey, setUserGeminiKey] = useState('');
  const [keyInput, setKeyInput] = useState('');

   // Track whether the user is explicitly editing an existing key
  const [isEditingKey, setIsEditingKey] = useState(false);

  const messagesEndRef = useRef(null);

  // Load saved Gemini key from localStorage on initialization
  useEffect(() => {
    const savedKey = localStorage.getItem('user_gemini_api_key');
    if (savedKey) {
      setUserGeminiKey(savedKey);
      setKeyInput(savedKey);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]); // Added loading dependency to scroll when dots appear

  // Inject pulsing animation keyframes directly into the document head
  useEffect(() => {
    const styleId = "chat-typing-animation-styles";
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement("style");
      styleTag.id = styleId;
      styleTag.innerText = `
        @keyframes chatPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .chat-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 0 3px;
          background-color: #6c757d;
          border-radius: 50%;
          animation: chatPulse 1.2s infinite ease-in-out;
        }
        .chat-dot:nth-child(2) { animation-delay: 0.2s; }
        .chat-dot:nth-child(3) { animation-delay: 0.4s; }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  // Handler to save the custom user API key
  const handleSaveKey = (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    localStorage.setItem('user_gemini_api_key', keyInput.trim());
    setUserGeminiKey(keyInput.trim());
    setIsEditingKey(false); // Turn off editing mode once saved
  };
  
  const handleEditKeyClick = () => {
    setIsEditingKey(true);
  };

  const handleCancelEdit = () => {
    setKeyInput(userGeminiKey); // Revert back to original saved key text
    setIsEditingKey(false);
  };

  // Handler to clear/remove the custom API key
  const handleClearKey = () => {
    localStorage.removeItem('user_gemini_api_key');
    setUserGeminiKey('');
    setKeyInput('');
  };

  // Handler to clear chat memory
  const handleClearChat = () => {
    if (window.confirm(t("chat.clear"))) {
      setMessages([]);
    }
  };

  // Handler for Local Ollama API Calls
  const callOllamaAPI = async (chatHistory, userMsg) => {
    const { host, model } = CHAT_CONFIG.ollama;
    
    const response = await fetch(`${host}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        messages: [...chatHistory, userMsg],
        stream: false
      }),
    });
    
    if (!response.ok) throw new Error(`Ollama server responded with status ${response.status}`);
    const data = await response.json();
    return data.message.content;
  };

  // Handler for Google Gemini API Calls
  const callGeminiAPI = async (chatHistory, userMsg) => {
    const { url, model } = CHAT_CONFIG.gemini;
    const key = userGeminiKey; 

    const messages = [...chatHistory, userMsg].map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      content: msg.content
    }));

    const response = await fetch(
      `${url}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          model,
          messages
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Gemini API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Malformed response structure from Gemini API");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let replyText = "";
      if (provider === 'ollama') {
        replyText = await callOllamaAPI(messages, userMessage);
      } else {
        replyText = await callGeminiAPI(messages, userMessage);
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: replyText }]);
    } catch (error) {
      console.error(`${provider} request failed:`, error);
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${error.message || 'Connection failure'}` }]);
    } finally {
      setLoading(false);
    }
  };

  const showKeyPrompt = false;

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, fontFamily: 'sans-serif' }}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', fontSize: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        >
          {provider === 'ollama' ? '🦙' : '✨'}
        </button>
      )}

      {/* Chat Window Frame */}
      {isOpen && (
        <div style={{ width: '350px', height: '480px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 5px 25px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #eee' }}>
          
          {/* Header Bar */}
          <div style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Provider Selection Dropdown */}
            <select 
              value={provider} 
              onChange={(e) => setProvider(e.target.value)}
              disabled={loading}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                padding: '6px 10px', 
                fontSize: '13px', 
                fontWeight: 'bold', 
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ollama" style={{ color: '#333' }}>🦙 {t("chat.localOllama")}</option>
              <option value="gemini" style={{ color: '#333' }}>✨ {t("chat.gemini")}</option>
            </select>

            {/* Action Buttons (Clear & Close) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              
              {/* Clear Chat Button */}
              {messages.length > 0 && !showKeyPrompt && (
                <button 
                  onClick={handleClearChat} 
                  title={t("chat.clearhistory")}
                  style={{ background: 'none', border: 'none', color: 'white', fontSize: '16px', cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.2s', padding: '0' }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                >
                  🗑️
                </button>
              )}
              
              {/* Close Button */}
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer', padding: '0', lineHeight: '1' }}>×</button>
            </div>
          </div>

          {/* Messages Container */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#f9f9f9' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: msg.role === 'user' ? '#007bff' : '#e9ecef',
                  color: msg.role === 'user' ? 'white' : '#333',
                  wordWrap: 'break-word'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                <div style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#e9ecef' }}>
                  <span className="chat-dot"></span>
                  <span className="chat-dot"></span>
                  <span className="chat-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Key Management Section */}
          {showKeyPrompt && (
            <div style={{ padding: '10px 15px', backgroundColor: '#fff3cd', borderTop: '1px solid #ffc107', fontSize: '13px' }}>
              <p style={{ margin: '0 0 8px 0', color: '#856404' }}>{t("chat.geminiKeyRequired")}</p>
              <form onSubmit={handleSaveKey} style={{ display: 'flex', gap: '5px' }}>
                <input 
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder={t("chat.enterApiKey")}
                  style={{ flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #ffc107', fontSize: '12px' }}
                />
                <button type="submit" style={{ padding: '6px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                  {t("chat.save")}
                </button>
              </form>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} style={{ padding: '12px', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              disabled={loading || showKeyPrompt}
              style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <button 
              type="submit"
              disabled={loading || showKeyPrompt}
              style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', opacity: (loading || showKeyPrompt) ? 0.5 : 1 }}
            >
              {loading ? '...' : '→'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
