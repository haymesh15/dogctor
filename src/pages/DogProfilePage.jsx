import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DogProfilePage() {
  const navigate = useNavigate()
  const [gender, setGender] = useState('Male')
  const [photo, setPhoto] = useState(null)

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '360px', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1.5px solid var(--color-border)' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span onClick={() => navigate('/')} style={{ color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>Back</span>
          <h2 style={{ fontSize: 'var(--font-size-h2)', fontWeight: 800 }}>Your dog</h2>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-border)' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-border)' }}></div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <label style={{ cursor: 'pointer' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FFE4CC', border: '2.5px dashed var(--color-primary)', margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {photo
                ? <img src={photo} alt="dog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: '24px' }}>🐾</span>
              }
            </div>
            <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
          </label>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-primary)', fontWeight: 700 }}>
            {photo ? 'Change photo' : '+ Add photo'}
          </span>
        </div>

        {[["Dog's name", 'text', 'e.g. Buddy'], ['Breed', 'text', 'Select breed'], ['Age', 'number', 'Years'], ['Weight', 'number', 'kg']].map(([label, type, placeholder]) => (
          <div key={label} style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{label}</label>
            <input type={type} placeholder={placeholder} style={{ width: '100%', marginTop: '4px', padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-body)', background: 'var(--color-surface)', outline: 'none' }} />
          </div>
        ))}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Gender</label>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            {['Male', 'Female'].map(g => (
              <button key={g} onClick={() => setGender(g)} style={{
                flex: 1, padding: '8px',
                background: gender === g ? 'linear-gradient(135deg, #FF8C42, #FF6B35)' : 'transparent',
                color: gender === g ? 'white' : 'var(--color-text-muted)',
                border: gender === g ? 'none' : '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontFamily: 'var(--font-family)',
                cursor: 'pointer'
              }}>{g}</button>
            ))}
          </div>
        </div>

        <button onClick={() => navigate('/dashboard')} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #FF8C42, #FF6B35)', color: 'white', border: 'none', borderRadius: 'var(--radius-lg)', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-family)', cursor: 'pointer' }}>
          Continue
        </button>

      </div>
    </div>
  )
}

export default DogProfilePage