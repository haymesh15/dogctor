import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '360px',
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px 24px',
        border: '1.5px solid var(--color-border)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, #FF8C42, #FF6B35)',
            borderRadius: '20px',
            margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            🐾
          </div>
          <h1 style={{ fontSize: 'var(--font-size-h1)', fontWeight: 800, color: 'var(--color-text)' }}>Dogctor</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-caption)' }}>Smart health for your dog</p>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Email</label>
          <input type="email" placeholder="your@email.com" style={{
            width: '100%', marginTop: '4px',
            padding: '10px 12px',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--font-size-body)',
            background: 'var(--color-surface)'
          }} />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Password</label>
          <input type="password" placeholder="••••••••" style={{
            width: '100%', marginTop: '4px',
            padding: '10px 12px',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--font-size-body)',
            background: 'var(--color-surface)'
          }} />
        </div>

        <p style={{ textAlign: 'right', fontSize: 'var(--font-size-caption)', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '16px', cursor: 'pointer' }}>
          Forgot password?
        </p>

        <button onClick={() => navigate('/dashboard')} style={{
          width: '100%', padding: '12px',
          background: 'linear-gradient(135deg, #FF8C42, #FF6B35)',
          color: 'white', border: 'none',
          borderRadius: 'var(--radius-lg)',
          fontSize: '13px', fontWeight: 700,
          fontFamily: 'var(--font-family)',
          cursor: 'pointer', marginBottom: '12px'
        }}>
          Log in
        </button>

        <button onClick={() => navigate('/setup')} style={{
          width: '100%', padding: '11px',
          background: 'transparent',
          color: 'var(--color-primary)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          fontSize: '13px', fontWeight: 600,
          fontFamily: 'var(--font-family)',
          cursor: 'pointer'
        }}>
          Create account
        </button>
      </div>
    </div>
  )
}
export default LoginPage