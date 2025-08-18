"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Type definitions for TypeScript
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title?: string;
  timestamp: string;
  messages: Message[];
  isSaved?: boolean;
  tags?: string[];
  duration?: number;
}

interface SubscriptionData {
  status?: string;
  planId?: string;
  plan?: string;
}

interface TokenStatus {
  success: boolean;
  tokens: number;
  limit: number;
  plan: string;
  lastReset: string;
}

export default function AccountPage() {
  // State management
  const [preferredName, setPreferredName] = useState("");
  const [selectedMood, setSelectedMood] = useState("balanced-mix");
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [conversationSaveMode, setConversationSaveMode] = useState("manual");
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({});
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [userEmail, setUserEmail] = useState("");
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Load data on component mount
  useEffect(() => {
    loadInitialData();
    loadConversationStats();
    loadConversationHistory();
    loadUserEmail();
    loadSubscriptionInfo();
    loadTokenInfo();
    loadAccountSettings();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      loadTokenInfo();
      loadSubscriptionInfo();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Core functions will be added here
  const loadInitialData = () => {
    // Load saved settings from localStorage
    const onboardingData = JSON.parse(localStorage.getItem('havenOnboarding') || '{}');
    const savedMood = onboardingData.mood || localStorage.getItem('havenMood') || 'balanced-mix';
    const savedQualities = onboardingData.qualities || JSON.parse(localStorage.getItem('selectedQualities') || '[]');
    const savedName = localStorage.getItem('preferredName');

    setSelectedMood(savedMood);
    setSelectedQualities(savedQualities);
    setPreferredName(savedName || '');
  };

  const loadConversationStats = () => {
    // Load conversation stats from localStorage
    const savedConversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
    setConversations(savedConversations);
  };

  const loadConversationHistory = () => {
    // Load conversation history from localStorage
    const savedConversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
    setConversations(savedConversations);
  };

  const loadUserEmail = () => {
    // Load user email from localStorage
    const userEmail = localStorage.getItem('havenUserEmail');
    setUserEmail(userEmail || 'No email set');
  };

  const loadSubscriptionInfo = () => {
    // Load subscription info from localStorage
    const subscriptionData = JSON.parse(localStorage.getItem('havenSubscription') || '{}');
    setSubscriptionData(subscriptionData);
  };

  const loadTokenInfo = () => {
    // Load token info from localStorage or API
    const tokenInfo = JSON.parse(localStorage.getItem('havenTokenInfo') || '{}');
    setTokenInfo(tokenInfo);
  };

  const loadAccountSettings = () => {
    // Load account settings from localStorage
    const saveMode = localStorage.getItem('havenConversationSaveMode') || 'manual';
    setConversationSaveMode(saveMode);
  };

  // Helper functions
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const openConversationModal = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowConversationModal(true);
  };

  const deleteConversation = (conversationId: string) => {
    if (confirm('Are you sure you want to delete this conversation? This action cannot be undone.')) {
      const updatedConversations = conversations.filter(conv => conv.id !== conversationId);
      localStorage.setItem('havenConversations', JSON.stringify(updatedConversations));
      setConversations(updatedConversations);
      // Reload conversation sections
      loadConversationStats();
    }
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #FFE5E5 0%, #FFF5E1 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-size: 14px;
          line-height: 1.4;
        }

        .container {
          max-width: 98%;
          margin: 0 auto;
          padding: 0 100px;
          padding-bottom: 120px;
        }



        .original-price {
          text-decoration: line-through;
          color: #999;
          font-size: 0.9em;
          margin-right: 8px;
        }

        .beta-price {
          color: #FF6B8A;
          font-weight: bold;
        }

        .account-content {
          padding: 30px;
          flex: 1;
        }

        .section {
          margin-bottom: 20px;
        }

        .section h2 {
          color: #333;
          font-size: 1.5em;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }

        .section-icon {
          margin-right: 10px;
          font-size: 1.2em;
        }

        .setting-item {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 10px;
          margin-bottom: 8px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .setting-item:hover {
          border-color: #FF6B8A;
          transform: translateY(-2px);
        }

        .setting-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .setting-title {
          font-weight: 600;
          color: #333;
          font-size: 1.1em;
        }

        .setting-value {
          color: #666;
          font-size: 0.9em;
        }

        .setting-description {
          color: #666;
          font-size: 0.9em;
          line-height: 1.4;
        }

        .input-field {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #eee;
          border-radius: 10px;
          font-size: 1em;
          margin-top: 10px;
          transition: border-color 0.3s ease;
        }

        .input-field:focus {
          outline: none;
          border-color: #FF6B8A;
        }

        /* Plan Management */
        .plan-card {
          background: white;
          border: 2px solid #eee;
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }

        .plan-card.current {
          border-color: #FF6B8A;
          background: rgba(255, 107, 138, 0.05);
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .plan-name {
          font-weight: 600;
          color: #333;
          font-size: 1.2em;
        }

        .plan-price {
          color: #FF6B8A;
          font-weight: 600;
          font-size: 1.1em;
        }

        .plan-features {
          color: #666;
          font-size: 0.9em;
          margin-bottom: 15px;
        }

        .plan-actions {
          display: flex;
          gap: 10px;
        }

        /* Persona Settings */
        .persona-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .persona-card {
          background: white;
          border: 2px solid #eee;
          border-radius: 15px;
          padding: 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .persona-card:hover {
          border-color: #FF6B8A;
          transform: translateY(-2px);
        }

        .persona-card.selected {
          border-color: #FF6B8A;
          background: rgba(255, 107, 138, 0.1);
        }

        .persona-icon {
          font-size: 2em;
          margin-bottom: 10px;
        }

        .persona-name {
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .persona-description {
          font-size: 0.8em;
          color: #666;
          line-height: 1.3;
        }

        /* Energy Type Selection */
        .mood-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
          margin-top: 15px;
        }

        .mood-card {
          background: #FF6B8A;
          color: white;
          border: none;
          border-radius: 15px;
          padding: 15px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 0.9em;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .mood-card:nth-child(1) { background: #FF6B8A; } /* Motherly - Pink */
        .mood-card:nth-child(2) { background: #FF8A65; } /* Fatherly - Orange */
        .mood-card:nth-child(3) { background: #9C27B0; } /* Faith-Centered - Purple */
        .mood-card:nth-child(4) { background: #FF8A65; } /* Best Friend - Orange */
        .mood-card:nth-child(5) { background: #FF6B8A; } /* Wise Mentor - Pink */
        .mood-card:nth-child(6) { background: #FFD93D; } /* Solution Coach - Yellow */
        .mood-card:nth-child(7) { background: #FF6B8A; } /* Calm & Centering - Pink */
        .mood-card:nth-child(8) { background: #FF6B8A; } /* Balanced Mix - Pink */

        .mood-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .mood-card.selected {
          border: 3px solid white;
          box-shadow: 0 0 0 3px #FF6B8A;
        }

        .mood-card.selected::after {
          content: "✓";
          position: absolute;
          top: 5px;
          right: 10px;
          font-weight: bold;
          font-size: 1.2em;
        }

        .mood-name {
          font-weight: 500;
          color: white;
          line-height: 1.2;
        }

        .qualities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
          margin-top: 15px;
        }

        .quality-item {
          background: white;
          border: 2px solid #eee;
          border-radius: 15px;
          padding: 12px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .quality-item:hover {
          border-color: #FF6B8A;
        }

        .quality-item input[type="checkbox"] {
          transform: scale(1.2);
          accent-color: #FF6B8A;
        }

        .quality-name {
          font-weight: 500;
          color: #333;
          font-size: 0.9em;
        }

        /* Conversation History */
        .history-section {
          margin-top: 30px;
        }

        .history-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: white;
          border: 2px solid #eee;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }

        .stat-number {
          font-size: 2em;
          font-weight: 700;
          color: #FF6B8A;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.9em;
          color: #666;
        }

        .conversation-item {
          background: white;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .conversation-item:hover {
          border-color: #FF6B8A;
          transform: translateY(-1px);
        }

        .conversation-date {
          font-size: 0.8em;
          color: #999;
          margin-bottom: 5px;
        }

        .conversation-preview {
          color: #333;
          font-size: 0.9em;
          line-height: 1.4;
        }

        .conversation-tags {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .tag {
          background: rgba(255, 107, 138, 0.1);
          color: #FF6B8A;
          padding: 4px 8px;
          border-radius: 10px;
          font-size: 0.7em;
          font-weight: 500;
        }

        /* Buttons */
        .button {
          background: #FF6B8A;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 138, 0.3);
        }

        .button.secondary {
          background: #f8f9fa;
          color: #666;
          border: 2px solid #eee;
        }

        .button.secondary:hover {
          border-color: #FF6B8A;
          color: #FF6B8A;
        }

        .button.success {
          background: #FF6B8A;
        }

        .button.warning {
          background: #ffc107;
          color: #333;
        }

        .save-button {
          background: #FF6B8A;
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 1.1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
          width: 100%;
        }

        .save-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 138, 0.3);
        }

        /* Plan Management Styles */
        .plan-card {
          background: white;
          border: 2px solid #eee;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }

        .plan-card.current {
          border-color: #FF6B8A;
          background: rgba(255, 107, 138, 0.05);
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .plan-name {
          font-weight: 600;
          color: #333;
          font-size: 0.95em;
        }

        .plan-price {
          font-weight: 600;
          color: #FF6B8A;
          font-size: 0.9em;
        }

        .plan-features {
          color: #666;
          font-size: 0.8em;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .plan-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .plan-actions .button {
          font-size: 0.8em;
          padding: 8px 12px;
          flex: 1;
          min-width: 120px;
        }

        /* Service and Action Cards */
        .service-card, .action-card {
          background: white;
          border: 2px solid #eee;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }

        .service-card:hover, .action-card:hover {
          border-color: #FF6B8A;
          transform: translateY(-1px);
        }

        .service-header, .action-header {
          margin-bottom: 10px;
        }

        .service-name, .action-name {
          font-weight: 600;
          color: #333;
          font-size: 0.95em;
          margin-bottom: 5px;
        }

        .service-price {
          font-weight: 600;
          color: #FF6B8A;
          font-size: 0.9em;
        }

        .service-description, .action-description {
          color: #666;
          font-size: 0.8em;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        /* Bottom Navigation */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #e9ecef;
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
          padding: 8px 12px;
          border-radius: 15px;
          cursor: pointer;
          text-decoration: none;
          color: #666;
          position: relative;
        }

        .nav-item:hover {
          background: #FF6B8A;
          color: white;
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
          font-weight: 500;
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

        @media (max-width: 600px) {
          .container {
            margin: 10px;
            padding: 0 20px;
          }
          
          .account-content {
            padding: 20px;
          }
          
          .persona-grid {
            grid-template-columns: 1fr;
          }
          
          .qualities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .history-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="container">
        <div className="page-header" style={{marginBottom: '30px', textAlign: 'center'}}>
          <h1 style={{fontSize: '2.5em', color: '#333', marginBottom: '10px'}}>Account Settings</h1>
          <p style={{fontSize: '1.1em', color: '#666'}}>Manage your Haven experience and track your progress</p>
        </div>

        <div className="account-content">
          {/* Account Information Section */}
          <div className="section">
            <h2><span className="section-icon">👤</span>Account Information</h2>
            
            <div className="user-info-section" style={{
              marginBottom: '25px', 
              padding: '20px', 
              background: '#f8f9fa', 
              borderRadius: '15px', 
              border: '2px solid #FF6B8A'
            }}>
              <div className="user-details">
                <div className="preferred-name" style={{marginBottom: '20px'}}>
                  <strong style={{color: '#666', display: 'block', marginBottom: '8px'}}>Preferred Name:</strong>
                  <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Enter your preferred name" 
                      style={{
                        flex: 1, 
                        padding: '10px', 
                        border: '2px solid #eee', 
                        borderRadius: '15px', 
                        fontSize: '1em', 
                        background: 'white'
                      }}
                      value={preferredName}
                      onChange={(e) => setPreferredName(e.target.value)}
                    />
                    <button 
                      onClick={() => {
                        if (!preferredName.trim()) {
                          alert('Please enter a preferred name.');
                          return;
                        }
                        localStorage.setItem('preferredName', preferredName);
                        alert('Preferred name saved successfully! Haven will now address you as "' + preferredName + '".');
                      }}
                      style={{
                        background: '#FF6B8A',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '15px',
                        fontSize: '0.9em',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      Save Name
                    </button>
                  </div>
                </div>
                
                <div className="user-email" style={{marginBottom: '15px'}}>
                  <strong style={{color: '#666'}}>Email:</strong>
                  <span style={{color: '#333', marginLeft: '8px'}}>
                    {userEmail || 'Loading...'}
                  </span>
                </div>
                
                <div className="current-subscription" style={{marginBottom: '15px'}}>
                  <strong style={{color: '#666'}}>Current Subscription:</strong>
                  <span style={{color: '#FF6B8A', fontWeight: 'bold', marginLeft: '8px', fontSize: '1.1em'}}>
                    {subscriptionData.status === 'active' ? 'Active Plan' : 'Free Trial (12 tokens)'}
                  </span>
                </div>
                
                <div className="tokens-remaining" style={{marginBottom: '15px'}}>
                  <strong style={{color: '#666'}}>Tokens Remaining:</strong>
                  <span style={{color: '#FF6B8A', fontWeight: 'bold', marginLeft: '8px', fontSize: '1.1em'}}>
                    {tokenInfo?.tokens || '12'} tokens
                  </span>
                </div>
                
                <div className="tokens-info" style={{
                  fontSize: '0.9em', 
                  color: '#666', 
                  lineHeight: '1.4', 
                  marginBottom: '15px'
                }}>
                  <div style={{marginBottom: '5px'}}>• Each conversation uses approximately 50-100 tokens</div>
                  <div style={{marginBottom: '5px'}}>• You have enough tokens for about 12-25 more conversations</div>
                  <div style={{marginBottom: '15px'}}>• Tokens refresh monthly with your subscription</div>
                </div>
                
                <div className="member-since" style={{
                  marginTop: '20px', 
                  paddingTop: '15px', 
                  borderTop: '1px solid #eee'
                }}>
                  <strong style={{color: '#666'}}>Member Since:</strong>
                  <span style={{color: '#333', marginLeft: '8px'}}>March 15, 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Persona Settings */}
          <div className="section">
            <h2><span className="section-icon">🎭</span>Persona Settings</h2>
            <div className="setting-description">Choose how Haven communicates with you. You can change this anytime.</div>
            
            <h3 style={{margin: '20px 0 10px 0', color: '#333'}}>Energy Type</h3>
            <div className="mood-grid">
              {[
                { mood: 'motherly', name: 'Motherly - Sweet & Nurturing' },
                { mood: 'fatherly', name: 'Fatherly - Strong & Bold' },
                { mood: 'faith-centered', name: 'Faith-Centered & Wise' },
                { mood: 'best-friend', name: 'Best Friend Energy - conversation and humor' },
                { mood: 'wise-mentor', name: 'Wise Mentor - gentle but transformative' },
                { mood: 'solution-coach', name: 'Solution-Focused Coach - Practical action-oriented' },
                { mood: 'calm-centering', name: 'Calm & Centering - Meditation and mindfulness' },
                { mood: 'balanced-mix', name: 'Balanced Mix' }
              ].map((moodOption, index) => (
                <div 
                  key={moodOption.mood}
                  className={`mood-card ${selectedMood === moodOption.mood ? 'selected' : ''}`}
                  onClick={() => setSelectedMood(moodOption.mood)}
                  style={{
                    background: index === 0 || index === 4 || index === 6 || index === 7 ? '#FF6B8A' : 
                             index === 1 || index === 3 ? '#FF8A65' : 
                             index === 2 ? '#9C27B0' : '#FFD93D'
                  }}
                >
                  <div className="mood-name">{moodOption.name}</div>
                </div>
              ))}
            </div>

            <h3 style={{margin: '20px 0 10px 0', color: '#333'}}>Qualities</h3>
            <div className="setting-description" style={{marginBottom: '15px'}}>
              Choose the qualities that would help you most (pick as many as you'd like)
            </div>
            <div className="qualities-grid">
              {[
                'non-judgmental',
                'tough-love',
                'empathetic',
                'faith-centered',
                'problem-solver',
                'encourager',
                'growth-focused'
              ].map((quality) => (
                <div key={quality} className="quality-item">
                  <input 
                    type="checkbox" 
                    id={`quality-${quality}`}
                    checked={selectedQualities.includes(quality)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedQualities([...selectedQualities, quality]);
                      } else {
                        setSelectedQualities(selectedQualities.filter(q => q !== quality));
                      }
                    }}
                    style={{marginRight: '10px'}}
                  />
                  <label htmlFor={`quality-${quality}`} className="quality-name">
                    {quality === 'non-judgmental' ? 'Non-judgmental listener' :
                     quality === 'tough-love' ? 'Loving tough love when needed' :
                     quality === 'empathetic' ? 'Deeply empathetic and caring' :
                     quality === 'faith-centered' ? 'Faith-centered perspective' :
                     quality === 'problem-solver' ? 'Direct problem-solver' :
                     quality === 'encourager' ? 'Gentle encourager' :
                     'Growth-focused challenger'}
                  </label>
                </div>
              ))}
            </div>

            <button 
              className="save-button" 
              onClick={() => {
                localStorage.setItem('havenMood', selectedMood);
                localStorage.setItem('selectedQualities', JSON.stringify(selectedQualities));
                localStorage.setItem('preferredName', preferredName);

                // Update onboarding data to match
                const onboardingData = JSON.parse(localStorage.getItem('havenOnboarding') || '{}');
                onboardingData.mood = selectedMood;
                onboardingData.qualities = selectedQualities;
                localStorage.setItem('havenOnboarding', JSON.stringify(onboardingData));

                alert('Persona settings saved successfully! Haven will now address you as "' + preferredName + '" with your selected energy type and qualities.');
              }}
            >
              Save Persona Settings
            </button>
          </div>

          {/* Conversation History */}
          <div className="section history-section">
            <h2><span className="section-icon">💬</span>Conversation History</h2>
            
            {/* History Actions */}
            <div className="history-actions" style={{
              marginBottom: '25px', 
              display: 'flex', 
              gap: '10px', 
              flexWrap: 'wrap'
            }}>
              <button 
                className="button secondary" 
                onClick={() => {
                  const conversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
                  if (conversations.length === 0) {
                    alert('No conversation history to export.');
                    return;
                  }
                  
                  const exportData = {
                    exportDate: new Date().toISOString(),
                    totalConversations: conversations.length,
                    conversations: conversations,
                    exportType: 'full_conversation_history'
                  };
                  
                  const dataStr = JSON.stringify(exportData, null, 2);
                  const dataBlob = new Blob([dataStr], {type: 'application/json'});
                  const url = URL.createObjectURL(dataBlob);
                  
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `haven-conversations-${new Date().toISOString().split('T')[0]}.json`;
                  link.click();
                  
                  URL.revokeObjectURL(url);
                  alert('Conversation history exported successfully!');
                }}
                style={{
                  background: '#FFD93D', 
                  color: '#333', 
                  border: 'none', 
                  padding: '10px 15px', 
                  borderRadius: '15px', 
                  fontSize: '0.9em', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s ease'
                }}
              >
                Export History
              </button>
              <button 
                className="button secondary" 
                onClick={() => {
                  const conversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
                  if (conversations.length === 0) {
                    alert('No conversation history to save.');
                    return;
                  }
                  
                  // Simulate cloud save
                  localStorage.setItem('havenConversationsBackup', JSON.stringify(conversations));
                  localStorage.setItem('havenBackupDate', new Date().toISOString());
                  
                  alert('Conversation history saved to cloud successfully!');
                }}
                style={{
                  background: '#FF9A8B', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 15px', 
                  borderRadius: '15px', 
                  fontSize: '0.9em', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s ease'
                }}
              >
                Save to Cloud
              </button>
              <button 
                className="button warning" 
                onClick={() => {
                  if (confirm('Are you sure you want to clear all conversation history? This action cannot be undone.')) {
                    if (confirm('This will permanently delete all your conversation history. Are you absolutely sure?')) {
                      localStorage.removeItem('havenConversations');
                      localStorage.removeItem('havenConversationsBackup');
                      alert('All conversation history has been cleared.');
                      window.location.reload(); // Refresh page to update display
                    }
                  }
                }}
                style={{
                  background: '#ff6b6b', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 15px', 
                  borderRadius: '15px', 
                  fontSize: '0.9em', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s ease'
                }}
              >
                Clear History
              </button>
            </div>
            
            <div className="history-stats">
              <div className="stat-card">
                <div className="stat-number" id="totalConversations">
                  {conversations.length}
                </div>
                <div className="stat-label">Total Conversations</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number" id="thisWeekConversations">
                  {conversations.filter(conv => {
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return new Date(conv.timestamp) > oneWeekAgo;
                  }).length}
                </div>
                <div className="stat-label">This Week</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number" id="avgDuration">
                  {conversations.length > 0 ? 
                    Math.round(conversations.reduce((sum, conv) => sum + (conv.duration || 0), 0) / conversations.length * 10) / 10 : 
                    0
                  }
                </div>
                <div className="stat-label">Avg Duration (min)</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number" id="daysActive">
                  {new Set(conversations.map(conv => new Date(conv.timestamp).toDateString())).size}
                </div>
                <div className="stat-label">Days Active</div>
              </div>
            </div>

            <div id="conversationHistoryContainer">
              {conversations.length === 0 ? (
                <div className="conversation-item" style={{
                  textAlign: 'center', 
                  color: '#666', 
                  padding: '40px 20px'
                }}>
                  <div>No saved conversations yet. Start chatting with Haven and save your conversations to see your history here!</div>
                </div>
              ) : (
                conversations.slice(0, 10).map((conv, index) => {
                  const date = new Date(conv.timestamp);
                  const timeAgo = getTimeAgo(date);
                  const preview = conv.title || (conv.messages && conv.messages[0] ? conv.messages[0].content.substring(0, 100) + '...' : 'Conversation');
                  const saveType = conv.isSaved ? 'Manually Saved' : 'Auto-saved from Chat';
                  const saveTypeColor = conv.isSaved ? '#28a745' : '#FF6B8A';
                  
                  return (
                    <div key={conv.id || index} className="conversation-item">
                      <div className="conversation-date">{timeAgo}</div>
                      <div className="conversation-preview">"{preview}"</div>
                      <div style={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginTop: '8px'
                      }}>
                        <div style={{
                          background: saveTypeColor,
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '10px',
                          fontSize: '0.7em',
                          fontWeight: 'bold'
                        }}>{saveType}</div>
                        <div style={{display: 'flex', gap: '5px'}}>
                          <button 
                            onClick={() => openConversationModal(conv)}
                            style={{
                              background: '#FF6B8A',
                              color: 'white',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '15px',
                              fontSize: '0.8em',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            📖 Load
                          </button>
                          <button 
                            onClick={() => deleteConversation(conv.id)}
                            style={{
                              background: '#ff4757',
                              color: 'white',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '15px',
                              fontSize: '0.8em',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              
              {conversations.length > 10 && (
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                  <button 
                    onClick={() => {
                      // Load more conversations logic
                      alert('Load more functionality will be implemented');
                    }}
                    style={{
                      background: '#FF6B8A',
                      color: 'white',
                      border: 'none',
                      padding: '12px 25px',
                      borderRadius: '15px',
                      fontSize: '1em',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Load More Conversations ({conversations.length - 10} remaining)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Plan Management */}
          <div className="section">
            <h2><span className="section-icon">💎</span>Plan Management</h2>
            
            <div className="plan-card current">
              <div className="plan-header">
                <div className="plan-name">Starter Plan</div>
                <div className="plan-price">
                  <span className="original-price">$5.99/month</span>
                  <span className="beta-price">$2.99/month</span>
                </div>
              </div>
              <div className="plan-features">300 tokens per month • Basic support • Standard features</div>
              <div className="plan-actions">
                <button 
                  className="button success" 
                  onClick={() => {
                    if (confirm('Upgrade to Regular Plan ($9.99/month)?')) {
                      console.log('Upgrading to regular plan');
                      alert('Payment system is in demo mode. Redirecting to success page for testing.');
                    }
                  }}
                >
                  Upgrade to Regular ($9.99)
                </button>
              </div>
            </div>

            <div className="plan-card">
              <div className="plan-header">
                <div className="plan-name">Regular Plan</div>
                <div className="plan-price">
                  <span className="original-price">$19.99/month</span>
                  <span className="beta-price">$9.99/month</span>
                </div>
              </div>
              <div className="plan-features">1,500 tokens per month • Journal access • Priority support</div>
              <div className="plan-actions">
                <button 
                  className="button secondary" 
                  onClick={() => {
                    if (confirm('Downgrade to Starter Plan ($2.99/month)? Your current plan will remain active until the end of your billing period.')) {
                      console.log('Downgrading to starter plan');
                      alert('Plan will be changed to Starter Plan ($2.99/month) at the end of your current billing period.');
                    }
                  }}
                >
                  Downgrade to Starter ($2.99)
                </button>
                <button 
                  className="button success" 
                  onClick={() => {
                    if (confirm('Upgrade to Premium Family Plan ($19.99/month)?')) {
                      console.log('Upgrading to premium plan');
                      alert('Payment system is in demo mode. Redirecting to success page for testing.');
                    }
                  }}
                >
                  Upgrade to Premium ($19.99)
                </button>
              </div>
            </div>

            <div className="plan-card">
              <div className="plan-header">
                <div className="plan-name">Premium Family Plan</div>
                <div className="plan-price">
                  <span className="original-price">$39.99/month</span>
                  <span className="beta-price">$19.99/month</span>
                </div>
              </div>
              <div className="plan-features">4,000 tokens shared • Up to 4 users • All features</div>
              <div className="plan-actions">
                <button 
                  className="button secondary" 
                  onClick={() => {
                    if (confirm('Downgrade to Regular Plan ($9.99/month)? Your current plan will remain active until the end of your billing period.')) {
                      console.log('Downgrading to regular plan');
                      alert('Plan will be changed to Regular Plan ($9.99/month) at the end of your current billing period.');
                    }
                  }}
                >
                  Downgrade to Regular ($9.99)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Token Cost Analytics */}
        <div className="section">
          <h2><span className="section-icon">💰</span>Token Cost Analytics</h2>
          <div className="setting-description">Track your token usage and costs</div>
          
          <div className="analytics-actions" style={{
            marginBottom: '25px', 
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap'
          }}>
            <button 
              className="button secondary" 
              onClick={() => {
                // Load token cost data
                const conversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
                const totalTokens = conversations.reduce((sum: number, conv: Conversation) => sum + (conv.duration || 0), 0);
                const estimatedCost = (totalTokens / 100) * 0.0299; // $2.99 per 100 tokens
                
                alert(`Token Cost Analysis:\nTotal tokens used: ${totalTokens}\nEstimated cost: $${estimatedCost.toFixed(2)}\nCost per conversation: ~$0.03`);
              }}
              style={{
                background: '#FFD93D', 
                color: '#333', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              Load Token Costs
            </button>
            <button 
              className="button secondary" 
              onClick={() => setShowAnalytics(!showAnalytics)}
              style={{
                background: '#FF9A8B', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              View Analytics
            </button>
            <button 
              className="button secondary" 
              onClick={() => {
                const conversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
                const exportData = {
                  exportDate: new Date().toISOString(),
                  totalConversations: conversations.length,
                  totalTokens: conversations.reduce((sum: number, conv: Conversation) => sum + (conv.duration || 0), 0),
                  conversations: conversations.map((conv: Conversation) => ({
                    id: conv.id,
                    timestamp: conv.timestamp,
                    tokens: conv.duration || 0,
                    title: conv.title
                  }))
                };
                
                const dataStr = JSON.stringify(exportData, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = `haven-token-analytics-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                
                URL.revokeObjectURL(url);
                alert('Token analytics exported successfully!');
              }}
              style={{
                background: '#FF6B8A', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              Export Data
            </button>
          </div>
        </div>

        {/* Analytics */}
        <div className="section">
          <h2><span className="section-icon">📊</span>Analytics</h2>
          <div className="setting-description">View detailed analytics about your Haven usage</div>
          
          <div className="analytics-actions" style={{
            marginBottom: '25px', 
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap'
          }}>
            <button 
              className="button secondary" 
              onClick={() => setShowAnalytics(!showAnalytics)}
              style={{
                background: '#FF9A8B', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              View Analytics
            </button>
            <button 
              className="button secondary" 
              onClick={() => {
                const conversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
                const emotionalPatterns = conversations.filter((conv: Conversation) => conv.tags && conv.tags.includes('emotional')).length;
                const timePatterns = conversations.filter((conv: Conversation) => {
                  const hour = new Date(conv.timestamp).getHours();
                  return hour >= 9 && hour <= 17; // Daytime conversations
                }).length;
                
                alert(`Analytics Summary:\nEmotional conversations: ${emotionalPatterns}\nDaytime conversations: ${timePatterns}\nTotal conversations: ${conversations.length}`);
              }}
              style={{
                background: '#FFD93D', 
                color: '#333', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              Emotional Patterns
            </button>
            <button 
              className="button secondary" 
              onClick={() => {
                const conversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
                const timeData = conversations.map((conv: Conversation) => ({
                  hour: new Date(conv.timestamp).getHours(),
                  day: new Date(conv.timestamp).getDay()
                }));
                
                alert(`Time Patterns:\nMost active hour: ${timeData.length > 0 ? Math.max(...timeData.map((t: any) => t.hour)) : 'N/A'}\nMost active day: ${timeData.length > 0 ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][Math.max(...timeData.map((t: any) => t.day))] : 'N/A'}`);
              }}
              style={{
                background: '#FF6B8A', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              Time Patterns
            </button>
            <button 
              className="button secondary" 
              onClick={() => {
                const conversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
                const exportData = {
                  exportDate: new Date().toISOString(),
                  totalConversations: conversations.length,
                  analytics: {
                    emotional: conversations.filter(conv => conv.tags && conv.tags.includes('emotional')).length,
                    daytime: conversations.filter(conv => {
                      const hour = new Date(conv.timestamp).getHours();
                      return hour >= 9 && hour <= 17;
                    }).length,
                    averageDuration: conversations.reduce((sum, conv) => sum + (conv.duration || 0), 0) / conversations.length || 0
                  }
                };
                
                const dataStr = JSON.stringify(exportData, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = `haven-analytics-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                
                URL.revokeObjectURL(url);
                alert('Analytics exported successfully!');
              }}
              style={{
                background: '#9C27B0', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              Export Stats
            </button>
            <button 
              className="button warning" 
              onClick={() => {
                if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
                  localStorage.removeItem('havenAnalytics');
                  localStorage.removeItem('havenConversations');
                  alert('All analytics data has been cleared.');
                  window.location.reload();
                }
              }}
              style={{
                background: '#ff6b6b', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              Clear Data
            </button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="section">
          <h2><span className="section-icon">🔒</span>Privacy Settings</h2>
          <div className="setting-description">Control your privacy and data settings</div>
          
          <div className="privacy-actions" style={{
            marginBottom: '25px', 
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap'
          }}>
            <button 
              className="button secondary" 
              onClick={() => {
                alert('Privacy settings help is available. Contact support for assistance.');
              }}
              style={{
                background: '#FF9A8B', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              Help & Support
            </button>
          </div>
        </div>

        {/* Conversation Settings */}
        <div className="section">
          <h2><span className="section-icon">💾</span>Conversation Settings</h2>
          <div className="setting-description">Control how your conversations are saved</div>
          
          <div className="conversation-settings" style={{marginBottom: '20px'}}>
            <div style={{marginBottom: '15px'}}>
              <strong style={{color: '#666', display: 'block', marginBottom: '8px'}}>Save Conversations:</strong>
              <div style={{marginBottom: '10px'}}>
                <input 
                  type="radio" 
                  id="save-manual" 
                  name="saveMode" 
                  value="manual"
                  checked={conversationSaveMode === "manual"}
                  onChange={(e) => setConversationSaveMode(e.target.value)}
                  style={{marginRight: '8px'}}
                />
                <label htmlFor="save-manual">Save Manually Only</label>
              </div>
              <div style={{marginBottom: '10px'}}>
                <input 
                  type="radio" 
                  id="save-auto" 
                  name="saveMode" 
                  value="auto"
                  checked={conversationSaveMode === "auto"}
                  onChange={(e) => setConversationSaveMode(e.target.value)}
                  style={{marginRight: '8px'}}
                />
                <label htmlFor="save-auto">Auto: All conversations are saved automatically</label>
              </div>
              <div style={{marginBottom: '10px'}}>
                <input 
                  type="radio" 
                  id="save-none" 
                  name="saveMode" 
                  value="none"
                  checked={conversationSaveMode === "none"}
                  onChange={(e) => setConversationSaveMode(e.target.value)}
                  style={{marginRight: '8px'}}
                />
                <label htmlFor="save-none">None: No conversations are saved (data stays private)</label>
              </div>
            </div>
            
            <button 
              className="save-button" 
              onClick={() => {
                localStorage.setItem('havenConversationSaveMode', conversationSaveMode);
                alert('Conversation save settings updated successfully!');
              }}
              style={{
                background: '#FF6B8A',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '15px',
                fontSize: '0.9em',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Save Settings
            </button>
          </div>
        </div>

        {/* Token Management */}
        <div className="section">
          <h2><span className="section-icon">🪙</span>Token Management</h2>
          <div className="setting-description">Manage your token usage and purchases</div>
          
          <div className="token-status" style={{
            marginBottom: '25px', 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '15px', 
            border: '2px solid #FFD93D'
          }}>
            <div style={{marginBottom: '15px'}}>
              <strong style={{color: '#666'}}>Tokens Remaining:</strong>
              <span style={{color: '#FFD93D', fontWeight: 'bold', marginLeft: '8px', fontSize: '1.1em'}}>
                {tokenInfo?.tokens || '12'} / {tokenInfo?.limit || '12'}
              </span>
            </div>
            <div style={{marginBottom: '15px', color: '#666'}}>
              You have {tokenInfo?.tokens || '12'} free trial tokens remaining. Upgrade to continue after trial.
            </div>
            <div style={{marginBottom: '15px'}}>
              <strong style={{color: '#666'}}>Monthly Reset:</strong>
              <span style={{color: '#333', marginLeft: '8px'}}>Trial period</span>
            </div>
          </div>
          
          <div className="token-actions" style={{
            marginBottom: '25px', 
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap'
          }}>
            <button 
              className="button warning" 
              onClick={() => {
                if (confirm('Purchase emergency top-up for $2.99? This will give you 100 tokens immediately.')) {
                  alert('Emergency top-up purchased! You now have 100 additional tokens.');
                  // In a real app, this would integrate with payment system
                }
              }}
              style={{
                background: '#ff6b6b', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              🚨 Emergency Top-up ($2.99)
            </button>
            <button 
              className="button secondary" 
              onClick={() => {
                const conversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
                const usageData = conversations.map(conv => ({
                  date: new Date(conv.timestamp).toLocaleDateString(),
                  tokens: conv.duration || 0
                }));
                
                const exportData = {
                  exportDate: new Date().toISOString(),
                  usageHistory: usageData,
                  totalTokens: conversations.reduce((sum, conv) => sum + (conv.duration || 0), 0)
                };
                
                const dataStr = JSON.stringify(exportData, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = `haven-usage-history-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                
                URL.revokeObjectURL(url);
                alert('Usage history exported successfully!');
              }}
              style={{
                background: '#FFD93D', 
                color: '#333', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              📊 Usage History
            </button>
          </div>
          
          <div className="additional-services" style={{
            marginBottom: '25px', 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '15px', 
            border: '2px solid #9C27B0'
          }}>
            <h3 style={{marginBottom: '15px', color: '#333'}}>Additional Services</h3>
            <div style={{marginBottom: '20px'}}>
              <div style={{marginBottom: '10px'}}>
                <strong style={{color: '#666'}}>Buy More Tokens</strong>
              </div>
              <div style={{marginBottom: '10px', color: '#666'}}>
                $2.99 for 100 tokens
              </div>
              <div style={{marginBottom: '15px', color: '#666', fontSize: '0.9em'}}>
                Need more tokens to continue your conversations? Get 100 additional tokens instantly.
              </div>
              <button 
                className="button success" 
                onClick={() => {
                  if (confirm('Purchase 100 tokens for $2.99?')) {
                    alert('Tokens purchased successfully! You now have 100 additional tokens.');
                    // In a real app, this would integrate with payment system
                  }
                }}
                style={{
                  background: '#9C27B0',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '15px',
                  fontSize: '0.9em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Buy More Tokens
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Privacy */}
        <div className="section">
          <h2><span className="section-icon">📋</span>Legal & Privacy</h2>
          <div className="setting-description">Access important legal documents and privacy information</div>
          
          <div className="legal-actions" style={{
            marginBottom: '25px', 
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap'
          }}>
            <a 
              href="/terms" 
              className="button secondary" 
              style={{
                background: '#FF9A8B', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Terms of Service
            </a>
            <a 
              href="/privacy" 
              className="button secondary" 
              style={{
                background: '#FF6B8A', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Account Actions */}
        <div className="section">
          <h2><span className="section-icon">⚙️</span>Account Actions</h2>
          <div className="setting-description">Manage your account settings and subscription</div>
          
          <div className="account-actions" style={{
            marginBottom: '25px', 
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap'
          }}>
            <button 
              className="button warning" 
              onClick={() => {
                if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
                  if (confirm('This action cannot be undone. Are you absolutely sure?')) {
                    alert('Subscription cancelled. You will have access until the end of your billing period.');
                    // In a real app, this would update subscription status
                  }
                }
              }}
              style={{
                background: '#ff6b6b', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease'
              }}
            >
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <div className="nav-items">
            <a href="/home" className="nav-item">
              <div className="nav-icon"></div>
              <div className="nav-label">Home</div>
            </a>
            <a href="/" className="nav-item">
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
            <a href="/account" className="nav-item active">
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

        {/* Conversation Modal */}
        {showConversationModal && selectedConversation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] flex flex-col shadow-2xl">
              <div className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white p-6 rounded-t-2xl flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  {selectedConversation.title || 'Conversation'}
                </h2>
                <button
                  onClick={() => setShowConversationModal(false)}
                  className="text-white text-3xl hover:text-gray-200 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="text-gray-600 text-sm mb-6 pb-4 border-b border-gray-200">
                  {new Date(selectedConversation.timestamp).toLocaleString()} • {selectedConversation.messages?.length || 0} messages
                </div>
                <div className="space-y-4">
                  {selectedConversation.messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-pink-500 text-white ml-8'
                          : 'bg-gray-100 text-gray-800 mr-8'
                      }`}
                    >
                      <div className="font-semibold mb-2">
                        {message.role === 'user' ? 'You' : 'Haven'}
                      </div>
                      <div className="leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 