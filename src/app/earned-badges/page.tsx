"use client";

import React from 'react';
import Link from 'next/link';
import { ErrorBoundary } from '../../components/ErrorBoundary';

export default function EarnedBadgesPage() {
  return (
    <ErrorBoundary>
      <div className="container">
        <div className="header">
          <h1>🏆 Earned Badges</h1>
          <p>Celebrate your achievements and track your emotional intelligence progress</p>
        </div>

        <div className="stats-overview">
          <h3>Your Badge Collection</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Badges Earned</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Current Streak</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Total Progress</div>
            </div>
          </div>
          
          <div style={{marginTop: '25px', textAlign: 'center'}}>
            <Link href="/badges" className="view-collection-btn">
              🏆 View All Badges
            </Link>
          </div>
        </div>

        <div className="earned-badges-section">
          <h3 className="section-title">Your Earned Badges</h3>
          <div className="no-badges-message">
            <div className="no-badges-icon">🎯</div>
            <h4>No Badges Earned Yet</h4>
            <p>Start your emotional intelligence journey to earn your first badge!</p>
            <Link href="/" className="start-journey-btn">
              Start Your Journey
            </Link>
          </div>
        </div>

        <div className="progress-section">
          <h3 className="section-title">Progress Overview</h3>
          <div className="progress-cards">
            <div className="progress-card">
              <div className="progress-icon">🔥</div>
              <h4>Daily Streak</h4>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '0%'}}></div>
              </div>
              <p>0 days - Keep going!</p>
            </div>
            
            <div className="progress-card">
              <div className="progress-icon">💬</div>
              <h4>Conversations</h4>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '0%'}}></div>
              </div>
              <p>0 conversations completed</p>
            </div>
            
            <div className="progress-card">
              <div className="progress-icon">📝</div>
              <h4>Journal Entries</h4>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '0%'}}></div>
              </div>
              <p>0 entries written</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-items">
          <Link href="/home" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Home</div>
          </Link>
          <Link href="/" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Chat</div>
          </Link>
          <Link href="/journal" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Journal</div>
          </Link>
          <Link href="/badges" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Badges</div>
          </Link>
          <Link href="/plans" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Plans</div>
          </Link>
          <Link href="/account" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Account</div>
          </Link>
          <Link href="/support" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Support</div>
          </Link>
        </div>
        
        {/* Footer Banner */}
        <div className="footer-banner">
          <div className="footer-text">
            <div>Haven is an educational platform. Not medical advice.</div>
            <div>Crisis support: 988</div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f8f9fa;
          min-height: 100vh;
          color: #333;
          font-size: 14px;
          line-height: 1.4;
        }

        .container {
          max-width: 98%;
          margin: 0 auto;
          padding: 0 1px;
          padding-bottom: 120px;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          padding: 20px 15px;
          border-radius: 15px;
        }

        .header h1 {
          color: white;
          font-size: 2.2em;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .header p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .stats-overview {
          background: white;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(255, 107, 138, 0.15);
          border: 2px solid #FFD93D;
        }

        .stats-overview h3 {
          color: #333;
          font-size: 1.5em;
          margin-bottom: 20px;
        }

        .view-collection-btn {
          display: inline-block;
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(255, 107, 138, 0.3);
          border: 2px solid white;
        }

        .view-collection-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 107, 138, 0.4);
          background: linear-gradient(135deg, #E8447A 0%, #FF8C42 100%);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #FF6B8A;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
          margin-top: 5px;
        }

        .earned-badges-section {
          margin-bottom: 40px;
        }

        .section-title {
          color: #FF6B8A;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        .no-badges-message {
          background: white;
          border-radius: 15px;
          padding: 40px 20px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(255, 107, 138, 0.15);
        }

        .no-badges-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .no-badges-message h4 {
          color: #333;
          font-size: 1.3em;
          margin-bottom: 10px;
        }

        .no-badges-message p {
          color: #666;
          font-size: 1.1em;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        .start-journey-btn {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          padding: 12px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 138, 0.3);
        }

        .start-journey-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 138, 0.4);
        }

        .progress-section {
          margin-bottom: 40px;
        }

        .progress-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .progress-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(255, 107, 138, 0.15);
          transition: transform 0.3s ease;
        }

        .progress-card:hover {
          transform: translateY(-5px);
        }

        .progress-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .progress-card h4 {
          color: #333;
          font-size: 1.2em;
          margin-bottom: 15px;
        }

        .progress-bar {
          background: #f0f0f0;
          height: 8px;
          border-radius: 15px;
          overflow: hidden;
          margin-bottom: 15px;
        }

        .progress-fill {
          background: linear-gradient(90deg, #FF6B8A 0%, #FFD93D 100%);
          height: 100%;
          border-radius: 15px;
          transition: width 0.3s ease;
        }

        .progress-card p {
          color: #666;
          font-size: 0.9em;
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
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(6) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(7) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z'/%3E%3C/svg%3E");
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
          }
          
          .header h1 {
            font-size: 1.8em;
          }
          
          .progress-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      </div>
    </ErrorBoundary>
  );
}