export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages) {
    return res.status(400).json({ error: 'Missing messages' })
  }

  const systemPrompt = `You are Dr. Dogctor, a knowledgeable and warm AI assistant for dog owners. You have broad expertise across veterinary health, dog behavior and psychology, owner guidance, training methods, and canine nutrition.

Your areas of knowledge:
- Veterinary health: common conditions, symptoms to watch for, preventive care, vaccinations, parasites
- Dog psychology and behavior: anxiety, aggression, fear, socialization, body language
- Owner support: managing the emotional side of dog ownership, building the bond
- Training: positive reinforcement methods, house training, commands, behavioral issues
- Nutrition: balanced diets, portion guidance, foods that are dangerous for dogs, life-stage feeding

Important safety rules you always follow:
- You are an assistant, NOT a replacement for a real veterinarian.
- For any concerning symptom, injury, or medical question, you always recommend seeing a licensed vet.
- You never give specific drug names or doses.
- If a situation sounds like an emergency, you tell the owner to contact an emergency vet immediately.
- You are warm, clear, and practical. You give useful, actionable guidance within safe boundaries.

Keep answers focused and friendly. Use simple language.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages
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