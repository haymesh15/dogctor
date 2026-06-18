import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Navbar from '../components/Navbar'
import AIFloatingButton from '../components/AIFloatingButton'
import { DogStyles, DogActionStyles, DogHappy, DogFood, DogWater, DogWalk, DogCalm } from '../DogMoods'

function DashboardPage() {
  const navigate = useNavigate()
  const [dog, setDog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [streak, setStreak] = useState(0)

  // ברכה לפי שעת היום
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning,' : hour < 18 ? 'Good afternoon,' : 'Good evening,'

  useEffect(() => {
    const loadDog = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/')
        return
      }
      setUserName(user.user_metadata?.full_name || 'there')

      const { data } = await supabase
        .from('dogs')
        .select('*')
        .eq('user_id', user.id)
        .limit(1)
        .single()

      if (!data) {
        navigate('/profile')
        return
      }

      setDog(data)

      // שליפת כל היומנים לחישוב רצף
      const { data: logsData } = await supabase
        .from('daily_logs')
        .select('date')
        .eq('dog_id', data.id)
        .order('date', { ascending: false })

      let streakCount = 0
      if (logsData && logsData.length > 0) {
        const dates = logsData.map(l => l.date)
        let checkDate = new Date()
        for (let i = 0; i < dates.length; i++) {
          const dateStr = checkDate.toISOString().split('T')[0]
          if (dates.includes(dateStr)) {
            streakCount++
            checkDate.setDate(checkDate.getDate() - 1)
          } else {
            break
          }
        }
      }
      setStreak(streakCount)

      setLoading(false)
    }

    loadDog()
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', paddingBottom: '70px' }}>
      <DogStyles />
      <DogActionStyles />

      <div style={{ padding: '16px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)', fontWeight: 600 }}>{greeting}</p>
          <h1 style={{ fontSize: 'var(--font-size-h1)', fontWeight: 800 }}>{userName}</h1>
        </div>
        <AIFloatingButton />
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', border: '1.5px solid #FFE4CC' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#FFF2DF', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            {dog.photo_url
              ? <img src={dog.photo_url} alt={dog.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <DogCalm size={48} />
            }
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: 'var(--font-size-h3)' }}>{dog.name}</p>
            <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>{dog.breed} · {dog.age}y · {dog.weight}kg</p>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #FFF0E4, #FFE8D4)', borderRadius: 'var(--radius-lg)', padding: '12px', border: '1px solid #FFD0A8' }}>
          <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 800, color: 'var(--color-primary-dark)', textTransform: 'uppercase', marginBottom: '4px' }}>AI Daily Summary</p>
          <p style={{ fontSize: '11px', fontWeight: 500 }}>{dog.name} is doing great today! All vitals look normal. Keep it up!</p>
        </div>

        <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Today's checklist</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { Comp: DogFood, label: 'Food', done: true },
            { Comp: DogWater, label: 'Water', done: false },
            { Comp: DogWalk, label: 'Walk', done: false },
            { Comp: DogHappy, label: 'Mood', done: false },
          ].map(item => (
            <div key={item.label} onClick={() => navigate('/log')} style={{
              background: item.done ? '#F0FFF6' : 'var(--color-surface)',
              border: `1.5px solid ${item.done ? '#38A169' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '10px',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                <item.Comp size={48} />
              </div>
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
            <p style={{ fontSize: 'var(--font-size-h3)', fontWeight: 800, color: 'var(--color-primary)' }}>
              {streak === 0 ? 'Start logging!' : streak === 1 ? '1 day' : streak + ' days in a row'}
            </p>
          </div>
          <span style={{ fontSize: '24px' }}>🏆</span>
        </div>

      </div>
      <Navbar />
    </div>
  )
}

export default DashboardPage