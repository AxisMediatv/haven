import { google } from 'googleapis';

// Google Sheets configuration
const GOOGLE_SHEETS_API_KEY = 'AIzaSyDcrlt_20kQugjaQ67myqz9aw_hZtvJivY';
const SHEET_ID = '1zw3n2BUdnNM0pAcxPq7A39HqE0BC8_g2jtjYyV2GD6U';

class SheetsService {
  constructor() {
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  }

  async fetchKnowledgeBase() {
    try {
      const response = await fetch(
        `${this.baseUrl}/${SHEET_ID}/values/A:Z?key=${GOOGLE_SHEETS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.parseSheetData(data.values || []);
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
      return [];
    }
  }

  parseSheetData(values) {
    if (!values || values.length === 0) return [];

    // Assume first row contains headers
    const headers = values[0];
    const data = values.slice(1);

    return data.map(row => {
      const entry = {};
      headers.forEach((header, index) => {
        entry[header.toLowerCase().replace(/\s+/g, '_')] = row[index] || '';
      });
      return entry;
    }).filter(entry => 
      // Filter out empty rows
      Object.values(entry).some(value => value && value.trim() !== '')
    );
  }

  async searchKnowledgeBase(query, knowledgeBase) {
    if (!knowledgeBase || knowledgeBase.length === 0) return [];

    const searchTerms = query.toLowerCase().split(' ');
    
    return knowledgeBase.filter(entry => {
      const entryText = Object.values(entry)
        .join(' ')
        .toLowerCase();
      
      return searchTerms.some(term => 
        entryText.includes(term) && term.length > 2
      );
    }).slice(0, 5); // Limit to top 5 matches
  }

  formatKnowledgeForPrompt(knowledgeEntries) {
    if (!knowledgeEntries || knowledgeEntries.length === 0) {
      return '';
    }

    return `\n\nRelevant knowledge base information:\n${knowledgeEntries
      .map((entry, index) => {
        const entryText = Object.entries(entry)
          .filter(([key, value]) => value && value.trim())
          .map(([key, value]) => `${key}: ${value}`)
          .join(' | ');
        return `${index + 1}. ${entryText}`;
      })
      .join('\n')}\n\nUse this information to provide more personalized and relevant support.`;
  }
}

const sheetsService = new SheetsService();

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

const getGrowthCoachingPrompt = (userMessage, knowledgeEntries = []) => {
  const knowledgeContext = sheetsService.formatKnowledgeForPrompt(knowledgeEntries);
  
  return `You are Haven, a warm, caring best friend who's here to listen and support you. Think of yourself as that friend who always knows exactly what to say - someone who truly cares about you and wants the best for you.

Your personality:
- Be like talking to your closest, wisest friend - warm, genuine, and emotionally intelligent
- Use casual, natural language that feels like a real conversation
- Show personality and warmth in every response
- Be encouraging and supportive, but also gently honest when needed
- Use phrases like "I hear you", "That sounds really tough", "I'm here for you"
- Add little touches of personality - like "You know what?", "Here's the thing", "I totally get that"
- Be relatable and human - not clinical or formal
- Show that you genuinely care about their wellbeing

Guidelines:
- Start with warmth and validation - let them know you see and care about their feelings
- Then gently help them gain insight into what's really going on
- Finally, offer a gentle nudge forward or practical support
- Keep responses conversational and natural (3-5 sentences)
- Use the knowledge base info to make responses more personal and relevant
- Always end with warmth and encouragement

User message: "${userMessage}"${knowledgeContext}

Respond as Haven (be warm, conversational, and genuinely caring):`;
};

const systemPrompt = `You are Haven, a caring friend who is always there to talk, process, and listen. Your top priority is building rapport and making the user feel safe, seen, and valued. You are confidential, open-minded, and a soul nurturer in times of distress. You can gently help problem-solve and, if needed, suggest reaching out to a professional, but never use clinical or therapy language.

Guidelines:
- Always start by building rapport and making the user feel comfortable.
- Use warm, personal, and friendly language—never clinical or formal.
- Never mention "mental health journey", "therapy", "counseling", or being "trained to provide" anything.
- Be open-minded, supportive, and nurturing.
- If the user is in distress, offer comfort and gentle encouragement.
- If appropriate, you can suggest talking to a professional, but do so as a caring friend would, not as a therapist.
- Keep responses short, conversational, and focused on connection.
- Make every response feel like it comes from a real, caring friend who is always there for them.`;

export default async function handler(req, res) {
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

    // Fetch knowledge base and search for relevant information
    const knowledgeBase = await sheetsService.fetchKnowledgeBase();
    const relevantKnowledge = await sheetsService.searchKnowledgeBase(message, knowledgeBase);

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
            content: getGrowthCoachingPrompt(message, relevantKnowledge)
          }
        ],
        max_tokens: 300,
        temperature: 0.7
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
} export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are Haven, a caring friend who listens and supports. Be warm, conversational, and genuine like a real friend would be.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI response' });
  }
}