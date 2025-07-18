import React, { useState, useEffect, useRef } from 'react';
import { Send, Heart } from 'lucide-react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

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
      setMessages(prev => [...prev, getCrisisResponse()]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content,
        timestamp: data.timestamp || new Date().toISOString(),
        isCrisis: data.isCrisis || false
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please check your internet connection and try again.',
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

  // Add welcome message on component mount
  useEffect(() => {
    if (messages.length === 0) {
      const greetings = [
        "Hi, how are you? What's up?",
        "Hey, it's good to hear from you",
        "I'm here to listen. What's on your mind?",
        "Hi there! How are you feeling today?"
      ];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([{
        role: 'assistant',
        content: randomGreeting,
        timestamp: new Date().toISOString()
      }]);
    }
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Heart className="logo-icon" />
            <h1>Haven</h1>
          </div>
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
              placeholder="Type your message..."
              className="message-input"
              rows="1"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="send-button"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
