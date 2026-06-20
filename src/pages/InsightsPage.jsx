import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Navbar from '../components/Navbar'
import AIFloatingButton from '../components/AIFloatingButton'

function InsightsPage() {
  const navigate = useNavigate()
  const [dog, setDog] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState(null)
  const [aiFeedback, setAiFeedback] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

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

      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const weekAgoStr = weekAgo.toISOString().split('T')[0]

      const { data: logsData } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('dog_id', dogData.id)
        .gte('date', weekAgoStr)
        .order('date', { ascending: true })

      setLogs(logsData || [])
      setLoading(false)
    }

    loadData()
  }, [])

  const getFlags = (log) => {
    if (!log) return []
    const flags = []
    if (!log.food) flags.push({ text: 'Did not eat', bad: true })
    if (!log.water) flags.push({ text: 'Did not drink', bad: true })
    if (!log.walk) flags.push({ text: 'No walk', bad: false })
    if (log.mood === 'Sick') flags.push({ text: 'Mood: Sick', bad: true })
    if (log.mood === 'Tired') flags.push({ text: 'Mood: Tired', bad: false })
    if (flags.length === 0) flags.push({ text: 'All good!', bad: false })
    return flags
  }

  const isHebrew = (text) => /[\u0590-\u05FF]/.test(text || '')

  const getAiFeedback = async () => {
    if (!selectedDay?.log) return
    setAiLoading(true)
    setAiFeedback('')

    const recentSummary = logs.map(l =>
      `${l.date}: food=${l.food}, mood=${l.mood}`
    ).join('; ')

    const language = isHebrew(selectedDay.log.notes) ? 'he' : 'en'

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dogName: dog.name,
          day: selectedDay.log,
          recentDays: recentSummary,
          language: language
        })
      })
      const data = await res.json()
      setAiFeedback(data.reply || 'Could not get feedback. Try again.')
    } catch (e) {
      setAiFeedback('Could not connect. Try again.')
    }
    setAiLoading(false)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
      </div>
    )
  }

  const totalLogs = logs.length
  const foodDays = logs.filter(l => l.food).length
  const waterDays = logs.filter(l => l.water).length
  const walkDays = logs.filter(l => l.walk).length
  const bathroomDays = logs.filter(l => l.bathroom).length

  const moodCounts = {}
  logs.forEach(l => { if (l.mood) moodCounts[l.mood] = (moodCounts[l.mood] || 0) + 1 })
  const topMood = Object.keys(moodCounts).sort((a, b) => moodCounts[b] - moodCounts[a])[0] || '—'

  const last7Days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
    const log = logs.find(l => l.date === dateStr)
    const score = log ? (log.food ? 1 : 0) + (log.water ? 1 : 0) + (log.walk ? 1 : 0) + (log.bathroom ? 1 : 0) : 0
    last7Days.push({ day: dayName, date: dateStr, score, hasLog: !!log, log })
  }

  const openDay = (d) => {
    if (!d.hasLog) return
    setSelectedDay(d)
    setAiFeedback('')
  }

  const stats = [
    { label: 'Days logged', value: `${totalLogs} this week`, color: 'var(--color-text)' },
    { label: 'Walks', value: `${walkDays}/${totalLogs} days`, color: walkDays >= totalLogs / 2 ? '#38A169' : 'var(--color-text)' },
    { label: 'Eating', value: `${foodDays}/${totalLogs} days`, color: 'var(--color-text)' },
    { label: 'Drinking', value: `${waterDays}/${totalLogs} days`, color: 'var(--color-text)' },
    { label: 'Bathroom', value: `${bathroomDays}/${totalLogs} days`, color: 'var(--color-text)' },
    { label: 'Common mood', value: topMood, color: '#38A169' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', paddingBottom: '70px' }}>

      <div style={{ padding: '16px' }}>
        <h1 style={{ fontSize: 'var(--font-size-h1)', fontWeight: 800 }}>Insights</h1>
        <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)', fontWeight: 600 }}>{dog.name}'s weekly overview</p>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {totalLogs === 0 ? (
          <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-text-muted)' }}>No logs yet this week.</p>
            <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)', marginTop: '4px' }}>Start logging to see insights!</p>
          </div>
        ) : (
          <>
            <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '16px 14px' }}>
              <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '14px' }}>Daily activity · tap a day</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '120px', gap: '6px' }}>
                {last7Days.map((d, i) => {
                  const heightPct = (d.score / 4) * 100
                  const barColor = d.score >= 3 ? '#38A169' : d.score >= 1 ? '#FF8C42' : '#E2E8F0'
                  return (
                    <div key={i} onClick={() => openDay(d)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', cursor: d.hasLog ? 'pointer' : 'default' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '4px' }}>{d.hasLog ? d.score : ''}</div>
                      <div style={{
                        width: '100%',
                        height: `${Math.max(heightPct, 4)}%`,
                        background: barColor,
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.3s',
                        minHeight: '4px',
                        border: selectedDay?.date === d.date ? '2px solid #2D2D3A' : 'none'
                      }}></div>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '6px', fontWeight: 600 }}>{d.day}</div>
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#38A169' }}></div>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Great (3-4)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#FF8C42' }}></div>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Partial (1-2)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#E2E8F0' }}></div>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>No log</span>
                </div>
              </div>
            </div>

            {selectedDay && selectedDay.log && (
              <div style={{ background: 'var(--color-surface)', border: '2px solid #FF8C42', borderRadius: 'var(--radius-lg)', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <p style={{ fontWeight: 800, fontSize: 'var(--font-size-body)' }}>{selectedDay.day} · {selectedDay.date}</p>
                  <button onClick={() => { setSelectedDay(null); setAiFeedback('') }} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '16px' }}>×</button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {getFlags(selectedDay.log).map((f, idx) => (
                    <span key={idx} style={{
                      fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px',
                      background: f.bad ? '#FEECEC' : '#F0FFF6',
                      color: f.bad ? '#E53E3E' : '#38A169'
                    }}>{f.text}</span>
                  ))}
                </div>

                {selectedDay.log.notes && (
                  <div style={{ background: '#FFF8F2', borderRadius: '8px', padding: '8px 10px', marginBottom: '10px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Note</p>
                    <p style={{ fontSize: '12px' }}>{selectedDay.log.notes}</p>
                  </div>
                )}

                {!aiFeedback && (
                  <button onClick={getAiFeedback} disabled={aiLoading} style={{
                    width: '100%', padding: '10px',
                    background: 'linear-gradient(135deg, #FF8C42, #FF6B35)',
                    color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
                    fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-family)', cursor: 'pointer',
                    opacity: aiLoading ? 0.7 : 1
                  }}>
                    {aiLoading ? 'Dr. Dogctor is checking...' : '🩺 Get AI insight on this day'}
                  </button>
                )}

                {aiFeedback && (
                  <div style={{ background: 'linear-gradient(135deg, #FFF0E4, #FFE8D4)', borderRadius: '8px', padding: '10px 12px', border: '1px solid #FFD0A8' }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-primary-dark)', textTransform: 'uppercase', marginBottom: '4px' }}>Dr. Dogctor says</p>
                    <p style={{ fontSize: '12px', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{aiFeedback}</p>
                  </div>
                )}
              </div>
            )}

            <div style={{ background: '#F0FFF6', border: '1.5px solid #38A169', borderRadius: 'var(--radius-lg)', padding: '12px' }}>
              <p style={{ fontSize: 'var(--font-size-caption)', fontWeight: 800, color: '#38A169', textTransform: 'uppercase', marginBottom: '4px' }}>This week</p>
              <p style={{ fontSize: '11px', fontWeight: 500, color: '#2D7A50' }}>{dog.name} has {totalLogs} {totalLogs === 1 ? 'log' : 'logs'} this week. Keep tracking!</p>
            </div>

            {stats.map(item => (
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
          </>
        )}

      </div>
      <Navbar />
      <AIFloatingButton />
    </div>
  )
}

export default InsightsPage