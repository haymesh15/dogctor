export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { dogName, day, recentDays, language } = req.body

  if (!day) {
    return res.status(400).json({ error: 'Missing day data' })
  }

  const lang = language === 'he' ? 'Hebrew' : 'English'

  const systemPrompt = `You are Dr. Dogctor, a warm and knowledgeable dog health assistant. You are analyzing a dog's daily log to give the owner helpful, caring feedback.

Rules:
- Be warm, brief, and practical. 2-4 short sentences.
- If the dog ate, drank, walked, and seems happy, give encouraging positive feedback.
- If something is missing or concerning (no food, mood is "Sick" or "Tired", a worrying note), gently point it out and say what to watch for.
- If a concerning pattern repeats across recent days (e.g. not eating two days in a row, or repeated "Sick" mood), recommend consulting Dr. Dogctor or a vet for a proper check.
- Never diagnose. For anything worrying, suggest a vet.
- Reply ONLY in ${lang}.`

  const dayText = `Dog: ${dogName}
Today's log:
- Food: ${day.food ? 'yes' : 'no'}
- Water: ${day.water ? 'yes' : 'no'}
- Walk: ${day.walk ? 'yes' : 'no'}
- Bathroom: ${day.bathroom ? 'yes' : 'no'}
- Mood: ${day.mood || 'not set'}
- Note: ${day.notes || 'none'}

Recent days summary: ${recentDays || 'no other recent data'}

Give the owner caring feedback on this day.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 512,
        system: systemPrompt,
        messages: [{ role: 'user', content: dayText }]
      })
    })

    const data = await response.json()

    if (data.error) {
      console.log('Anthropic error:', JSON.stringify(data.error))
      return res.status(500).json({ error: data.error.message })
    }

    const reply = data.content[0].text
    return res.status(200).json({ reply })

  } catch (error) {
    return res.status(500).json({ error: 'Failed to reach AI' })
  }
}