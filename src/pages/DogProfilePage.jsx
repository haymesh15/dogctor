import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function DogProfilePage() {
  const navigate = useNavigate()
  const [gender, setGender] = useState('Male')
  const [photo, setPhoto] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
      setPhotoFile(file)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')

    if (!name || !breed || !age || !weight) {
      setError('צריך למלא את כל השדות')
      setLoading(false)
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('צריך להתחבר מחדש')
      setLoading(false)
      return
    }

    // העלאת התמונה לאחסון אם נבחרה
    let photoUrl = null
    if (photoFile) {
      const fileName = `${user.id}-${Date.now()}`
      const { error: uploadError } = await supabase.storage
        .from('dog-photos')
        .upload(fileName, photoFile)

      if (uploadError) {
        setError('שגיאה בהעלאת התמונה: ' + uploadError.message)
        setLoading(false)
        return
      }

      // קבלת הכתובת הציבורית של התמונה
      const { data: urlData } = supabase.storage
        .from('dog-photos')
        .getPublicUrl(fileName)
      photoUrl = urlData.publicUrl
    }

    // שמירת הכלב בטבלה
    const { error } = await supabase.from('dogs').insert({
      user_id: user.id,
      name: name,
      breed: breed,
      age: Number(age),
      weight: Number(weight),
      photo_url: photoUrl,
      gender: gender
    })

    if (error) {
      setError('שגיאה בשמירה: ' + error.message)
      setLoading(false)
      return
    }

    navigate('/dashboard')
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

        {error && (
          <div style={{ background: '#FEECEC', border: '1px solid #E53E3E', borderRadius: 'var(--radius-md)', padding: '10px 12px', marginBottom: '12px', fontSize: '12px', color: '#E53E3E', textAlign: 'center' }}>
            {error}
          </div>
        )}

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

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Dog's name</label>
          <input type="text" placeholder="e.g. Buddy" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginTop: '4px', padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-body)', background: 'var(--color-surface)', outline: 'none' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Breed</label>
          <select value={breed} onChange={e => setBreed(e.target.value)} style={{ width: '100%', marginTop: '4px', padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-body)', background: 'var(--color-surface)', outline: 'none' }}>
            <option value="">Select breed</option>
            <option value="Labrador Retriever">Labrador Retriever</option>
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="German Shepherd">German Shepherd</option>
            <option value="Bulldog">Bulldog</option>
            <option value="Poodle">Poodle</option>
            <option value="Beagle">Beagle</option>
            <option value="Rottweiler">Rottweiler</option>
            <option value="Yorkshire Terrier">Yorkshire Terrier</option>
            <option value="Boxer">Boxer</option>
            <option value="Dachshund">Dachshund</option>
            <option value="Siberian Husky">Siberian Husky</option>
            <option value="Chihuahua">Chihuahua</option>
            <option value="Border Collie">Border Collie</option>
            <option value="Shih Tzu">Shih Tzu</option>
            <option value="Pomeranian">Pomeranian</option>
            <option value="Cocker Spaniel">Cocker Spaniel</option>
            <option value="French Bulldog">French Bulldog</option>
            <option value="Mixed / Other">Mixed / Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Age</label>
          <input type="number" placeholder="Years" value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', marginTop: '4px', padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-body)', background: 'var(--color-surface)', outline: 'none' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Weight</label>
          <input type="number" placeholder="kg" value={weight} onChange={e => setWeight(e.target.value)} style={{ width: '100%', marginTop: '4px', padding: '9px 12px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-body)', background: 'var(--color-surface)', outline: 'none' }} />
        </div>

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

        <button onClick={handleSave} disabled={loading} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #FF8C42, #FF6B35)', color: 'white', border: 'none', borderRadius: 'var(--radius-lg)', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-family)', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Saving...' : 'Continue'}
        </button>

      </div>
    </div>
  )
}

export default DogProfilePage