import { useConversation } from '@elevenlabs/react';

export default function VoiceAgent() {
  const conversation = useConversation({
    onConnect: () => console.log('WebRTC connection established.'),
    onDisconnect: () => console.log('WebRTC connection closed.'),
    onMessage: (message) => console.log('Agent text message received:', message),
    onError: (error) => console.error('ElevenLabs Error:', error),
  });

  // Pull your environment variable using Vite's special import syntax
  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

  const handleToggleCall = async () => {
    if (conversation.status === 'connected') {
      await conversation.endSession(); // End session instantly
    } else {
      try {
        // Explicitly request browser microphone permissions before streaming
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Establish WebRTC voice session
        await conversation.startSession({ agentId });
      } catch (error) {
        console.error('Microphone access denied or connection failed:', error);
      }
    }
  };

  return (
    <div className="p-6 border rounded-xl flex flex-col items-center gap-4 bg-slate-50 max-w-sm mx-auto shadow-sm">
      <h3 className="font-semibold text-lg text-slate-800">ElevenLabs Voice Assistant</h3>
      
      {/* Real-time agent status text readout */}
      <div className="text-sm font-medium text-slate-600">
        Status: <span className="capitalize text-blue-600 font-bold">{conversation.status}</span>
      </div>

      {/* Dynamic agent state text context hint */}
      {conversation.status === 'connected' && (
        <div className="text-xs italic text-slate-500 animate-pulse">
          {conversation.isSpeaking ? "🔴 Agent is speaking..." : "🟢 Listening to you..."}
        </div>
      )}

      {/* Primary Interaction CTA */}
      <button
        onClick={handleToggleCall}
        disabled={conversation.status === 'connecting'}
        className={`w-full py-2.5 px-4 rounded-lg font-semibold text-white transition-all ${
          conversation.status === 'connected'
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-indigo-600 hover:bg-indigo-700'
        } disabled:opacity-50`}
      >
        {conversation.status === 'connecting' && 'Connecting...'}
        {conversation.status === 'connected' && 'Disconnect Call'}
        {conversation.status === 'disconnected' && 'Start Voice Session'}
      </button>
    </div>
  );
}
