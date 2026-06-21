import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Navbar from '../components/Navbar'
import AIFloatingButton from '../components/AIFloatingButton'
import { DogStyles, DogActionStyles, DogHappy, DogCalm, DogSleepy, DogSick, DogFood, DogWater, DogWalk, DogBathroom } from '../DogMoods'

function DailyLogPage() {
  const navigate = useNavigate()
  const [logged, setLogged] = useState({ Food: false, Water: false, Walk: false, Bathroom: false })
  const [mood, setMood] = useState(1)
  const [notes, setNotes] = useState('')
  const [dog, setDog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const moods = ['Happy', 'Calm', 'Tired', 'Sick']

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/')
        return
      }

      const { data: dogData } = await supabase
        .from('dogs')
        .select('*')
        .eq('user_id', user.id)
        .limit(1)
        .single()

      if (!dogData) {
        navigate('/profile')
        return
      }

      setDog(dogData)

      const { data: logData } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('dog_id', dogData.id)
        .eq('date', today)
        .limit(1)
        .single()

      if (logData) {
        setLogged({
          Food: logData.food,
          Water: logData.water,
          Walk: logData.walk,
          Bathroom: logData.bathroom
        })
        const moodIndex = moods.indexOf(logData.mood)
        if (moodIndex !== -1) setMood(moodIndex)
        if (logData.notes) setNotes(logData.notes)
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const toggleLog = (key) => setLogged(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSave = async () => {
    setSaving(true)

    const { error } = await supabase
      .from('daily_logs')
      .upsert({
        dog_id: dog.id,
        date: today,
        food: logged.Food,
        water: logged.Water,
        walk: logged.Walk,
        bathroom: logged.Bathroom,
        mood: moods[mood],
        notes: notes
      }, { onConflict: 'dog_id,date' })

    if (error) {
      alert('שגיאה בשמירה: ' + error.message)
      setSaving(false)
      return
    }

    setNotes('')
    navigate('/dashboard')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', paddingBottom: '70px', position: 'relative', overflow: 'hidden' }}>
      <DogStyles />
      <DogActionStyles />

      {/* רקע כפות */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.06 }}>
        {[
          { top: '5%', left: '5%', size: 80 },
          { top: '15%', right: '8%', size: 50 },
          { top: '40%', left: '3%', size: 60 },
          { top: '60%', right: '5%', size: 70 },
          { top: '80%', left: '10%', size: 50 },
        ].map((pos, i) => (
          <svg key={i} width={pos.size} height={pos.size} viewBox="0 0 60 60"
            style={{ position: 'absolute', top: pos.top, left: pos.left, right: pos.right }}>
            <ellipse cx="20" cy="12" rx="7" ry="10" fill="#FF8C42"/>
            <ellipse cx="40" cy="12" rx="7" ry="10" fill="#FF8C42"/>
            <ellipse cx="10" cy="28" rx="6" ry="9" fill="#FF8C42"/>
            <ellipse cx="50" cy="28" rx="6" ry="9" fill="#FF8C42"/>
            <path d="M30 24c-14 0-22 7-20 22 2 10 9 16 20 16s18-6 20-16c2-15-6-22-20-22z" fill="#FF8C42"/>
          </svg>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span onClick={() => navigate('/dashboard')} style={{ color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>Back</span>
          <h2 style={{ fontSize: 'var(--font-size-h2)', fontWeight: 800 }}>Daily log</h2>
          <span style={{ fontSize: '11px', background: '#FFF0E8', color: 'var(--color-primary)', padding: '3px 10px', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>{dog.name}</span>
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

          <div style={{ display: 'flex', gap: '6px' }}>
            {[-2, -1, 0, 1, 2].map(offset => {
              const d = new Date()
              d.setDate(d.getDate() + offset)
              const isToday = offset === 0
              const dayLabel = isToday ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' })
              const dayNum = d.getDate()
              return (
                <div key={offset} style={{
                  flex: 1, padding: '6px 4px', textAlign: 'center',
                  background: isToday ? 'linear-gradient(135deg, #FF8C42, #FF6B35)' : 'var(--color-surface)',
                  color: isToday ? 'white' : 'var(--color-text-muted)',
                  border: isToday ? 'none' : '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700
                }}>
                  <div style={{ fontSize: '9px', opacity: 0.85 }}>{dayLabel}</div>
                  <div style={{ fontSize: 'var(--font-size-caption)' }}>{dayNum}</div>
                </div>
              )
            })}
          </div>

          <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Quick log</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { Comp: DogFood, label: 'Food' },
              { Comp: DogWater, label: 'Water' },
              { Comp: DogWalk, label: 'Walk' },
              { Comp: DogBathroom, label: 'Bathroom' },
            ].map(item => (
              <div key={item.label} onClick={() => toggleLog(item.label)} style={{
                background: logged[item.label] ? '#F0FFF6' : 'var(--color-surface)',
                border: `1.5px solid ${logged[item.label] ? '#38A169' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '12px 8px',
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                  <item.Comp size={56} />
                </div>
                <p style={{ fontWeight: 700, fontSize: 'var(--font-size-body)' }}>{item.label}</p>
                <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 600, color: logged[item.label] ? '#38A169' : 'var(--color-text-muted)' }}>
                  {logged[item.label] ? 'Logged ✓' : 'Tap to log'}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Mood</p>

          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { Comp: DogHappy, label: 'Happy' },
              { Comp: DogCalm, label: 'Calm' },
              { Comp: DogSleepy, label: 'Tired' },
              { Comp: DogSick, label: 'Sick' },
            ].map((item, i) => (
              <button key={item.label} onClick={() => setMood(i)} style={{
                flex: 1, padding: '6px',
                background: mood === i ? '#FFF0E8' : 'var(--color-surface)',
                border: mood === i ? '2px solid #FF6B35' : '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <item.Comp size={44} />
              </button>
            ))}
          </div>

          <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '12px' }}>
            <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Notes (optional)</p>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add anything unusual..." style={{
              width: '100%', border: 'none', outline: 'none',
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text)',
              background: 'transparent',
              resize: 'none', height: '60px'
            }} />
          </div>

          <button onClick={handleSave} disabled={saving} style={{
            width: '100%', padding: '12px',
            background: 'linear-gradient(135deg, #FF8C42, #FF6B35)',
            color: 'white', border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: '13px', fontWeight: 700,
            fontFamily: 'var(--font-family)',
            cursor: 'pointer',
            opacity: saving ? 0.7 : 1
          }}>
            {saving ? 'Saving...' : 'Save log'}
          </button>

        </div>
      </div>

      <Navbar />
      <AIFloatingButton />
    </div>
  )
}

export default DailyLogPage