import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AIFloatingButton from '../components/AIFloatingButton'

function DailyLogPage() {
  const navigate = useNavigate()
  const [logged, setLogged] = useState({ Food: true, Water: false, Walk: false, Bathroom: false })
  const [mood, setMood] = useState(1)

  const toggleLog = (key) => setLogged(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', paddingBottom: '70px', position: 'relative', overflow: 'hidden' }}>

      {/* רקע כפות */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.06 }}>
        {[
          { top: '5%', left: '5%', size: 80 },
          { top: '15%', right: '8%', size: 50 },
          { top: '40%', left: '3%', size: 60 },
          { top: '60%', right: '5%', size: 70 },
          { top: '80%', left: '10%', size: 50 },
        ].map((pos, i) => (
          <svg key={i} width={pos.size} height={pos.size} viewBox="0 0 60 60"
            style={{ position: 'absolute', top: pos.top, left: pos.left, right: pos.right }}>
            <ellipse cx="20" cy="12" rx="7" ry="10" fill="#FF8C42"/>
            <ellipse cx="40" cy="12" rx="7" ry="10" fill="#FF8C42"/>
            <ellipse cx="10" cy="28" rx="6" ry="9" fill="#FF8C42"/>
            <ellipse cx="50" cy="28" rx="6" ry="9" fill="#FF8C42"/>
            <path d="M30 24c-14 0-22 7-20 22 2 10 9 16 20 16s18-6 20-16c2-15-6-22-20-22z" fill="#FF8C42"/>
          </svg>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span onClick={() => navigate('/dashboard')} style={{ color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>Back</span>
          <h2 style={{ fontSize: 'var(--font-size-h2)', fontWeight: 800 }}>Daily log</h2>
          <span style={{ fontSize: '11px', background: '#FFF0E8', color: 'var(--color-primary)', padding: '3px 10px', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>Buddy</span>
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['Mon', 'Tue', 'Today', 'Thu', 'Fri'].map(day => (
              <button key={day} style={{
                flex: 1, padding: '6px 4px',
                background: day === 'Today' ? 'linear-gradient(135deg, #FF8C42, #FF6B35)' : 'var(--color-surface)',
                color: day === 'Today' ? 'white' : 'var(--color-text-muted)',
                border: day === 'Today' ? 'none' : '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-pill)',
                fontSize: 'var(--font-size-caption)',
                fontWeight: 700,
                fontFamily: 'var(--font-family)',
                cursor: 'pointer'
              }}>{day}</button>
            ))}
          </div>

          <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Quick log</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { icon: '🍖', label: 'Food' },
              { icon: '💧', label: 'Water' },
              { icon: '🚶', label: 'Walk' },
              { icon: '🚽', label: 'Bathroom' },
            ].map(item => (
              <div key={item.label} onClick={() => toggleLog(item.label)} style={{
                background: logged[item.label] ? '#F0FFF6' : 'var(--color-surface)',
                border: `1.5px solid ${logged[item.label] ? '#38A169' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '12px 8px',
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{item.icon}</div>
                <p style={{ fontWeight: 700, fontSize: 'var(--font-size-body)' }}>{item.label}</p>
                <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 600, color: logged[item.label] ? '#38A169' : 'var(--color-text-muted)' }}>
                  {logged[item.label] ? 'Logged ✓' : 'Tap to log'}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Mood</p>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['😄', '😊', '😴', '🤒'].map((emoji, i) => (
              <button key={emoji} onClick={() => setMood(i)} style={{
                flex: 1, padding: '8px',
                background: mood === i ? 'linear-gradient(135deg, #FF8C42, #FF6B35)' : 'var(--color-surface)',
                border: mood === i ? 'none' : '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '18px',
                cursor: 'pointer'
              }}>{emoji}</button>
            ))}
          </div>

          <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '12px' }}>
            <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Notes (optional)</p>
            <textarea placeholder="Add anything unusual..." style={{
              width: '100%', border: 'none', outline: 'none',
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              background: 'transparent',
              resize: 'none', height: '60px'
            }} />
          </div>

          <button onClick={() => navigate('/dashboard')} style={{
            width: '100%', padding: '12px',
            background: 'linear-gradient(135deg, #FF8C42, #FF6B35)',
            color: 'white', border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: '13px', fontWeight: 700,
            fontFamily: 'var(--font-family)',
            cursor: 'pointer'
          }}>
            Save log
          </button>

        </div>
      </div>

      <Navbar />
      <AIFloatingButton />
    </div>
  )
}

export default DailyLogPage