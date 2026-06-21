import { useNavigate } from 'react-router-dom'

function PrivacyPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', padding: '16px', paddingBottom: '40px' }}>
      <span onClick={() => navigate('/settings')} style={{ color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>← Back</span>

      <h1 style={{ fontSize: 'var(--font-size-h1)', fontWeight: 800, marginTop: '12px' }}>Privacy Policy</h1>
      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>Last updated: June 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text)' }}>
        <p>Dogctor ("we", "the app") respects your privacy. This policy explains what information we collect and how we use it.</p>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>Information we collect</p>
          <p>We collect the email address you sign up with, your dog's profile details (name, breed, age, weight, photo), and the daily health logs you create. This information is stored securely using Supabase.</p>
        </div>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>How we use it</p>
          <p>Your data is used only to provide the app's features — tracking your dog's health, showing insights, and powering the AI assistant. We do not sell your data to anyone.</p>
        </div>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>AI assistant</p>
          <p>When you ask the AI assistant a question or share a photo, that content is sent to the Anthropic Claude API to generate a response. It is not used to identify you.</p>
        </div>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>Your data</p>
          <p>You can delete your dog profile and logs at any time from within the app. If you want your account fully removed, contact us.</p>
        </div>

        <div>
          <p style={{ fontWeight: 800, marginBottom: '4px' }}>Important note</p>
          <p>Dogctor is a tracking tool and the AI assistant does not replace a real veterinarian. For any medical concern, always consult a licensed vet.</p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage