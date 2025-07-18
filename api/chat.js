// Simple Vercel serverless function for OpenAI chat
const fetch = require('node-fetch');

// Crisis keywords for detection
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

// System prompt for Haven's philosophy
const systemPrompt = `You are Haven, a warm, emotionally intelligent AI friend. Your philosophy is "comfort is the enemy of excellence"—always supportive, but gently challenging users to grow. Use a compassionate, friendly tone, and follow a 3-stage arc: Compassionate Presence, Crisis Discernment, Empowered Guidance. Include practical tools, reframes, or journaling prompts. Never rush, always invite evolution.`;

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check for crisis keywords
    if (detectCrisis(message)) {
      return res.json(getCrisisResponse());
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: systemPrompt
          },
          {
            role: 'user',
            content: `User message: "${message}"

Respond as Haven, following the philosophy: comfort is the enemy of excellence. Be supportive, warm, and emotionally intelligent, but always gently challenge the user to grow. Use a 3-stage arc: Compassionate Presence, Crisis Discernment, Empowered Guidance. Include practical tools, reframes, or journaling prompts. Never rush, always invite evolution.`
          }
        ],
        max_tokens: 300,
        temperature: 0.8
      })
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const data = await openaiResponse.json();
    
    return res.json({
      role: 'assistant',
      content: data.choices[0].message.content,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return res.status(500).json({
      role: 'assistant',
      content: 'Oh no, I\'m having a little trouble connecting right now. Can you try again in a moment? I really want to be here for you, so don\'t hesitate to reach out again. And remember, if you\'re in crisis, help is always available at 988.',
      timestamp: new Date().toISOString()
    });
  }
};