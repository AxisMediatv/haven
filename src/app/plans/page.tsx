"use client";

import React, { useState, useEffect } from 'react';

export default function PlansPage() {
  const [currentPromoCode, setCurrentPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const applyPromoCode = () => {
    const promoInput = document.getElementById('promoCode') as HTMLInputElement;
    const code = promoInput.value.trim().toUpperCase();
    
    if (code === 'BETA30') {
      setPromoMessage('✓ BETA30 applied! 30-day free trial');
      setCurrentPromoCode(code);
      // Highlight the Regular plan as recommended
      const popularPlan = document.querySelector('.plan-card.popular');
      if (popularPlan) {
        (popularPlan as HTMLElement).style.border = '3px solid #4CAF50';
      }
    } else if (code) {
      setPromoMessage('✗ Invalid promo code');
      setCurrentPromoCode('');
    } else {
      setPromoMessage('');
      setCurrentPromoCode('');
    }
  };

  const purchasePlan = async (planType: string) => {
    // Show loading state
    const button = event?.target as HTMLButtonElement;
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    try {
      console.log('Purchasing plan:', planType);
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          planType: planType,
          promoCode: currentPromoCode 
        })
      });

      const data = await response.json();
      
      if (data.error) {
        console.error('Checkout error:', data.error);
        alert('Unable to start checkout. Please try again.');
        button.textContent = originalText;
        button.disabled = false;
        return;
      }

      if (data.mock) {
        alert('Payment system is in demo mode. Redirecting to success page for testing.');
        button.textContent = originalText;
        button.disabled = false;
        // Redirect to success page for demo
        window.location.href = data.url;
        return;
      }

      // Redirect to Stripe Checkout
      console.log('Redirecting to Stripe checkout:', data.url);
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Something went wrong. Please try again.');
      
      // Restore button state
      button.textContent = originalText;
      button.disabled = false;
    }
  };

  // Handle success/cancel URLs
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    const sessionId = urlParams.get('session_id');

    if (success && sessionId) {
      alert('Payment successful! Your plan has been activated.');
      // You can add additional success handling here
    } else if (canceled) {
      alert('Payment was canceled. You can try again anytime.');
    }
  }, []);

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #FFF4E6;
          min-height: 100vh;
          padding: 10px;
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
          color: white;
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          padding: 20px 15px;
          border-radius: 15px;
        }

        .header h1 {
          font-size: 2.2em;
          margin-bottom: 10px;
          font-weight: 700;
          color: #FFFFFF;
        }

        .header p {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 10px;
        }

        .beta-banner {
          background: #FFD93D;
          color: #333;
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          font-weight: bold;
          margin-bottom: 60px;
          font-size: 1.4em;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 40px;
        }

        .plan-card {
          background: white;
          border-radius: 15px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: relative;
          transition: transform 0.3s ease;
        }

        .plan-card:hover {
          transform: translateY(-5px);
        }

        .plan-card.popular {
          border: 3px solid #FF6B8A;
          transform: scale(1.05);
        }

        .plan-card.coming-soon {
          opacity: 0.6;
          pointer-events: none;
        }

        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: #FF6B8A;
          color: white;
          padding: 8px 20px;
          border-radius: 15px;
          font-size: 14px;
          font-weight: bold;
        }

        .beta-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #FFD93D;
          color: #000;
          padding: 5px 12px;
          border-radius: 15px;
          font-weight: 600;
          text-shadow: 0 0 6px rgba(0,0,0,0.3);
          box-shadow: 0 0 12px rgba(255, 217, 61, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 12px;
        }

        .plan-name {
          font-size: 28px;
          font-weight: bold;
          color: #FF8C42;
          margin-bottom: 10px;
        }

        .plan-description {
          color: #636e72;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .price-section {
          margin-bottom: 30px;
        }

        .current-price {
          font-size: 48px;
          font-weight: bold;
          color: #2d3436;
          line-height: 1;
        }

        .original-price {
          text-decoration: line-through;
          color: #636e72;
          font-size: 18px;
          margin-left: 10px;
        }

        .per-month {
          color: #636e72;
          font-size: 16px;
        }

        .savings {
          background: #FFD93D;
          color: #000;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 14px;
          font-weight: bold;
          margin-top: 10px;
          display: inline-block;
        }

        .features-list {
          text-align: left;
          margin-bottom: 30px;
        }

        .features-list li {
          list-style: none;
          padding: 8px 0;
          color: #2d3436;
          position: relative;
          padding-left: 25px;
        }

        .features-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #FF6B8A;
          font-weight: bold;
        }

        .features-list li.unavailable {
          color: #636e72;
        }

        .features-list li.unavailable:before {
          content: "✗";
          color: #e17055;
        }

        .plan-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .plan-button.primary {
          background: #FF6B8A;
          color: white;
        }

        .plan-button.secondary {
          background: #FF6B8A;
          color: white;
          border: 2px solid #FF6B8A;
        }

        .plan-button.disabled {
          background: #ddd;
          color: #636e72;
          cursor: not-allowed;
        }

        .plan-button:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .token-topup {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          margin-top: 40px;
        }

        .token-topup h3 {
          color: #FF8C42;
          margin-bottom: 15px;
          font-size: 24px;
        }

        .token-topup p {
          color: #636e72;
          margin-bottom: 20px;
        }

        .value-comparison {
          margin-top: 40px;
          margin-bottom: 40px;
          text-align: center;
          color: #2d3436;
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .value-comparison h3 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #FF8C42;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .comparison-item {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          border: 2px solid #e9ecef;
        }

        .comparison-item strong {
          display: block;
          font-size: 18px;
          margin-bottom: 10px;
          color: #FF8C42;
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
            padding: 10px 0;
        }

        .nav-items {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 10px;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
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
          padding: 10px;
          text-align: center;
          font-size: 12px;
          color: #636e72;
          border-top: 1px solid #e9ecef;
        }

        .footer-text {
          color: #666666;
          font-size: 11px;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .container {
            padding: 20px 10px;
          }
          
          .header h1 {
            font-size: 32px;
          }
          
          .plans-grid {
            grid-template-columns: 1fr;
          }
          
          .plan-card {
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="container">
        <div className="header" style={{background: 'linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%)', padding: '30px', borderRadius: '15px', marginBottom: '30px', textAlign: 'center'}}>
          <div className="beta-logo" style={{width: '120px', height: '120px', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
            <img src="/icons/haven-logo.png" alt="Haven Logo" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
            <div style={{background: '#FFD93D', color: '#333', padding: '6px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(255, 217, 61, 0.3)', position: 'absolute', top: '-10px', right: '-10px'}}>BETA</div>
          </div>
          <h1>Find Your Perfect Haven</h1>
          <p>Emotional intelligence support designed around your life and needs</p>
        </div>

        <div className="beta-banner">
          BETA LAUNCH SPECIAL - 50% OFF ALL PLANS
          <br /><span style={{color: '#333', fontSize: '.8em', marginBottom: '10px'}}>Limited time: Help us perfect the future of EI-powered emotional intelligence</span>
        </div>

        <div className="plans-grid">
          {/* Starter Plan */}
          <div className="plan-card">
            <div className="beta-badge">BETA</div>
            <div className="plan-name">Starter</div>
            <div className="plan-description">Perfect for getting started with Haven</div>
            <div className="price-section">
              <div className="current-price">$2.99 <span className="original-price">$5.99</span></div>
              <div className="per-month">per month</div>
              <div className="savings">50% OFF BETA</div>
            </div>
            <ul className="features-list">
              <li>300 tokens for meaningful conversations</li>
              <li>Personalized EI companion with chosen persona</li>
              <li>Crisis support protocols with 988 integration</li>
              <li>Badge achievement system</li>
              <li>Conversation history</li>
            </ul>
            <button className="plan-button secondary" onClick={() => purchasePlan('starter')}>Choose Starter</button>
          </div>

          {/* Regular Plan */}
          <div className="plan-card popular">
            <div className="popular-badge">MOST POPULAR</div>
            <div className="beta-badge">BETA</div>
            <div className="plan-name">Regular</div>
            <div className="plan-description">Our most popular plan with advanced features</div>
            <div className="price-section">
              <div className="current-price">$9.99 <span className="original-price">$19.99</span></div>
              <div className="per-month">per month</div>
              <div className="savings">50% OFF BETA</div>
            </div>
            <ul className="features-list">
              <li>1,500 tokens for extensive conversations</li>
              <li>Personalized EI companion with chosen persona</li>
              <li>Crisis support protocols with 988 integration</li>
              <li>Badge achievement system</li>
              <li>Conversation history (can export)</li>
              <li>Premium Journal access with guided prompts</li>
              <li>Advanced personalization options</li>
              <li>Early access to new features</li>
            </ul>
            <button className="plan-button primary" onClick={() => purchasePlan('regular')}>Choose Regular</button>
          </div>

          {/* Premium Family Plan */}
          <div className="plan-card coming-soon">
            <div className="beta-badge">BETA</div>
            <div className="plan-name">Premium Family</div>
            <div className="plan-description">Best value for families (up to 4 users)</div>
            <div className="price-section">
              <div className="current-price">$39.99</div>
              <div className="per-month">per month</div>
            </div>
            <ul className="features-list">
              <li>All Regular plan features for each user</li>
              <li>4,000 tokens shared across family</li>
              <li>Up to 4 user accounts</li>
              <li>Premium Journal access for all users</li>
              <li>Family admin dashboard</li>
              <li>Bulk token management</li>
            </ul>
            <button className="plan-button disabled">Coming Soon</button>
          </div>
        </div>

        {/* Token Top-up */}
        <div className="token-topup">
          <h3>Need More Tokens?</h3>
          <p>Get 100 additional tokens to continue your conversations with Haven</p>
          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#2d3436', marginBottom: '15px'}}>
            $2.99 for 100 tokens
          </div>
          <button className="plan-button primary" style={{maxWidth: '300px'}} onClick={() => purchasePlan('emergency')}>Buy More Tokens</button>
        </div>

        {/* Value Comparison */}
        <div className="value-comparison">
          <h3>Value Comparison</h3>
          <div className="comparison-grid">
            <div className="comparison-item">
              <strong>Starter Plan</strong>
              $0.00997 per token
            </div>
            <div className="comparison-item">
              <strong>Regular Plan</strong>
              $0.00666 per token<br />
              <small>33% cheaper than Starter</small>
            </div>
            <div className="comparison-item">
              <strong>Premium Plan</strong>
              $0.005 per token<br />
              <small>50% cheaper than Starter</small>
            </div>
            <div className="comparison-item">
              <strong>Token Top-up</strong>
              $0.0299 per token<br />
              <small>Premium pricing</small>
            </div>
          </div>
        </div>

        {/* Beta Testing and Promo Code Section */}
        <div style={{display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap'}}>
          {/* Beta Testing Section */}
          <div style={{background: 'white', borderRadius: '12px', padding: '15px', maxWidth: '188px', boxShadow: '0 8px 22px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#FF8C42', marginBottom: '11px', fontSize: '14px'}}>Beta Testing Plan</h3>
            <div style={{fontSize: '18px', fontWeight: 'bold', color: '#2d3436', marginBottom: '4px'}}>$1.99</div>
            <div style={{color: '#636e72', marginBottom: '11px', fontSize: '11px'}}>one time</div>
            <div style={{textAlign: 'left', marginBottom: '15px', fontSize: '11px'}}>
              <div style={{color: '#2d3436', marginBottom: '4px'}}>✓ All Regular plan features</div>
              <div style={{color: '#2d3436'}}>✓ For testing purposes only</div>
            </div>
            <button className="plan-button secondary" style={{maxWidth: '90px', fontSize: '11px', padding: '8px'}} onClick={() => purchasePlan('beta')}>Testing Only</button>
          </div>
          
          {/* Promo Code Section */}
          <div style={{background: 'white', borderRadius: '12px', padding: '15px', maxWidth: '188px', boxShadow: '0 8px 22px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#FF8C42', marginBottom: '11px', fontSize: '14px'}}>Promo Code</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center'}}>
              <input 
                type="text" 
                id="promoCode" 
                placeholder="Enter code" 
                style={{padding: '6px', border: '2px solid #FF6B8A', borderRadius: '12px', fontSize: '11px', outline: 'none', width: '100%', textAlign: 'center'}}
              />
              <button 
                onClick={applyPromoCode}
                style={{background: '#E8447A', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '10px'}}
              >
                Apply
              </button>
            </div>
            <div id="promoMessage" style={{marginTop: '8px', fontSize: '10px', textAlign: 'center'}}>{promoMessage}</div>
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
            <a href="/plans" className="nav-item active">
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
      </div>
    </>
  );
} 