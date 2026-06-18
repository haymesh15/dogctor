import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Navbar from '../components/Navbar'

function SettingsPage() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  // קישור כל פריט לפעולה שלו
  const items = [
    { label: 'Edit dog profile', icon: '🐾', action: () => navigate('/profile') },
    { label: 'Notifications', icon: '🔔', action: () => {} },
    { label: 'Subscription', icon: '⭐', action: () => {} },
    { label: 'Privacy policy', icon: '🔒', action: () => {} },
    { label: 'Terms of use', icon: '📄', action: () => {} },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', paddingBottom: '70px' }}>

      <div style={{ padding: '16px' }}>
        <h1 style={{ fontSize: 'var(--font-size-h1)', fontWeight: 800 }}>Settings</h1>
        <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)', fontWeight: 600 }}>Manage your profile</p>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {items.map(item => (
          <div key={item.label} onClick={item.action} style={{
            background: 'var(--color-surface)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <p style={{ fontWeight: 600, fontSize: 'var(--font-size-body)' }}>{item.label}</p>
            </div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>›</span>
          </div>
        ))}

        <button onClick={handleLogout} style={{
          width: '100%', padding: '12px',
          background: 'transparent',
          color: '#E53E3E',
          border: '1.5px solid #E53E3E',
          borderRadius: 'var(--radius-lg)',
          fontSize: '13px', fontWeight: 700,
          fontFamily: 'var(--font-family)',
          cursor: 'pointer',
          marginTop: '8px'
        }}>
          Log out
        </button>

      </div>
      <Navbar />
    </div>
  )
}

export default SettingsPage