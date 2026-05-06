import Navbar from '../components/Navbar'
import AIFloatingButton from '../components/AIFloatingButton'

function InsightsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', paddingBottom: '70px' }}>

      <div style={{ padding: '16px' }}>
        <h1 style={{ fontSize: 'var(--font-size-h1)', fontWeight: 800 }}>Insights</h1>
        <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)', fontWeight: 600 }}>Buddy's weekly overview</p>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        <div style={{ background: '#F0FFF6', border: '1.5px solid #38A169', borderRadius: 'var(--radius-lg)', padding: '12px' }}>
          <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 800, color: '#38A169', textTransform: 'uppercase', marginBottom: '4px' }}>This week</p>
          <p style={{ fontSize: '11px', fontWeight: 500, color: '#2D7A50' }}>Buddy's vitals are within healthy range!</p>
        </div>

        {[
          { label: 'Activity level', value: 'Good', color: '#38A169' },
          { label: 'Sleep pattern', value: '8h avg', color: 'var(--color-text)' },
          { label: 'Eating & drinking', value: 'Normal', color: 'var(--color-text)' },
          { label: 'Bathroom routine', value: 'Regular', color: 'var(--color-text)' },
        ].map(item => (
          <div key={item.label} style={{
            background: 'var(--color-surface)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{ fontSize: 'var(--font-size-body)', fontWeight: 600 }}>{item.label}</p>
            <p style={{ fontSize: 'var(--font-size-body)', fontWeight: 800, color: item.color }}>{item.value}</p>
          </div>
        ))}

      </div>
      <Navbar />
      <AIFloatingButton />
    </div>
  )
}

export default InsightsPage