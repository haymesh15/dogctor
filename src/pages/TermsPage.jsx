import { useNavigate } from 'react-router-dom'

function TermsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', padding: '16px', paddingBottom: '40px' }}>
      <span onClick={() => navigate('/settings')} style={{ color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>← Back</span>

      <h1 style={{ fontSize: 'var(--font-size-h1)', fontWeight: 800, marginTop: '12px' }}>Terms of Use</h1>
      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>Last updated: June 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text)' }}>
        <p>Welcome to Dogctor. By creating an account and using the app, you agree to these terms.</p>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>Using the app</p>
          <p>Dogctor helps you track your dog's daily health habits and offers an AI assistant for general guidance. You agree to use the app for its intended purpose.</p>
        </div>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>Not medical advice</p>
          <p>The AI assistant provides general information only and is not a substitute for professional veterinary care. Always consult a licensed veterinarian for any health concern about your dog. Dogctor is not responsible for decisions made based on the app's content.</p>
        </div>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>Your account</p>
          <p>You are responsible for keeping your login details safe and for the accuracy of the information you enter.</p>
        </div>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>Your content</p>
          <p>The dog profiles, logs, and photos you add belong to you. You grant the app permission to store and display them so the features can work.</p>
        </div>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>Changes</p>
          <p>We may update these terms over time. Continued use of the app means you accept the latest version.</p>
        </div>
      </div>
    </div>
  )
}

export default TermsPage