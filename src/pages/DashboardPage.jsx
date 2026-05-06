import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AIFloatingButton from '../components/AIFloatingButton'

function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', paddingBottom: '70px' }}>
      
      <div style={{ padding: '16px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)', fontWeight: 600 }}>Good morning,</p>
          <h1 style={{ fontSize: 'var(--font-size-h1)', fontWeight: 800 }}>Haim</h1>
        </div>
        <AIFloatingButton />
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', border: '1.5px solid #FFE4CC' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFE4CC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🐾</div>
          <div>
            <p style={{ fontWeight: 800, fontSize: 'var(--font-size-h3)' }}>Buddy</p>
            <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Golden Retriever · 3y · 28kg</p>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #FFF0E4, #FFE8D4)', borderRadius: 'var(--radius-lg)', padding: '12px', border: '1px solid #FFD0A8' }}>
          <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 800, color: 'var(--color-primary-dark)', textTransform: 'uppercase', marginBottom: '4px' }}>AI Daily Summary</p>
          <p style={{ fontSize: '11px', fontWeight: 500 }}>Buddy is doing great today! All vitals look normal. Keep it up!</p>
        </div>

        <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Today's checklist</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { icon: '🍖', label: 'Food', done: true },
            { icon: '💧', label: 'Water', done: false },
            { icon: '🚶', label: 'Walk', done: false },
            { icon: '😊', label: 'Mood', done: false },
          ].map(item => (
            <div key={item.label} onClick={() => navigate('/log')} style={{
              background: item.done ? '#F0FFF6' : 'var(--color-surface)',
              border: `1.5px solid ${item.done ? '#38A169' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '10px',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '18px', marginBottom: '4px' }}>{item.icon}</div>
              <p style={{ fontWeight: 700, fontSize: 'var(--font-size-body)' }}>{item.label}</p>
              <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 600, color: item.done ? '#38A169' : 'var(--color-text-muted)' }}>
                {item.done ? 'Done ✓' : 'Tap to log'}
              </p>
            </div>
          ))}
        </div>

        <div style={{ background: '#2D2D3A', borderRadius: 'var(--radius-lg)', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 'var(--font-size-caption)', color: '#A09080', fontWeight: 600 }}>Daily streak</p>
            <p style={{ fontSize: 'var(--font-size-h3)', fontWeight: 800, color: 'var(--color-primary)' }}>7 days in a row</p>
          </div>
          <span style={{ fontSize: '24px' }}>🏆</span>
        </div>

      </div>
      <Navbar />
    </div>
  )
}

export default DashboardPage