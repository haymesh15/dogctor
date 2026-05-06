import { useState } from 'react'

function AIFloatingButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '140px',
          right: '16px',
          width: '280px',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--color-border)',
          padding: '16px',
          zIndex: 300,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }}>
          <p style={{ fontWeight: 800, fontSize: 'var(--font-size-h3)', marginBottom: '8px' }}>AI Vet Assistant</p>
          <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>Ask me anything about Buddy</p>
          <input
            type="text"
            placeholder="e.g. Is Buddy drinking enough?"
            style={{
              width: '100%',
              padding: '9px 12px',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-body)',
              outline: 'none'
            }}
          />
          <button style={{
            width: '100%',
            marginTop: '8px',
            padding: '10px',
            background: 'linear-gradient(135deg, #FF8C42, #FF6B35)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontFamily: 'var(--font-family)',
            cursor: 'pointer'
          }}>
            Ask
          </button>
        </div>
      )}

      <div onClick={() => setOpen(!open)} style={{
        position: 'fixed',
        bottom: '80px',
        right: '16px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #FF8C42, #FF6B35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(255, 107, 53, 0.4)',
        zIndex: 200,
        fontSize: '22px'
      }}>
        🐾
      </div>
    </>
  )
}

export default AIFloatingButton