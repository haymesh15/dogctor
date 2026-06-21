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
  const [todayLog, setTodayLog] = useState(null)
  const [weekLogs, setWeekLogs] = useState([])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning,' : hour < 18 ? 'Good afternoon,' : 'Good evening,'
  const today = new Date().toISOString().split('T')[0]

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

      // all logs (for streak)
      const { data: allLogs } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('dog_id', data.id)
        .order('date', { ascending: false })

      // streak
      let streakCount = 0
      if (allLogs && allLogs.length > 0) {
        const dates = allLogs.map(l => l.date)
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

      // today's log
      const tLog = (allLogs || []).find(l => l.date === today)
      setTodayLog(tLog || null)

      // last 7 days for mini chart
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const weekAgoStr = weekAgo.toISOString().split('T')[0]
      const week = (allLogs || []).filter(l => l.date >= weekAgoStr)
      setWeekLogs(week)

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

  // ---- smart rule-based daily summary ----
  const buildSummary = () => {
    if (!todayLog) {
      return `No log for ${dog.name} today yet. Tap the Log tab to start tracking!`
    }
    const missing = []
    if (!todayLog.food) missing.push('eaten')
    if (!todayLog.water) missing.push('had water')
    if (!todayLog.walk) missing.push('been walked')

    if (todayLog.mood === 'Sick') {
      return `${dog.name}'s mood is marked as sick today. Keep a close eye, and consider a vet if it continues.`
    }
    if (missing.length === 0) {
      return `${dog.name} is doing great today — everything is logged and on track. Keep it up!`
    }
    if (missing.length === 1) {
      return `${dog.name} hasn't ${missing[0]} yet today. A small thing to take care of.`
    }
    return `${dog.name} still hasn't ${missing.slice(0, -1).join(', ')} or ${missing[missing.length - 1]} today. Worth catching up on.`
  }

  // today's real status
  const todayStatus = [
    { Comp: DogFood, label: 'Food', done: !!todayLog?.food },
    { Comp: DogWater, label: 'Water', done: !!todayLog?.water },
    { Comp: DogWalk, label: 'Walk', done: !!todayLog?.walk },
    { Comp: DogHappy, label: 'Mood', done: !!todayLog?.mood },
  ]

  // weekly mini chart
  const last7 = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const dayLetter = d.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
    const log = weekLogs.find(l => l.date === dateStr)
    const score = log ? (log.food ? 1 : 0) + (log.water ? 1 : 0) + (log.walk ? 1 : 0) + (log.bathroom ? 1 : 0) : 0
    last7.push({ letter: dayLetter, score, hasLog: !!log })
  }

  // quick stats
  const loggedThisWeek = weekLogs.length
  const walksThisWeek = weekLogs.filter(l => l.walk).length

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

        {/* dog card */}
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

        {/* real rule-based summary */}
        <div style={{ background: 'linear-gradient(135deg, #FFF0E4, #FFE8D4)', borderRadius: 'var(--radius-lg)', padding: '12px', border: '1px solid #FFD0A8' }}>
          <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 800, color: 'var(--color-primary-dark)', textTransform: 'uppercase', marginBottom: '4px' }}>Daily Summary</p>
          <p style={{ fontSize: '11px', fontWeight: 500, lineHeight: 1.5 }}>{buildSummary()}</p>
        </div>

        {/* today's real status + weekly mini chart, side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>

          {/* today status */}
          <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '12px' }}>
            <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Today</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {todayStatus.map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: item.done ? '#38A169' : '#CBA98F' }}>
                    {item.done ? '✓' : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* weekly mini chart */}
          <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '12px' }}>
            <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>This week</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '54px', gap: '3px' }}>
              {last7.map((d, i) => {
                const heightPct = (d.score / 4) * 100
                const color = d.score >= 3 ? '#38A169' : d.score >= 1 ? '#FF8C42' : '#E2E8F0'
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ width: '100%', height: `${Math.max(heightPct, 6)}%`, background: color, borderRadius: '3px 3px 0 0' }}></div>
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              {last7.map((d, i) => (
                <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: '8px', color: 'var(--color-text-muted)' }}>{d.letter}</span>
              ))}
            </div>
          </div>
        </div>

        {/* quick stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: 'var(--font-size-h2)', fontWeight: 800, color: 'var(--color-primary)' }}>{loggedThisWeek}</p>
            <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Logs this week</p>
          </div>
          <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: 'var(--font-size-h2)', fontWeight: 800, color: 'var(--color-primary)' }}>{walksThisWeek}</p>
            <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Walks this week</p>
          </div>
        </div>

        {/* streak banner */}
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