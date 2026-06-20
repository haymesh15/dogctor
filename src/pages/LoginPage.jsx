import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [isTransitioning, setIsTransitioning] = useState(false)
  const audioRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/953/953-200.wav'))

  const triggerDogTransition = () => {
    setIsTransitioning(true)
    audioRef.current.play().catch(err => console.log('Audio blocked', err))
    setTimeout(() => {
      navigate('/dashboard')
    }, 800)
  }

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    if (!email || !password) {
      setError('צריך להזין אימייל וסיסמה')
      setLoading(false)
      return
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('אימייל או סיסמה שגויים')
      setLoading(false)
      return
    }
    triggerDogTransition()
  }

  const handleSignUp = async () => {
    setLoading(true)
    setError('')
    if (!name || !email || !password) {
      setError('צריך למלא שם, אימייל וסיסמה')
      setLoading(false)
      return
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    if (error) {
      setError('שגיאה: ' + error.message)
      setLoading(false)
      return
    }
    if (data.session) {
      triggerDogTransition()
    } else {
      setError('נשלח אימייל אישור. בדוק את תיבת הדואר')
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', marginTop: '4px', padding: '10px 12px',
    border: '1.5px solid #FFE0CC', borderRadius: '10px',
    fontFamily: 'var(--font-family)', fontSize: '13px',
    background: '#FFF8F2', outline: 'none', boxSizing: 'border-box'
  }
  const labelStyle = {
    fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)',
    textTransform: 'uppercase', letterSpacing: '0.5px'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative', overflow: 'hidden' }}>

      {isTransitioning && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: '#FFF4EC', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="200" height="200" viewBox="0 0 100 100" style={{
            fill: '#FF6B35',
            animation: 'pawExpand 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards'
          }}>
            <path d="M 50 45 C 32 45 32 75 50 78 C 68 75 68 45 50 45 Z" />
            <circle cx="28" cy="36" r="8" />
            <circle cx="42" cy="24" r="9" />
            <circle cx="58" cy="24" r="9" />
            <circle cx="72" cy="36" r="8" />
          </svg>
          <style>{`
            @keyframes pawExpand {
              0% { transform: scale(0); opacity: 0; }
              20% { transform: scale(1); opacity: 1; }
              100% { transform: scale(25); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      <svg width="50" height="28" viewBox="0 0 80 36" style={{ position: 'absolute', top: '18%', left: '12%', transform: 'rotate(-25deg)', opacity: 0.8 }}>
        <rect x="20" y="13" width="40" height="10" rx="5" fill="#E8C9A8"/><circle cx="20" cy="11" r="8" fill="#E8C9A8"/><circle cx="20" cy="25" r="8" fill="#E8C9A8"/><circle cx="60" cy="11" r="8" fill="#E8C9A8"/><circle cx="60" cy="25" r="8" fill="#E8C9A8"/>
      </svg>
      <svg width="40" height="22" viewBox="0 0 80 36" style={{ position: 'absolute', top: '30%', right: '12%', transform: 'rotate(18deg)', opacity: 0.8 }}>
        <rect x="20" y="13" width="40" height="10" rx="5" fill="#E8C9A8"/><circle cx="20" cy="11" r="8" fill="#E8C9A8"/><circle cx="20" cy="25" r="8" fill="#E8C9A8"/><circle cx="60" cy="11" r="8" fill="#E8C9A8"/><circle cx="60" cy="25" r="8" fill="#E8C9A8"/>
      </svg>
      <svg width="42" height="42" viewBox="0 0 60 60" style={{ position: 'absolute', bottom: '14%', left: '14%', opacity: 0.85 }}>
        <circle cx="30" cy="30" r="24" fill="#FF8C5A"/><path d="M 8 24 Q 30 32 52 24" stroke="#D85A30" strokeWidth="2.5" fill="none"/><path d="M 12 38 Q 30 30 48 38" stroke="#D85A30" strokeWidth="2.5" fill="none"/>
      </svg>

      <div style={{ width: '100%', maxWidth: '360px', position: 'relative', zIndex: 1, textAlign: 'center' }}>

        <svg width="140" height="140" viewBox="0 0 100 100">
          <ellipse cx="50" cy="92" rx="28" ry="5" fill="#F0DCC8"/>
          <path d="M 28 80 Q 28 56 50 56 Q 72 56 72 80 Z" fill="#D7A15C"/>
          <path d="M 40 56 Q 50 56 50 78 Q 50 56 60 56 Z" fill="#FFF2DF"/>
          <circle cx="50" cy="40" r="23" fill="#D7A15C"/>
          <circle cx="40" cy="37" r="12" fill="#FFF2DF"/>
          <path d="M 30 22 Q 12 14 22 40 Z" fill="#B57C38"/>
          <path d="M 70 22 Q 88 14 78 40 Z" fill="#B57C38"/>
          <circle cx="42" cy="38" r="3.5" fill="#2D3748"/>
          <circle cx="43.5" cy="36.5" r="1.2" fill="#FFF"/>
          <circle cx="58" cy="38" r="3.5" fill="#2D3748"/>
          <circle cx="59.5" cy="36.5" r="1.2" fill="#FFF"/>
          <path d="M 45 45 Q 50 41 55 45 Q 50 50 45 45 Z" fill="#2D3748"/>
          <path d="M 47 48 Q 50 58 53 48 Z" fill="#FF7B7B"/>
        </svg>

        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#3A2A1E', margin: 0 }}>Dogctor</h1>
        <p style={{ fontSize: '13px', color: '#B0826A', margin: '4px 0 24px' }}>Smart health for your dog</p>

        {mode === null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 8px' }}>
            <button onClick={() => { setMode('login'); setError('') }} style={{ width: '100%', padding: '13px', background: '#FF6B35', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-family)', cursor: 'pointer' }}>Log in</button>
            <button onClick={() => { setMode('signup'); setError('') }} style={{ width: '100%', padding: '13px', background: 'transparent', color: '#FF6B35', border: '2px solid #FFD0B0', borderRadius: '12px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-family)', cursor: 'pointer' }}>Create account</button>
          </div>
        )}

        {mode !== null && (
          <div style={{ position: 'relative', background: '#fff', border: '2px solid #FFE0CC', borderRadius: '20px', padding: '22px 18px', boxShadow: '0 8px 24px rgba(216,90,48,0.08)', textAlign: 'right' }}>

            <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '13px solid transparent', borderRight: '13px solid transparent', borderBottom: '13px solid #FFE0CC' }}></div>
            <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '11px solid transparent', borderRight: '11px solid transparent', borderBottom: '11px solid #fff' }}></div>

            {error && (
              <div style={{ background: '#FEECEC', border: '1px solid #E53E3E', borderRadius: '8px', padding: '8px 10px', marginBottom: '12px', fontSize: '12px', color: '#E53E3E', textAlign: 'center' }}>{error}</div>
            )}

            {mode === 'signup' && (
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Name</label>
                <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
              </div>
            )}

            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
            </div>

            <button onClick={mode === 'login' ? handleLogin : handleSignUp} disabled={loading} style={{ width: '100%', padding: '12px', background: '#FF6B35', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-family)', cursor: 'pointer', opacity: loading ? 0.7 : 1, marginBottom: '10px' }}>
              {loading ? 'Loading...' : (mode === 'login' ? 'Log in' : 'Create account')}
            </button>

            <p style={{ fontSize: '12px', color: '#B0826A', margin: 0, textAlign: 'center' }}>
              {mode === 'login' ? 'Don\'t have an account? ' : 'Already have an account? '}
              <span onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }} style={{ color: '#FF6B35', fontWeight: 700, cursor: 'pointer' }}>
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </span>
            </p>

          </div>
        )}

      </div>
    </div>
  )
}

export default LoginPage