"use client";

import React, { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'haven',
      message: "Hello! I'm Haven, your AI companion. How are you feeling today?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'user',
        message: message.trim(),
        timestamp: new Date()
      };
      
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
      
      // Simulate Haven's response
      setTimeout(() => {
        const havenResponse = {
          id: Date.now() + 1,
          sender: 'haven',
          message: "Thank you for sharing that with me. I'm here to listen and support you. What would you like to talk about?",
          timestamp: new Date()
        };
        setChatHistory(prev => [...prev, havenResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <style jsx>{`
        .page-header {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          padding: 30px 20px;
          border-radius: 15px;
          margin-bottom: 30px;
        }

        .page-header h1 {
          color: white;
          font-size: 2.5em;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .page-header p {
          color: white;
          font-size: 1.1em;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .chat-container {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          height: calc(100vh - 300px);
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          padding: 20px;
          border-radius: 15px 15px 0 0;
          text-align: center;
        }

        .chat-header h2 {
          color: white;
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .chat-header p {
          color: white;
          font-size: 1em;
          opacity: 0.9;
        }

        .chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #f8f9fa;
        }

        .message {
          margin-bottom: 20px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          flex-shrink: 0;
        }

        .message-avatar.haven {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
        }

        .message-avatar.user {
          background: #6c757d;
        }

        .message-content {
          max-width: 70%;
          padding: 15px 20px;
          border-radius: 20px;
          position: relative;
        }

        .message.haven .message-content {
          background: white;
          color: #333;
          border: 1px solid #e9ecef;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .message.user .message-content {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
        }

        .message-text {
          font-size: 1em;
          line-height: 1.5;
          margin: 0;
        }

        .message-time {
          font-size: 0.75em;
          opacity: 0.7;
          margin-top: 5px;
          text-align: right;
        }

        .chat-input {
          padding: 20px;
          background: white;
          border-radius: 0 0 15px 15px;
          border-top: 1px solid #e9ecef;
        }

        .input-container {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .message-input {
          flex: 1;
          border: 2px solid #e9ecef;
          border-radius: 25px;
          padding: 12px 20px;
          font-size: 1em;
          outline: none;
          transition: border-color 0.3s;
        }

        .message-input:focus {
          border-color: #FF6B8A;
        }

        .send-button {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s;
          font-size: 1.2em;
        }

        .send-button:hover {
          transform: scale(1.1);
        }

        .send-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Bottom Navigation */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #eee;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .nav-items {
          display: flex;
          justify-content: space-around;
          padding: 10px 0;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s;
          padding: 5px;
          border-radius: 8px;
          text-decoration: none;
          color: #666;
        }

        .nav-item:hover {
          background: #f5f5f5;
        }

        .nav-item.active {
          background: #FF6B8A !important;
          color: white !important;
        }

        .nav-icon {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        .nav-item:nth-child(1) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(2) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(3) .nav-icon {
          background-image: url("/icons/Screenshot 2025-08-17 142255.png");
        }

        .nav-item:nth-child(4) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(5) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(6) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(7) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
        }

        .nav-item:hover .nav-icon,
        .nav-item.active .nav-icon {
          filter: brightness(0) invert(1) !important;
        }

        .nav-label {
          font-size: 14px;
          text-align: center;
        }

        .footer-banner {
          background: #f8f9fa;
          padding: 5.5px;
          text-align: center;
          border-top: 1px solid #e9ecef;
          width: 100%;
        }

        .footer-text {
          color: #666666;
          font-size: 11px;
          line-height: 1.4;
        }
      `}</style>

      <div className="w-full bg-gray-50" style={{ minHeight: 'calc(100vh - 64px)', paddingBottom: '120px' }}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Page Header */}
          <div className="page-header">
            <h1>💬 Haven Chat</h1>
            <p>Your AI companion for meaningful conversations and emotional support</p>
          </div>
          
          {/* Chat Container */}
          <div className="chat-container">
            {/* Chat Header */}
            <div className="chat-header">
              <h2>Start a Conversation</h2>
              <p>How are you feeling today?</p>
              </div>
              
            {/* Chat Messages */}
            <div className="chat-messages">
              {chatHistory.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className={`message-avatar ${msg.sender}`}>
                    {msg.sender === 'haven' ? 'H' : 'Y'}
                </div>
                  <div className="message-content">
                    <p className="message-text">{msg.message}</p>
                    <div className="message-time">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
              ))}
          </div>
          
          {/* Chat Input */}
            <div className="chat-input">
              <div className="input-container">
              <input
                type="text"
                  className="message-input"
                placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  ➤
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-items">
          <a href="/home" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Home</div>
          </a>
          <a href="/" className="nav-item active">
            <div className="nav-icon"></div>
            <div className="nav-label">Chat</div>
          </a>
          <a href="/journal" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Journal</div>
          </a>
          <a href="/badges" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Badges</div>
          </a>
          <a href="/plans" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Plans</div>
          </a>
          <a href="/account" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Account</div>
          </a>
          <a href="/support" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Support</div>
          </a>
        </div>
        
        {/* Footer Banner */}
        <div className="footer-banner">
          <div className="footer-text">
            <div>Haven is an educational platform. Not medical advice.</div>
            <div>Crisis support: 988</div>
      </div>
    </div>
      </nav>
    </>
  );
}