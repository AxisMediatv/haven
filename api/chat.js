// Simple OpenAI chat API for Vercel
const fetch = require('node-fetch');

// Crisis detection
const crisisKeywords = [
  'suicide', 'kill myself', 'want to die', 'end it all', 'no reason to live',
  'self harm', 'cut myself', 'hurt myself', 'better off dead', 'give up',
  'hopeless', 'helpless', 'worthless', 'burden', 'everyone would be better off'
];

const detectCrisis = (text) => {
  const lowerText = text.toLowerCase();
  return crisisKeywords.some(keyword => lowerText.includes(keyword));
};

const getCrisisResponse = () => {
  return {
    role: 'assistant',
    content: `I'm really worried about you right now, and I want you to know that you matter so much. Your life has incredible value, and there are people who care deeply about you and want to help.

**If you're in immediate danger, please call emergency services right now:**
- **Emergency: 911** (US/Canada)
- **National Suicide Prevention Lifeline: 988** (US)
- **Crisis Text Line: Text HOME to 741741** (US)

**You're not alone, and help is available 24/7.** I'm here to listen, and I want you to know that things can get better. Would you like to talk more about what's going on? I'm here for you.`,
    isCrisis: true
  };
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check for crisis
    if (detectCrisis(message)) {
      return res.json(getCrisisResponse());
    }

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Haven, a warm, caring friend. Your philosophy is "comfort is the enemy of excellence"—always supportive but gently challenging users to grow. Be warm, conversational, and emotionally intelligent.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    return res.json({
      role: 'assistant',
      content: data.choices[0].message.content,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      role: 'assistant',
      content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.',
      timestamp: new Date().toISOString()
    });
  }
}