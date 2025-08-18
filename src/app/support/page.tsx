"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // FAQ Toggle Functionality
  const toggleFAQ = (index: number) => {
    if (activeFAQ === index) {
      setActiveFAQ(null);
    } else {
      setActiveFAQ(index);
    }
  };

  // Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your backend
    console.log('Contact form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    
    // Reset form
    (e.currentTarget as HTMLFormElement).reset();
  };

  // Scroll to contact form
  const scrollToContact = () => {
    document.querySelector('.contact-form-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // Show resources (placeholder function)
  const showResources = () => {
    alert('Community resources will be available soon!');
  };

  return (
    <>
      <div className="container">
        {/* Header Section */}
        <div className="support-header" style={{background: 'linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%)', padding: '30px', borderRadius: '15px', marginBottom: '30px', textAlign: 'center'}}>
          <div style={{width: '120px', height: '120px', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
            <img src="/icons/haven-logo.png" alt="Haven Logo" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
            <div style={{background: '#FFD93D', color: '#333', padding: '6px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(255, 217, 61, 0.3)', position: 'absolute', top: '-10px', right: '-10px'}}>BETA</div>
          </div>
          <h1>Get Support</h1>
          <p>We're here to help you on your emotional intelligence journey. Reach out anytime for support, questions, or feedback.</p>
        </div>

        {/* Crisis Support Box */}
        <div className="crisis-support-box">
          <h2>Crisis Support</h2>
          <p>If you're experiencing an emotional emergency or having thoughts of self-harm, please reach out immediately:</p>
          <div className="crisis-links">
            <a href="tel:988" className="crisis-link">National Suicide Prevention Lifeline: 988</a>
            <a href="tel:911" className="crisis-link">Emergency Services: 911</a>
            <a href="sms:741741&body=HOME" className="crisis-link">Crisis Text Line: Text HOME to 741741</a>
          </div>
        </div>

        {/* Support Cards */}
        <div className="support-cards">
          <div className="support-card">
            <div className="card-icon"></div>
            <h3>Crisis Support Hotline</h3>
            <p>Direct connection to National Suicide Prevention Lifeline - professional crisis counselors available</p>
            <div className="availability">Available 24/7</div>
            <a href="tel:988" className="card-button orange">Call Now: 988</a>
          </div>

          <div className="support-card">
            <div className="card-icon"></div>
            <h3>General Support</h3>
            <p>Get help with your account, subscription, or technical issues via our contact form</p>
            <div className="availability">Response within 24 hours</div>
            <button className="card-button red" onClick={scrollToContact}>Contact Support</button>
          </div>

          <div className="support-card">
            <div className="card-icon"></div>
            <h3>Community Resources</h3>
            <p>Access emotional wellbeing resources and crisis intervention information</p>
            <div className="availability">Always available</div>
            <button className="card-button pink" onClick={showResources}>View Resources</button>
          </div>

          <div className="support-card">
            <div className="card-icon"></div>
            <h3>Affiliate Program</h3>
            <p>Join our affiliate program and earn while helping others improve their emotional intelligence</p>
            <div className="availability">Open for applications</div>
            <a href="affiliates.html" className="card-button orange">Learn More</a>
          </div>

          <div className="support-card">
            <div className="card-icon"></div>
            <h3>Terms of Service</h3>
            <p>Read our terms and conditions to understand your rights and responsibilities when using Haven</p>
            <div className="availability">Always available</div>
            <a href="terms.html" className="card-button pink">Read Terms</a>
          </div>

          <div className="support-card">
            <div className="card-icon"></div>
            <h3>Privacy Policy</h3>
            <p>Learn how we protect your personal information and handle your data with care</p>
            <div className="availability">Always available</div>
            <a href="privacy.html" className="card-button pink">Read Policy</a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form id="contactForm" onSubmit={handleContactSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject" required>
                  <option value="">Select a subject</option>
                  <option value="account">Account Issues</option>
                  <option value="subscription">Subscription Questions</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="privacy">Privacy Concerns</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required></textarea>
              </div>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(0)}
            >
              How do I start my free trial?
              <span className={`faq-toggle ${activeFAQ === 0 ? 'active' : ''}`}>▼</span>
            </button>
            <div className={`faq-answer ${activeFAQ === 0 ? 'active' : ''}`}>
              You can start your free trial by visiting the Plans page and selecting the trial option. You'll get access to all features for a limited time to experience Haven's emotional intelligence support.
            </div>
          </div>
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(1)}
            >
              Is my information private?
              <span className={`faq-toggle ${activeFAQ === 1 ? 'active' : ''}`}>▼</span>
            </button>
            <div className={`faq-answer ${activeFAQ === 1 ? 'active' : ''}`}>
              Yes, your privacy is our highest priority. All conversations are encrypted and we never share your personal information with third parties. You can read more about our privacy practices in the section below.
            </div>
          </div>
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(2)}
            >
              How does crisis support work?
              <span className={`faq-toggle ${activeFAQ === 2 ? 'active' : ''}`}>▼</span>
            </button>
            <div className={`faq-answer ${activeFAQ === 2 ? 'active' : ''}`}>
              Our crisis support system detects when you might be in emotional distress and provides immediate access to professional crisis counselors. We can connect you directly to the National Suicide Prevention Lifeline (988) or other emergency services.
            </div>
          </div>
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(3)}
            >
              Can I delete my conversations?
              <span className={`faq-toggle ${activeFAQ === 3 ? 'active' : ''}`}>▼</span>
            </button>
            <div className={`faq-answer ${activeFAQ === 3 ? 'active' : ''}`}>
              Yes, you have full control over your data. You can delete individual conversations or your entire account at any time through your account settings. Deleted data is permanently removed from our systems.
            </div>
          </div>
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(4)}
            >
              Is my conversation data secure?
              <span className={`faq-toggle ${activeFAQ === 4 ? 'active' : ''}`}>▼</span>
            </button>
            <div className={`faq-answer ${activeFAQ === 4 ? 'active' : ''}`}>
              We store conversations to provide personalized EI therapy experiences. All data is encrypted and stored securely with HIPAA compliance standards.
            </div>
          </div>
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(5)}
            >
              Can I change my subscription plan?
              <span className={`faq-toggle ${activeFAQ === 5 ? 'active' : ''}`}>▼</span>
            </button>
            <div className={`faq-answer ${activeFAQ === 5 ? 'active' : ''}`}>
              Absolutely! You can upgrade or downgrade your plan anytime from your account settings. Changes take effect immediately.
            </div>
          </div>
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(6)}
            >
              What happens during a crisis situation?
              <span className={`faq-toggle ${activeFAQ === 6 ? 'active' : ''}`}>▼</span>
            </button>
            <div className={`faq-answer ${activeFAQ === 6 ? 'active' : ''}`}>
              Our EI is trained to detect crisis situations and will immediately provide crisis support resources and emergency contact information.
            </div>
          </div>
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(7)}
            >
              How do I cancel my subscription?
              <span className={`faq-toggle ${activeFAQ === 7 ? 'active' : ''}`}>▼</span>
            </button>
            <div className={`faq-answer ${activeFAQ === 7 ? 'active' : ''}`}>
              You can cancel your subscription anytime from your account settings. You'll continue to have access until the end of your billing period.
            </div>
          </div>
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(8)}
            >
              Where is my gratitude journal data stored?
              <span className={`faq-toggle ${activeFAQ === 8 ? 'active' : ''}`}>▼</span>
            </button>
            <div className={`faq-answer ${activeFAQ === 8 ? 'active' : ''}`}>
              Your gratitude journal entries are stored in your browser's localStorage, which means your data is private and only accessible on your device! This ensures complete privacy - your journal entries never leave your computer and are not stored on our servers.
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="privacy-section">
          <h2>Privacy & Confidentiality</h2>
          <p>Your emotional privacy is our highest priority. Here's everything you need to know about how we protect your personal information and conversations.</p>
          
          <div className="privacy-details">
            <h3>Conversation Privacy</h3>
            <p>All your conversations with Haven are encrypted end-to-end and stored securely. We use industry-standard encryption to protect your data both in transit and at rest.</p>

            <h3>AI Training and Data Analysis</h3>
            <p>We use anonymized conversation data to improve our emotional intelligence algorithms and provide better support. All data used for training is stripped of personally identifiable information and aggregated to protect individual privacy.</p>

            <h3>Technical Security Details</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', margin: '20px 0'}}>
              <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '10px'}}>
                <h4 style={{color: '#FF6B8A', marginBottom: '10px'}}>Data Encryption</h4>
                <p style={{fontSize: '0.9em', color: '#666'}}>AES-256 encryption for data at rest, TLS 1.3 for data in transit, and end-to-end encryption for all conversations.</p>
              </div>
              <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '10px'}}>
                <h4 style={{color: '#FF6B8A', marginBottom: '10px'}}>Server Security</h4>
                <p style={{fontSize: '0.9em', color: '#666'}}>SOC 2 Type II certified data centers, 24/7 monitoring, regular penetration testing, and multi-factor authentication for all access.</p>
              </div>
              <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '10px'}}>
                <h4 style={{color: '#FF6B8A', marginBottom: '10px'}}>Privacy Controls</h4>
                <p style={{fontSize: '0.9em', color: '#666'}}>Granular user controls, data export capabilities, automatic data retention policies, and transparent audit logs.</p>
              </div>
            </div>

            <h3>Crisis Situation Protocols</h3>
            <p>In crisis situations, our system is designed to provide immediate support while maintaining your privacy. Our protocols include:</p>
            <ul>
              <li>Automatic crisis detection with immediate intervention</li>
              <li>Direct connection to professional crisis counselors</li>
              <li>Emergency contact information and resources</li>
              <li>Limited data sharing only when legally required for safety</li>
              <li>Post-crisis follow-up and support resources</li>
            </ul>

            <h3>Data Control Options</h3>
            <p>You have complete control over your data. Here are your options:</p>
            <div style={{background: '#f8f9fa', padding: '20px', borderRadius: '10px', margin: '15px 0'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <tr style={{borderBottom: '1px solid #e9ecef'}}>
                  <td style={{padding: '10px', fontWeight: 'bold', color: '#333'}}>Download Data</td>
                  <td style={{padding: '10px', color: '#666'}}>Export your complete conversation history in JSON format</td>
                </tr>
                <tr style={{borderBottom: '1px solid #e9ecef'}}>
                  <td style={{padding: '10px', fontWeight: 'bold', color: '#333'}}>Delete Conversations</td>
                  <td style={{padding: '10px', color: '#666'}}>Remove individual conversations permanently</td>
                </tr>
                <tr style={{borderBottom: '1px solid #e9ecef'}}>
                  <td style={{padding: '10px', fontWeight: 'bold', color: '#333'}}>Delete Account</td>
                  <td style={{padding: '10px', color: '#666'}}>Permanently remove all your data from our systems</td>
                </tr>
                <tr style={{borderBottom: '1px solid #e9ecef'}}>
                  <td style={{padding: '10px', fontWeight: 'bold', color: '#333'}}>Opt Out of Research</td>
                  <td style={{padding: '10px', color: '#666'}}>Exclude your data from anonymized research and training</td>
                </tr>
                <tr>
                  <td style={{padding: '10px', fontWeight: 'bold', color: '#333'}}>Data Retention</td>
                  <td style={{padding: '10px', color: '#666'}}>Automatic deletion after 7 years of inactivity</td>
                </tr>
              </table>
            </div>

            <h3>Legal Compliance</h3>
            <p>We comply with all applicable privacy laws and regulations:</p>
            <ul>
              <li><strong>GDPR (EU):</strong> Full compliance with data protection regulations, including right to be forgotten and data portability</li>
              <li><strong>CCPA (California):</strong> Complete transparency about data collection and user rights</li>
              <li><strong>HIPAA:</strong> Healthcare privacy standards for all conversation data and crisis interventions</li>
              <li><strong>COPPA:</strong> Special protections for users under 13 years old</li>
            </ul>

            <h3>Important HIPAA Note</h3>
            <div style={{background: '#fff5f5', borderLeft: '4px solid #FF6B8A', padding: '15px', margin: '20px 0', borderRadius: '5px'}}>
              <p style={{color: '#333', fontWeight: 'bold', marginBottom: '10px'}}>Healthcare Privacy Compliance</p>
              <p style={{color: '#666', fontSize: '0.9em'}}>While Haven is not a replacement for professional mental health care, we maintain HIPAA compliance standards for all conversation data and crisis interventions. This ensures your emotional health information receives the same level of protection as traditional healthcare services.</p>
        </div>
        
            <h3>Who Has Access</h3>
            <p>Only authorized Haven team members have access to your data, and only when necessary for providing support or improving our service. We never sell or share your personal information with third parties.</p>

            <h3>Contact Our Privacy Team</h3>
            <p>For privacy-related questions or concerns, contact our dedicated privacy team:</p>
            <ul>
              <li><strong>Email:</strong> privacy@therapei.com</li>
              <li><strong>Response Time:</strong> Within 24 hours for privacy questions</li>
              <li><strong>Support Availability:</strong> 7 days a week</li>
            </ul>
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
          <a href="/account" className="nav-item">
            <div className="nav-icon"></div>
            <div className="nav-label">Account</div>
          </a>
          <a href="/support" className="nav-item active">
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
          font-size: 14px;
          line-height: 1.4;
        }

        .container {
          max-width: 98%;
          margin: 0 auto;
          padding: 0 1px;
          padding-bottom: 120px;
        }

        .support-header {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
          padding: 20px 15px;
          text-align: center;
          border-radius: 15px;
          margin-bottom: 30px;
        }

        .support-header h1 {
          font-size: 2.2em;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .support-header p {
          font-size: 1.2em;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .crisis-support-box {
          background: #fff5f5;
          border: 3px solid #ff6b6b;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
          text-align: center;
        }

        .crisis-support-box h2 {
          color: #ff6b6b;
          font-size: 1.5em;
          margin-bottom: 15px;
          font-weight: bold;
        }

        .crisis-support-box p {
          color: #333;
          margin-bottom: 15px;
          font-size: 1.1em;
        }

        .crisis-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 400px;
          margin: 0 auto;
        }

        .crisis-link {
          background: #ff6b6b;
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .crisis-link:hover {
          background: #e55a7a;
          transform: translateY(-2px);
        }

        .support-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .support-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(255, 107, 138, 0.15);
          transition: transform 0.3s ease;
        }

        .support-card:hover {
          transform: translateY(-5px);
        }

        .card-icon {
          font-size: 2.5em;
          margin-bottom: 15px;
        }

        .support-card h3 {
          color: #333;
          font-size: 1.3em;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .support-card p {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .support-card .availability {
          color: #999;
          font-size: 0.9em;
          margin-bottom: 20px;
        }

        .card-button {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1em;
        }

        .card-button.orange {
          background: #FF8C42;
          color: white;
        }

        .card-button.orange:hover {
          background: #e67e3a;
        }

        .card-button.red {
          background: #FF6B8A;
          color: white;
        }

        .card-button.red:hover {
          background: #e55a7a;
        }

        .card-button.pink {
          background: #FF9A8B;
          color: white;
        }

        .card-button.pink:hover {
          background: #e88a7a;
        }

        .contact-form-section {
          background: white;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 8px 25px rgba(255, 107, 138, 0.15);
        }

        .contact-form-section h2 {
          color: #333;
          font-size: 1.8em;
          margin-bottom: 20px;
          text-align: center;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          color: #333;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px 15px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 16px;
          font-family: inherit;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #FF6B8A;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          background: #FF6B8A;
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 1.1em;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: block;
          margin: 0 auto;
        }

        .submit-button:hover {
          background: #e55a7a;
          transform: translateY(-2px);
        }

        .faq-section {
          background: white;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 8px 25px rgba(255, 107, 138, 0.15);
        }

        .faq-section h2 {
          color: #333;
          font-size: 1.8em;
          margin-bottom: 25px;
          text-align: center;
        }

        .faq-item {
          border-bottom: 1px solid #e9ecef;
          margin-bottom: 15px;
        }

        .faq-question {
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          padding: 15px 0;
          font-size: 1.1em;
          font-weight: bold;
          color: #333;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: color 0.3s ease;
        }

        .faq-question:hover {
          color: #FF6B8A;
        }

        .faq-answer {
          padding: 0 0 15px 0;
          color: #666;
          line-height: 1.6;
          display: none;
        }

        .faq-answer.active {
          display: block;
        }

        .faq-toggle {
          font-size: 1.2em;
          transition: transform 0.3s ease;
        }

        .faq-toggle.active {
          transform: rotate(180deg);
        }

        .privacy-section {
          background: white;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 8px 25px rgba(255, 107, 138, 0.15);
        }

        .privacy-section h2 {
          color: #333;
          font-size: 1.8em;
          margin-bottom: 15px;
          text-align: center;
        }

        .privacy-section p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          text-align: center;
        }

        .privacy-details {
          margin-top: 25px;
        }

        .privacy-details h3 {
          color: #333;
          font-size: 1.3em;
          margin-bottom: 10px;
          margin-top: 20px;
        }

        .privacy-details p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
          text-align: left;
        }

        .privacy-details ul {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
          padding-left: 20px;
        }

        .privacy-details li {
          margin-bottom: 8px;
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
          transition: all 0.3s ease;
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

        .nav-item:nth-child(4) .nav-icon {
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

        /* Adjust container for bottom nav */
        .container {
          margin-bottom: 80px;
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

        /* Responsive design */
        @media (max-width: 768px) {
          .container {
            margin: 10px;
          }

          .support-header {
            padding: 25px 15px;
          }

          .support-header h1 {
            font-size: 2em;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .support-cards {
            grid-template-columns: 1fr;
          }

          .crisis-links {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
} 