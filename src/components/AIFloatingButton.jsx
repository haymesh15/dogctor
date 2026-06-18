import { useState, useRef, useEffect } from 'react'

function DogDoctor({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#FF6B35"/>
      <ellipse cx="50" cy="88" rx="22" ry="4" fill="#D85A30" opacity="0.4"/>
      <path d="M 30 74 Q 30 56 50 56 Q 70 56 70 74 Z" fill="#fff"/>
      <circle cx="50" cy="42" r="20" fill="#D7A15C"/>
      <path d="M 50 23 A 20 20 0 0 1 70 42 L 50 42 Z" fill="#966125"/>
      <path d="M 32 33 Q 20 37 27 53 Q 34 44 33 33" fill="#B57C38"/>
      <path d="M 68 33 Q 80 37 73 53 Q 66 44 67 33" fill="#966125"/>
      <circle cx="43" cy="40" r="3" fill="#2D3748"/>
      <circle cx="57" cy="40" r="3" fill="#2D3748"/>
      <path d="M 46 46 Q 50 43 54 46 Q 50 50 46 46 Z" fill="#2D3748"/>
      <path d="M 35 30 Q 50 22 65 30 L 63 36 Q 50 30 37 36 Z" fill="#fff"/>
      <rect x="44" y="20" width="12" height="9" rx="2" fill="#fff"/>
      <circle cx="50" cy="24" r="2.5" fill="#5B9BD5"/>
      <path d="M 38 58 Q 38 70 30 72" stroke="#4A5568" strokeWidth="2.5" fill="none"/>
      <path d="M 62 58 Q 62 70 70 72" stroke="#4A5568" strokeWidth="2.5" fill="none"/>
      <circle cx="30" cy="73" r="3" fill="#5B9BD5"/>
      <circle cx="70" cy="73" r="3" fill="#5B9BD5"/>
      <circle cx="50" cy="64" r="3.5" fill="#4A5568"/>
    </svg>
  )
}

function AIFloatingButton() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Dr. Dogctor 🐾 Ask me anything about your dog\'s health, behavior, training, or nutrition.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const apiMessages = newMessages.filter(m => m.role !== 'assistant' || newMessages.indexOf(m) !== 0)
        .map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      })

      const data = await res.json()

      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not connect. Please try again.' }])
    }

    setLoading(false)
  }

  return (
    <>
      {/* הכפתור הצף */}
      {!open && (
        <button onClick={() => setOpen(true)} style={{
          position: 'fixed', bottom: '80px', right: '16px',
          width: '60px', height: '60px', borderRadius: '50%',
          border: 'none', cursor: 'pointer', padding: 0,
          boxShadow: '0 4px 16px rgba(216,90,48,0.4)', zIndex: 100,
          background: 'transparent'
        }}>
          <DogDoctor size={60} />
        </button>
      )}

      {/* חלון הצ'אט */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '0', right: '0', left: '0',
          margin: '0 auto', maxWidth: '420px',
          height: '80vh', background: '#fff',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
          zIndex: 200, display: 'flex', flexDirection: 'column',
          overflow: 'hidden'
        }}>

          {/* כותרת */}
          <div style={{ background: 'linear-gradient(135deg, #FF8C42, #FF6B35)', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <DogDoctor size={40} />
              <div>
                <p style={{ color: '#fff', fontWeight: 800, fontSize: '15px', margin: 0 }}>Dr. Dogctor</p>
                <p style={{ color: '#FFE4CC', fontSize: '11px', margin: 0 }}>AI Health Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}>×</button>
          </div>

          {/* הודעות */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#FFF8F2' }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: m.role === 'user' ? '#FF6B35' : '#fff',
                color: m.role === 'user' ? '#fff' : '#2D3748',
                padding: '10px 14px',
                borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                fontSize: '13px', lineHeight: 1.5,
                border: m.role === 'user' ? 'none' : '1px solid #FFE0CC',
                whiteSpace: 'pre-wrap'
              }}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '10px 14px', borderRadius: '16px', border: '1px solid #FFE0CC', fontSize: '13px', color: '#B0A99E' }}>
                Dr. Dogctor is typing...
              </div>
            )}
            <div ref={endRef}></div>
          </div>

          {/* תיבת הקלדה */}
          <div style={{ padding: '12px', borderTop: '1px solid #FFE0CC', display: 'flex', gap: '8px', background: '#fff' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about your dog..."
              style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #FFE0CC', borderRadius: '20px', fontSize: '13px', outline: 'none', fontFamily: 'var(--font-family)' }}
            />
            <button onClick={send} disabled={loading} style={{ background: '#FF6B35', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', flexShrink: 0 }}>↑</button>
          </div>

        </div>
      )}
    </>
  )
}

export default AIFloatingButton