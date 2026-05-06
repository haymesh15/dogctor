import { useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    { path: '/dashboard', icon: '🏠', label: 'Home' },
    { path: '/log', icon: '📋', label: 'Log' },
    { path: '/insights', icon: '📊', label: 'Insights' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ]

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0 12px',
      zIndex: 100
    }}>
      {items.map(item => (
        <div key={item.path} onClick={() => navigate(item.path)} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer'
        }}>
          <span style={{ fontSize: '20px' }}>{item.icon}</span>
          <span style={{
            fontSize: 'var(--font-size-caption)',
            fontWeight: 700,
            color: location.pathname === item.path ? 'var(--color-primary)' : 'var(--color-text-muted)'
          }}>{item.label}</span>
          {location.pathname === item.path && (
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-primary)' }}></div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Navbar