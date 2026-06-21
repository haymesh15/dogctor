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

      {/* ========================================================================= */}
      {/* 🐾 תג STYLE מאוחד - ביצועי GPU ואנימציות קומפוזיציה מתקדמות 🐾 */}
      {/* ========================================================================= */}
      <style>{`
        @keyframes pawExpand {
          0% { transform: scale(0); opacity: 0; }
          20% { transform: scale(1); opacity: 1; }
          100% { transform: scale(25); opacity: 1; }
        }

        /* --- סצנה 1: מרדף כדור --- */
        @keyframes sceneBallChase {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        @keyframes premiumDogRun {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(6deg); }
        }
        @keyframes legSwing {
          0%, 100% { transform: rotate(-25deg); }
          50% { transform: rotate(25deg); }
        }
        @keyframes ballSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* --- סצנה 2: מרדף דוור --- */
        @keyframes sceneMailmanChaseUpdated {
          0% { transform: translateX(calc(100vw + 260px)); }
          100% { transform: translateX(-260px); }
        }
        @keyframes premiumHumanRun {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-14px) rotate(6deg); }
        }

        /* --- סצנה 3: מרדף גורים במעגל (תופסת אמיתית עם רגליים) --- */
        @keyframes puppyChaseCircle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes puppyBodyBob {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-4px) scaleY(0.95); }
        }
        @keyframes puppyTailFastWag {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(40deg); }
        }

        /* --- סצנה 4: פיפי פרופיל (זרם מודגש ורגל יציבה) --- */
        @keyframes premiumLegLift {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes heavyPeeStream {
          0% { stroke-dashoffset: 20; opacity: 0; }
          15% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .animated-scene, .animated-sub {
            animation-play-state: paused !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 🪐 שכבת רקע דינמית (Dogctor High-End Background) 🪐 */}
      {/* ========================================================================= */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
        
        {/* סצנה 1: מרדף אחרי כדור (חלק עליון - דמויות מוגדלות) */}
        <div className="animated-scene" style={{ position: 'absolute', top: '9%', left: 0, display: 'flex', alignItems: 'center', gap: '15px', animation: 'sceneBallChase 14s infinite linear' }}>
          <svg className="animated-sub" width="100" height="70" viewBox="0 0 90 60" style={{ animation: 'premiumDogRun 0.3s infinite ease-in-out' }}>
            <path d="M 12 35 C 2 30 5 15 12 12 C 8 20 10 32 12 35" fill="#B57C38" />
            <ellipse cx="40" cy="38" rx="24" ry="14" fill="#D7A15C" />
            <ellipse cx="48" cy="38" rx="14" ry="14" fill="#FFF2DF" opacity="0.9" />
            <circle cx="65" cy="25" r="15" fill="#D7A15C" />
            <path d="M 52 14 Q 42 10 48 24 Z" fill="#B57C38" />
            <circle cx="70" cy="22" r="2" fill="#2D3748" />
            <ellipse cx="76" cy="28" rx="6" ry="4" fill="#FFF2DF" />
            <circle cx="80" cy="26" r="2.5" fill="#2D3748" />
            {/* רגליים זזות בריצה */}
            <ellipse cx="28" cy="52" rx="4" ry="8" fill="#B57C38" style={{ transformOrigin: '28px 46px', animation: 'legSwing 0.3s infinite ease-in-out' }} />
            <ellipse cx="52" cy="52" rx="4" ry="8" fill="#D7A15C" style={{ transformOrigin: '52px 46px', animation: 'legSwing 0.3s infinite ease-in-out reverse' }} />
          </svg>
          <svg className="animated-sub" width="18" height="18" viewBox="0 0 20 20" style={{ animation: 'ballSpin 0.5s infinite linear' }}>
            <circle cx="10" cy="10" r="9" fill="#FF6B35" />
            <path d="M 3 6 Q 10 14 17 6" stroke="#FF8C42" strokeWidth="2.5" fill="none" />
          </svg>
        </div>

        {/* סצנה 2: מרדף דוור (הכלב רודף אחרי הדוור - ימין לשמאל) */}
        <div className="animated-scene" style={{ position: 'absolute', bottom: '8%', left: 0, display: 'flex', alignItems: 'center', gap: '25px', animation: 'sceneMailmanChaseUpdated 13s infinite linear' }}>
          {/* הדוור */}
          <svg className="animated-sub" width="60" height="90" viewBox="0 0 60 90" style={{ animation: 'premiumHumanRun 0.35s infinite ease-in-out', transform: 'scaleX(-1)' }}>
            <path d="M 22 65 L 12 84 L 5 82" stroke="#2B6CB0" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 32 65 L 42 80 L 52 82" stroke="#1A365D" strokeWidth="6" strokeLinecap="round" fill="none" />
            <rect x="18" y="32" width="22" height="35" rx="6" fill="#3182CE" />
            <path d="M 12 40 L 22 58 L 34 54 L 28 38 Z" fill="#9C4221" opacity="0.9" />
            <line x1="14" y1="32" x2="28" y2="55" stroke="#742A2A" strokeWidth="2" />
            <circle cx="30" cy="20" r="8" fill="#FEEBC8" />
            <path d="M 20 16 Q 30 10 40 16 L 44 18 L 20 18 Z" fill="#1A365D" />
          </svg>
          {/* הכלב הרודף (פונה שמאלה, רגליים אקטיביות) */}
          <svg className="animated-sub" width="100" height="70" viewBox="0 0 90 60" style={{ animation: 'premiumDogRun 0.35s infinite ease-in-out', animationDelay: '-0.05s' }}>
            <path d="M 78 35 C 88 30 85 15 78 12 C 82 20 80 32 78 35" fill="#B57C38" />
            <ellipse cx="50" cy="38" rx="24" ry="14" fill="#D7A15C" />
            <ellipse cx="42" cy="38" rx="14" ry="14" fill="#FFF2DF" opacity="0.9" />
            <circle cx="25" cy="25" r="15" fill="#D7A15C" />
            <path d="M 38 14 Q 48 10 42 24 Z" fill="#B57C38" />
            <circle cx="20" cy="22" r="2" fill="#2D3748" />
            <ellipse cx="14" cy="28" rx="6" ry="4" fill="#FFF2DF" />
            <circle cx="10" cy="26" r="2.5" fill="#2D3748" />
            <ellipse cx="62" cy="52" rx="4" ry="8" fill="#B57C38" style={{ transformOrigin: '62px 46px', animation: 'legSwing 0.35s infinite ease-in-out' }} />
            <ellipse cx="38" cy="52" rx="4" ry="8" fill="#D7A15C" style={{ transformOrigin: '38px 46px', animation: 'legSwing 0.35s infinite ease-in-out reverse' }} />
          </svg>
        </div>

        {/* סצנה 3: מרדף גורים במעגל (תיקון מלא - רגליים + ריצה ותפיסה במעגל!) */}
        <div style={{ position: 'absolute', top: '40%', left: '5%', width: '130px', height: '130px' }}>
          <div style={{ width: '100%', height: '100%', animation: 'puppyChaseCircle 4s infinite linear', transformOrigin: 'center' }}>
            
            {/* גור 1 - רץ במעגל */}
            <svg width="65" height="55" viewBox="0 0 90 70" style={{ position: 'absolute', top: 0, left: 0, animation: 'puppyBodyBob 0.4s infinite ease-in-out' }}>
              <path d="M 16 48 C 6 44 4 25 15 22" stroke="#B57C38" strokeWidth="6" strokeLinecap="round" fill="none" style={{ animation: 'puppyTailFastWag 0.1s infinite ease-in-out', transformOrigin: '16px 48px' }} />
              <ellipse cx="38" cy="46" rx="20" ry="14" fill="#D7A15C" />
              <circle cx="38" cy="46" r="9" fill="#FFF2DF" opacity="0.8" />
              <circle cx="62" cy="34" r="15" fill="#D7A15C" />
              <path d="M 50 24 Q 44 26 46 42 Q 54 42 52 24" fill="#B57C38" />
              <circle cx="56" cy="32" r="2.5" fill="#2D3748" />
              <circle cx="68" cy="32" r="2.5" fill="#2D3748" />
              <ellipse cx="62" cy="38" rx="5" ry="3" fill="#FFF2DF" />
              <circle cx="62" cy="36" r="2" fill="#2D3748" />
              {/* רגלי גור */}
              <circle cx="30" cy="62" r="4" fill="#B57C38" />
              <circle cx="48" cy="62" r="4" fill="#D7A15C" />
            </svg>

            {/* גור 2 - רודף אחריו במעגל */}
            <svg width="65" height="55" viewBox="0 0 90 70" style={{ position: 'absolute', bottom: 0, right: 0, transform: 'rotate(180deg)', animation: 'puppyBodyBob 0.4s infinite ease-in-out', animationDelay: '-0.2s' }}>
              <path d="M 16 48 C 6 44 4 25 15 22" stroke="#B57C38" strokeWidth="6" strokeLinecap="round" fill="none" style={{ animation: 'puppyTailFastWag 0.1s infinite ease-in-out', transformOrigin: '16px 48px' }} />
              <ellipse cx="38" cy="46" rx="20" ry="14" fill="#D7A15C" />
              <circle cx="38" cy="46" r="9" fill="#FFF2DF" opacity="0.8" />
              <circle cx="62" cy="34" r="15" fill="#D7A15C" />
              <path d="M 50 24 Q 44 26 46 42 Q 54 42 52 24" fill="#B57C38" />
              <circle cx="56" cy="32" r="2.5" fill="#2D3748" />
              <circle cx="68" cy="32" r="2.5" fill="#2D3748" />
              <ellipse cx="62" cy="38" rx="5" ry="3" fill="#FFF2DF" />
              <circle cx="62" cy="36" r="2" fill="#2D3748" />
              <circle cx="30" cy="62" r="4" fill="#B57C38" />
              <circle cx="48" cy="62" r="4" fill="#D7A15C" />
            </svg>

          </div>
        </div>

        {/* סצנה 4: 🛠️ תיקון יסודי - כלב פרימיום מלא משתין בקשת מודגשת על הברז 🛠️ */}
        <div style={{ position: 'absolute', bottom: '12%', right: '5%', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          
          {/* הכלב המעוצב מחדש (פרופיל מלא עם 4 רגליים ברורות!) */}
          <svg width="95" height="85" viewBox="0 0 100 80">
            {/* זנב */}
            <path d="M 14 38 C 4 35 6 18 14 15 C 10 24 12 34 14 38" fill="#B57C38" />
            {/* גוף אופקי יציב של כלב */}
            <ellipse cx="44" cy="46" rx="26" ry="16" fill="#D7A15C" />
            <ellipse cx="38" cy="46" rx="15" ry="12" fill="#FFF2DF" opacity="0.85" /> {/* כתם בטן */}
            
            {/* 3 רגליים עומדות יציב על הקרקע */}
            <rect x="26" y="58" width="6" height="18" rx="3" fill="#B57C38" />
            <rect x="36" y="60" width="6" height="16" rx="3" fill="#D7A15C" />
            <rect x="56" y="58" width="6" height="18" rx="3" fill="#D7A15C" />

            {/* צוואר וראש כלב פרופיל קלאסי */}
            <path d="M 54 42 L 68 28 L 56 22 Z" fill="#D7A15C" />
            <circle cx="66" cy="24" r="14" fill="#D7A15C" />
            <path d="M 58 12 Q 64 2 62 18 Z" fill="#B57C38" /> {/* אוזן שמוטה מעוצבת */}
            <circle cx="70" cy="20" r="2.2" fill="#2D3748" /> {/* עין פונה קדימה לברז */}
            {/* חוטם כלבי בולט ימינה */}
            <ellipse cx="76" cy="26" rx="6" ry="4" fill="#FFF2DF" />
            <circle cx="80" cy="24" r="2.5" fill="#2D3748" /> {/* אף */}

            {/* הרגל האחורית הרביעית - מורמת באנימציה מהאגן */}
            <g style={{ transformOrigin: '24px 46px', animation: 'premiumLegLift 1.2s infinite ease-in-out' }}>
              <rect x="16" y="44" width="7" height="20" rx="3.5" fill="#B57C38" transform="rotate(-65 16 44)" />
            </g>

            {/* 💦 זרם פיפי עבה, ברור ומודגש - נורה בקשת ימינה אל מרכז הברז 💦 */}
            <path d="M 32 54 Q 58 50 84 54" stroke="#ECC94B" strokeWidth="3.5" strokeLinecap="round" fill="none" style={{ strokeDasharray: '8', animation: 'heavyPeeStream 0.6s infinite linear' }} />
          </svg>

          {/* ברז כיבוי אש מוגדל ומלוטש */}
          <svg width="30" height="55" viewBox="0 0 30 60">
            <rect x="6" y="16" width="18" height="40" rx="5" fill="#E53E3E" />
            <circle cx="15" cy="12" r="9" fill="#E53E3E" />
            <rect x="2" y="28" width="26" height="5" fill="#C53030" />
            <circle cx="15" cy="30" r="4" fill="#A0AEC0" />
            <rect x="5" y="52" width="20" height="8" fill="#4A5568" />
          </svg>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🎬 שכבת המעבר (Transition Overlayer - Paw Print) 🎬 */}
      {/* ========================================================================= */}
      {isTransitioning && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#FFF4EC', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="200" height="200" viewBox="0 0 100 100" style={{ fill: '#FF6B35', animation: 'pawExpand 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards' }}>
            <path d="M 50 45 C 32 45 32 75 50 78 C 68 75 68 45 50 45 Z" />
            <circle cx="28" cy="36" r="8" />
            <circle cx="42" cy="24" r="9" />
            <circle cx="58" cy="24" r="9" />
            <circle cx="72" cy="36" r="8" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🦴 שכבת עצמות דקורטיביות ברקע (עדין ומפוזר, zIndex: 1) 🦴 */}
      {/* ========================================================================= */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <svg width="35" height="20" viewBox="0 0 80 36" style={{ position: 'absolute', top: '22%', left: '14%', transform: 'rotate(-15deg)', opacity: 0.5 }}>
          <rect x="20" y="13" width="40" height="10" rx="5" fill="#EAD5C3"/><circle cx="20" cy="11" r="8" fill="#EAD5C3"/><circle cx="20" cy="25" r="8" fill="#EAD5C3"/><circle cx="60" cy="11" r="8" fill="#EAD5C3"/><circle cx="60" cy="25" r="8" fill="#EAD5C3"/>
        </svg>
        <svg width="30" height="18" viewBox="0 0 80 36" style={{ position: 'absolute', top: '15%', right: '15%', transform: 'rotate(25deg)', opacity: 0.5 }}>
          <rect x="20" y="13" width="40" height="10" rx="5" fill="#EAD5C3"/><circle cx="20" cy="11" r="8" fill="#EAD5C3"/><circle cx="20" cy="25" r="8" fill="#EAD5C3"/><circle cx="60" cy="11" r="8" fill="#EAD5C3"/><circle cx="60" cy="25" r="8" fill="#EAD5C3"/>
        </svg>
        <svg width="38" height="22" viewBox="0 0 80 36" style={{ position: 'absolute', top: '50%', right: '18%', transform: 'rotate(-40deg)', opacity: 0.45 }}>
          <rect x="20" y="13" width="40" height="10" rx="5" fill="#EAD5C3"/><circle cx="20" cy="11" r="8" fill="#EAD5C3"/><circle cx="20" cy="25" r="8" fill="#EAD5C3"/><circle cx="60" cy="11" r="8" fill="#EAD5C3"/><circle cx="60" cy="25" r="8" fill="#EAD5C3"/>
        </svg>
        <svg width="32" height="18" viewBox="0 0 80 36" style={{ position: 'absolute', bottom: '25%', left: '12%', transform: 'rotate(10deg)', opacity: 0.5 }}>
          <rect x="20" y="13" width="40" height="10" rx="5" fill="#EAD5C3"/><circle cx="20" cy="11" r="8" fill="#EAD5C3"/><circle cx="20" cy="25" r="8" fill="#EAD5C3"/><circle cx="60" cy="11" r="8" fill="#EAD5C3"/><circle cx="60" cy="25" r="8" fill="#EAD5C3"/>
        </svg>
        <svg width="35" height="20" viewBox="0 0 80 36" style={{ position: 'absolute', top: '5%', left: '48%', transform: 'rotate(85deg)', opacity: 0.35 }}>
          <rect x="20" y="13" width="40" height="10" rx="5" fill="#EAD5C3"/><circle cx="20" cy="11" r="8" fill="#EAD5C3"/><circle cx="20" cy="25" r="8" fill="#EAD5C3"/><circle cx="60" cy="11" r="8" fill="#EAD5C3"/><circle cx="60" cy="25" r="8" fill="#EAD5C3"/>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 💳 קארד הכניסה המרכזי (Login Box) 💳 */}
      {/* ========================================================================= */}
      <div style={{ width: '100%', maxWidth: '360px', position: 'relative', zIndex: 2, textAlign: 'center' }}>

        {/* לוגו הכלב המרכזי */}
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

        {/* כפתורי בחירת מצב ראשוני */}
        {mode === null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 8px' }}>
            <button onClick={() => { setMode('login'); setError('') }} style={{ width: '100%', padding: '13px', background: '#FF6B35', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-family)', cursor: 'pointer' }}>Log in</button>
            <button onClick={() => { setMode('signup'); setError('') }} style={{ width: '100%', padding: '13px', background: 'transparent', color: '#FF6B35', border: '2px solid #FFD0B0', borderRadius: '12px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-family)', cursor: 'pointer' }}>Create account</button>
          </div>
        )}

        {/* טופס השדות הדינמי */}
        {mode !== null && (
          <div style={{ position: 'relative', background: '#fff', border: '2px solid #FFE0CC', borderRadius: '20px', padding: '22px 18px', boxShadow: '0 8px 24px rgba(216,90,48,0.08)', textAlign: 'right' }}>

            {/* משולש בועת הדיבור של הכלב */}
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
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
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