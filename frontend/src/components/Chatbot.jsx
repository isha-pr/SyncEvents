import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Chatbot = () => {
  const { user }   = useContext(AuthContext);
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const location = useLocation();
  const endRef   = useRef(null);

  useEffect(() => {
    setMessages([{
      sender: 'bot',
      text: user
        ? `Hi ${user.name.split(' ')[0]}! 👋 I'm your Campus Assistant. Ask me about events, bookings, or anything else!`
        : `Hi! 👋 I'm the Campus Assistant. Please log in to get personalised help.`,
    }]);
  }, [user]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, typing]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    try {
      const res = await api.post('/chat', { query: input, pageContext: location.pathname });
      setTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.response }]);
    } catch {
      setTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: '⚠️ Connection lost. Please try again.' }]);
    }
  };

  /* ── Quick-suggestion chips ── */
  const chips = ['Upcoming events', 'My bookings', 'How to register?', 'Fee details'];

  return (
    <>
      {/* Toggle button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
        title={isOpen ? 'Close' : 'Campus Assistant'}
        style={{ fontSize: isOpen ? '1.1rem' : '1.4rem' }}
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {isOpen && (
        <div className="chatbot-widget" style={{ display:'flex', flexDirection:'column', height:'480px' }}>

          {/* Header */}
          <div className="chatbot-header" style={{ flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
              <div style={{
                width:'36px', height:'36px', borderRadius:'50%',
                background:'rgba(255,255,255,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.2rem', flexShrink:0,
              }}>🤖</div>
              <div>
                <div style={{ fontWeight:800, fontSize:'0.95rem', lineHeight:1.2 }}>Campus Assistant</div>
                <div style={{ fontSize:'0.72rem', opacity:0.75, display:'flex', alignItems:'center', gap:'0.3rem' }}>
                  <span style={{ width:'7px', height:'7px', background:'#4ade80', borderRadius:'50%', display:'inline-block' }} />
                  AI-powered · Always available
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background:'rgba(255,255,255,0.15)', border:'none', color:'#fff',
                borderRadius:'8px', padding:'0.3rem 0.6rem', fontSize:'0.85rem',
                cursor:'pointer', boxShadow:'none', fontWeight:600,
              }}
            >✕</button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" style={{ flex:1, overflowY:'auto' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display:'flex',
                flexDirection: msg.sender==='user' ? 'row-reverse' : 'row',
                alignItems:'flex-end', gap:'0.5rem',
              }}>
                {/* avatar */}
                <div style={{
                  width:'28px', height:'28px', borderRadius:'50%', flexShrink:0,
                  background: msg.sender==='user' ? 'linear-gradient(135deg,#f97316,#ea580c)' : '#fff',
                  border: msg.sender==='bot' ? '1.5px solid #e5e7eb' : 'none',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.8rem',
                }}>
                  {msg.sender==='user' ? '👤' : '🤖'}
                </div>
                <div className={`msg ${msg.sender==='user' ? 'msg-user' : 'msg-bot'}`}
                  style={{ maxWidth:'76%', lineHeight:1.55 }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display:'flex', alignItems:'flex-end', gap:'0.5rem' }}>
                <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'#fff', border:'1.5px solid #e5e7eb', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', flexShrink:0 }}>🤖</div>
                <div className="msg msg-bot" style={{ padding:'0.6rem 0.9rem' }}>
                  <div style={{ display:'flex', gap:'4px', alignItems:'center', height:'16px' }}>
                    {[0,1,2].map(d => (
                      <span key={d} style={{
                        width:'7px', height:'7px', borderRadius:'50%', background:'#d1d5db',
                        display:'inline-block',
                        animation:'typingDot 1.2s ease-in-out infinite',
                        animationDelay:`${d*0.18}s`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick chips */}
          {messages.length <= 1 && (
            <div style={{
              padding:'0.6rem 0.75rem',
              display:'flex', gap:'0.4rem', flexWrap:'wrap',
              borderTop:'1px solid #f3f4f6',
              background:'#fafafa',
            }}>
              {chips.map(c => (
                <button
                  key={c}
                  onClick={() => { setInput(c); }}
                  style={{
                    background:'#fff', color:'#374151', border:'1.5px solid #e5e7eb',
                    borderRadius:'999px', padding:'0.25rem 0.75rem',
                    fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
                    boxShadow:'0 1px 4px rgba(0,0,0,0.05)',
                    transition:'all 0.15s',
                  }}
                  onMouseEnter={e=>{ e.target.style.borderColor='#f97316'; e.target.style.color='#f97316'; }}
                  onMouseLeave={e=>{ e.target.style.borderColor='#e5e7eb'; e.target.style.color='#374151'; }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <form className="chatbot-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask anything about events…"
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ fontSize:'0.88rem' }}
            />
            <button type="submit" title="Send" style={{ fontSize:'1rem' }}>➤</button>
          </form>

        </div>
      )}

      {/* Typing dot keyframe */}
      <style>{`
        @keyframes typingDot {
          0%,80%,100% { transform:scale(1); opacity:0.4; }
          40% { transform:scale(1.4); opacity:1; }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
