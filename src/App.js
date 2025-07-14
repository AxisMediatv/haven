import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertTriangle, Heart } from 'lucide-react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      content: `I'm concerned about what you're sharing. Your life has value and there are people who care about you and want to help.

**If you're in immediate danger, please call emergency services right now:**
- **Emergency: 911** (US/Canada)
- **National Suicide Prevention Lifeline: 988** (US)
- **Crisis Text Line: Text HOME to 741741** (US)

**You're not alone, and help is available 24/7.** Would you like to talk more about what's going on? I'm here to listen.`,
      isCrisis: true
    };
  };

  const getGrowthCoachingPrompt = (userMessage) => {
    return `You are Haven, a compassionate AI mental health coach. Your role is to provide supportive, growth-oriented responses that help users develop resilience and self-awareness.

Guidelines:
- Be warm, empathetic, and non-judgmental
- Ask thoughtful questions that encourage self-reflection
- Offer gentle challenges that promote growth and perspective
- Validate feelings while encouraging positive action
- Use a conversational, caring tone
- Keep responses concise but meaningful (2-4 sentences)
- Focus on the user's strengths and potential

User message: "${userMessage}"

Respond as Haven:`;
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || !apiKey) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Check for crisis keywords
    if (detectCrisis(userMessage)) {
      setShowCrisisAlert(true);
      setMessages(prev => [...prev, getCrisisResponse()]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are Haven, a compassionate AI mental health coach focused on growth and resilience.'
            },
            {
              role: 'user',
              content: getGrowthCoachingPrompt(userMessage)
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenAI');
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please check your internet connection and try again. Remember, if you\'re in crisis, help is always available at 988.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
      // Add welcome message
      setMessages([{
        role: 'assistant',
        content: 'Welcome to Haven! I\'m here to support your mental health journey. I\'m trained to provide compassionate, growth-oriented responses. What\'s on your mind today?',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  if (showApiKeyInput) {
    return (
      <div className="app">
        <div className="api-key-container">
          <div className="api-key-card">
            <div className="logo">
              <Heart className="logo-icon" />
              <h1>Haven</h1>
            </div>
            <p className="subtitle">Mental Health Chat Support</p>
            
            <form onSubmit={handleApiKeySubmit} className="api-form">
              <div className="input-group">
                <label htmlFor="apiKey">OpenAI API Key</label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your OpenAI API key"
                  required
                />
              </div>
              <button type="submit" className="start-button">
                Start Chatting
              </button>
            </form>
            
            <div className="api-info">
              <p>Don't have an API key? Get one at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI Platform</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Heart className="logo-icon" />
            <h1>Haven</h1>
          </div>
          <button 
            className="api-key-button"
            onClick={() => setShowApiKeyInput(true)}
          >
            Change API Key
          </button>
        </div>
      </header>

      <main className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role} ${message.isCrisis ? 'crisis' : ''}`}
            >
              <div className="message-content">
                {message.content}
              </div>
              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              rows="1"
              className="message-input"
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="send-button"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>

      {showCrisisAlert && (
        <div className="crisis-alert">
          <div className="crisis-content">
            <AlertTriangle className="crisis-icon" />
            <h3>Crisis Resources Available</h3>
            <p>If you're in immediate danger, please call emergency services (911) or the National Suicide Prevention Lifeline (988).</p>
            <button 
              onClick={() => setShowCrisisAlert(false)}
              className="crisis-dismiss"
            >
              I understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App; 