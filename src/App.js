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

**I'm really worried about you. If you're thinking about hurting yourself, please call 988 right now! If you need to call 911 instead, I can help you explain what's happening. I can give you a summary of our conversation to share with the operator if that would help. I'm staying right here with you. I won't leave your side.**
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
      // Send the user message to the backend API
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
      const greetings = [
    const greetings = [
  "Hi, I missed you. How have you been?",
  "Hi there! How's it going? I would love to hear more. Remember, I am here for you",
  "Hey, how are you feeling today? I want to take some time to just listen to you. Tell me what's going on",
  "Hey! Talk to me - what's going on?",
  "Hey, it's good to hear from you. Let's have some one-on-one time to talk",
  "I'm all ears, let it all out. What's on your mind?",
  "It's great to be here with you. Do you have a few moments to tell me what's going on?"
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
<<<<<<< HEAD
// force deploy
// Force new deployment


// git add .
// git commit -m "Force new deployment"
// git push
=======
>>>>>>> 643657a5bcd3742c523e8c52f40a339e7321586e
