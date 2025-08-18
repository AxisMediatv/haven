"use client";

import React from 'react';
import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <>
      <div className="container">
        <div className="onboarding-header">
          <h1>🚀 Welcome to Haven</h1>
          <p>Let's set up your personalized emotional intelligence journey</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: '25%'}}></div>
          </div>
        </div>

        <div className="onboarding-content">
          <div className="step active">
            <div className="step-title">
              <h2>Step 1: Choose Your Focus</h2>
              <p>What would you like to work on first?</p>
            </div>
            
            <div className="options-grid">
              <div className="option-card">
                <div className="option-icon">🧠</div>
                <h3>Emotional Awareness</h3>
                <p>Learn to identify and understand your emotions</p>
                <button className="option-btn">Select This</button>
              </div>
              
              <div className="option-card">
                <div className="option-icon">💪</div>
                <h3>Stress Management</h3>
                <p>Develop healthy coping strategies</p>
                <button className="option-btn">Select This</button>
              </div>
              
              <div className="option-card">
                <div className="option-icon">🤝</div>
                <h3>Communication Skills</h3>
                <p>Improve how you express yourself</p>
                <button className="option-btn">Select This</button>
              </div>
              
              <div className="option-card">
                <div className="option-icon">🌱</div>
                <h3>Personal Growth</h3>
                <p>Build confidence and self-esteem</p>
                <button className="option-btn">Select This</button>
              </div>
            </div>
          </div>
        </div>

        <div className="onboarding-footer">
          <Link href="/home" className="skip-btn">Skip for now</Link>
          <button className="next-btn">Next Step →</button>
        </div>
      </div>

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
        }

        .container {
          max-width: 98%;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
          flex: 1;
          display: flex;
          flex-direction: column;
          margin: 20px;
        }

        .onboarding-header {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
          border-radius: 15px;
        }

        .onboarding-header h1 {
          font-size: 2.5em;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .onboarding-header p {
          opacity: 0.9;
          font-size: 1.2em;
          line-height: 1.5;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.2);
          height: 6px;
          border-radius: 3px;
          margin-top: 20px;
          overflow: hidden;
        }

        .progress-fill {
          background: white;
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .onboarding-content {
          padding: 40px 30px;
          flex: 1;
        }

        .step {
          display: none;
        }

        .step.active {
          display: block;
        }

        .step-title {
          text-align: center;
          margin-bottom: 30px;
        }

        .step-title h2 {
          color: #333;
          font-size: 2em;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .step-title p {
          color: #666;
          font-size: 1.1em;
          line-height: 1.5;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .option-card {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 25px;
          text-align: center;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .option-card:hover {
          border-color: #FF6B8A;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(255, 107, 138, 0.15);
        }

        .option-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .option-card h3 {
          color: #333;
          font-size: 1.3em;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .option-card p {
          color: #666;
          font-size: 1em;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .option-btn {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 138, 0.3);
        }

        .option-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 138, 0.4);
        }

        .onboarding-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px;
          border-top: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .skip-btn {
          color: #666;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .skip-btn:hover {
          color: #FF6B8A;
        }

        .next-btn {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 1.1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(255, 107, 138, 0.3);
        }

        .next-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 138, 0.4);
        }

        @media (max-width: 600px) {
          .container {
            margin: 10px;
          }
          
          .onboarding-header h1 {
            font-size: 2em;
          }
          
          .options-grid {
            grid-template-columns: 1fr;
          }
          
          .onboarding-footer {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
} 