import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertTriangle, Heart, Gift } from 'lucide-react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [showPayItForward, setShowPayItForward] = useState(false);
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

  // Positive keywords for detecting uplifting conversations
  const positiveKeywords = [
    'thank you', 'thanks', 'grateful', 'appreciate', 'better', 'improved',
    'feeling good', 'happy', 'excited', 'hopeful', 'optimistic', 'positive',
    'breakthrough', 'progress', 'growth', 'learning', 'insight', 'realization',
    'feeling better', 'much better', 'great', 'wonderful', 'amazing'
  ];

  const detectPositiveConversation = (messages) => {
    if (messages.length < 4) return false; // Need at least 4 messages for a meaningful conversation
    
    const recentMessages = messages.slice(-4); // Check last 4 messages
    const userMessages = recentMessages.filter(msg => msg.role === 'user');
    
    if (userMessages.length < 2) return false;
    
    const userText = userMessages.map(msg => msg.content.toLowerCase()).join(' ');
    const hasPositiveKeywords = positiveKeywords.some(keyword => userText.includes(keyword));
    
    // Also check if the conversation has been going well (no crisis detected)
    const hasNoCrisis = !recentMessages.some(msg => msg.isCrisis);
    
    return hasPositiveKeywords && hasNoCrisis;
  };

  const handlePayItForward = () => {
    // Add a message about paying it forward
    const payItForwardMessage = {
      role: 'assistant',
      content: `That's wonderful! Here are some ways you can pay it forward and spread kindness:

**💝 Simple Acts of Kindness:**
- Send a thoughtful message to someone who's been on your mind
- Compliment a stranger or colleague
- Hold the door open for someone
- Leave an encouraging note for someone

**🤝 Support Others:**
- Listen to a friend who needs to talk
- Share your experience with someone going through something similar
- Volunteer your time to help others
- Donate to a mental health organization

**🌱 Plant Seeds of Positivity:**
- Share what you've learned from our conversation
- Encourage someone to seek help if they're struggling
- Be the person you needed when you were going through a tough time

Remember, even small acts of kindness can make a huge difference in someone's day. What resonates with you?`,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, payItForwardMessage]);
    setShowPayItForward(false);
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
      setShowCrisisAlert(true);
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
      
      // Check for positive conversation after adding the assistant message
      const updatedMessages = [...messages, newUserMessage, assistantMessage];
      if (detectPositiveConversation(updatedMessages)) {
        setShowPayItForward(true);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Oh no, I\'m having a little trouble connecting right now. Can you check your internet connection and try again? I really want to be here for you, so don\'t hesitate to reach out again. And remember, if you\'re in crisis, help is always available at 988.',
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
      setMessages([{
        role: 'assistant',
        content: 'Hey there! I\'m Haven, and I\'m so glad you\'re here. I\'m like that friend who always knows exactly what to say - someone who truly cares about you and wants the best for you. I\'m here to listen, support you, and help you grow. What\'s on your mind today? I\'m all ears! 💙',
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
          {showPayItForward && (
            <div className="pay-it-forward-container">
              <button
                onClick={handlePayItForward}
                className="pay-it-forward-button"
              >
                <Gift size={18} />
                <span>Pay It Forward</span>
              </button>
              <button
                onClick={() => setShowPayItForward(false)}
                className="pay-it-forward-dismiss"
              >
                Maybe later
              </button>
            </div>
          )}
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