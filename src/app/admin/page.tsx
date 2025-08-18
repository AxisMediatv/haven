"use client";

import React, { useState } from "react";
import Head from "next/head";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <Head>
        <link rel="icon" href="/icons/haven-logo.png" />
        <title>Haven Admin Dashboard</title>
      </Head>
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="logo-container">
            <img 
              src="/icons/haven-logo.png" 
              alt="Haven Logo" 
              className="logo"
            />
            <h1 className="app-title">Haven Admin</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-section">
            <h1 className="page-title">Admin Dashboard</h1>
            
            {/* Admin Tabs */}
            <div className="admin-tabs">
              <button 
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
              <button 
                className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
              <button 
                className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-section">
                  <h2>Platform Overview</h2>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-number">1,247</div>
                      <div className="stat-label">Total Users</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">89</div>
                      <div className="stat-label">Active Today</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">5,432</div>
                      <div className="stat-label">Total Conversations</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">$2,847</div>
                      <div className="stat-label">Monthly Revenue</div>
                    </div>
                  </div>
                  
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span className="activity-time">2 min ago</span>
                      <span className="activity-text">New user registration: john.doe@email.com</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-time">5 min ago</span>
                      <span className="activity-text">Subscription upgrade: Premium Plan</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-time">12 min ago</span>
                      <span className="activity-text">Support ticket created: #TK-2024-001</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="users-section">
                  <h2>User Management</h2>
                  <div className="user-filters">
                    <input 
                      type="text" 
                      placeholder="Search users..." 
                      className="search-input"
                    />
                    <select className="filter-select">
                      <option>All Plans</option>
                      <option>Free Trial</option>
                      <option>Starter</option>
                      <option>Regular</option>
                      <option>Premium</option>
                    </select>
                  </div>
                  
                  <div className="users-table">
                    <div className="table-header">
                      <div className="header-cell">User</div>
                      <div className="header-cell">Plan</div>
                      <div className="header-cell">Status</div>
                      <div className="header-cell">Actions</div>
                    </div>
                    <div className="table-row">
                      <div className="table-cell">john.doe@email.com</div>
                      <div className="table-cell">Premium</div>
                      <div className="table-cell status-active">Active</div>
                      <div className="table-cell">
                        <button className="action-button">View</button>
                      </div>
                    </div>
                    <div className="table-row">
                      <div className="table-cell">jane.smith@email.com</div>
                      <div className="table-cell">Starter</div>
                      <div className="table-cell status-active">Active</div>
                      <div className="table-cell">
                        <button className="action-button">View</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="analytics-section">
                  <h2>Analytics & Reports</h2>
                  <div className="analytics-grid">
                    <div className="chart-card">
                      <h3>User Growth</h3>
                      <div className="chart-placeholder">📈 Chart would go here</div>
                    </div>
                    <div className="chart-card">
                      <h3>Revenue Trends</h3>
                      <div className="chart-placeholder">💰 Chart would go here</div>
                    </div>
                    <div className="chart-card">
                      <h3>Feature Usage</h3>
                      <div className="chart-placeholder">📊 Chart would go here</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="settings-section">
                  <h2>Platform Settings</h2>
                  <div className="setting-group">
                    <h3>General</h3>
                    <div className="setting-item">
                      <label>Platform Name</label>
                      <input type="text" value="Haven" className="setting-input" />
                    </div>
                    <div className="setting-item">
                      <label>Maintenance Mode</label>
                      <input type="checkbox" className="setting-checkbox" />
                    </div>
                  </div>
                  
                  <div className="setting-group">
                    <h3>Pricing</h3>
                    <div className="setting-item">
                      <label>Starter Plan Price</label>
                      <input type="number" value="2.99" className="setting-input" />
                    </div>
                    <div className="setting-item">
                      <label>Regular Plan Price</label>
                      <input type="number" value="9.99" className="setting-input" />
                    </div>
                  </div>
                  
                  <button className="save-button">Save Settings</button>
                </div>
              )}
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

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .logo {
          width: 50px;
          height: 50px;
          border-radius: 12px;
        }

        .app-title {
          color: white;
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          margin-bottom: 100px;
        }

        .content-section {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .page-title {
          color: #333;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Admin Tabs */
        .admin-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 10px;
        }

        .tab-button {
          background: none;
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #666;
          transition: all 0.3s ease;
        }

        .tab-button:hover {
          background: #f5f5f5;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        /* Tab Content */
        .tab-content h2 {
          color: #333;
          font-size: 1.8rem;
          margin-bottom: 20px;
        }

        .tab-content h3 {
          color: #555;
          font-size: 1.3rem;
          margin: 25px 0 15px 0;
        }

        /* Overview Section */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          border: 2px solid #e9ecef;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }

        .activity-list {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 20px;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e9ecef;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-time {
          color: #999;
          font-size: 0.8rem;
        }

        .activity-text {
          color: #333;
        }

        /* Users Section */
        .user-filters {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .search-input, .filter-select {
          padding: 10px 15px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
        }

        .search-input {
          flex: 1;
        }

        .users-table {
          background: #f8f9fa;
          border-radius: 15px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          background: #667eea;
          color: white;
          padding: 15px;
          font-weight: 600;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 15px;
          border-bottom: 1px solid #e9ecef;
          background: white;
        }

        .table-row:hover {
          background: #f8f9fa;
        }

        .header-cell, .table-cell {
          padding: 5px;
        }

        .status-active {
          color: #28a745;
          font-weight: 600;
        }

        .action-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        /* Analytics Section */
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .chart-card {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 20px;
          border: 2px solid #e9ecef;
        }

        .chart-placeholder {
          height: 200px;
          background: #e9ecef;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #666;
          margin-top: 15px;
        }

        /* Settings Section */
        .setting-group {
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 15px;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding: 10px 0;
        }

        .setting-input {
          padding: 8px 12px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          width: 150px;
        }

        .setting-checkbox {
          transform: scale(1.2);
          accent-color: #667eea;
        }

        .save-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .save-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        /* Bottom Navigation Styles */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #e0e0e0;
          padding: 10px 0;
          z-index: 1000;
        }

        .nav-items {
          display: flex;
          justify-content: space-around;
          align-items: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #666;
          padding: 8px;
          border-radius: 12px;
          transition: all 0.3s ease;
          min-width: 60px;
        }

        .nav-item:hover {
          background: #f5f5f5;
          transform: translateY(-2px);
        }

        .nav-item.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .nav-icon {
          width: 24px;
          height: 24px;
          margin-bottom: 4px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        .nav-item:nth-child(1) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' fill='%23555'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(2) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' fill='%23555'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(3) .nav-icon {
          background-image: url("/icons/Screenshot 2025-08-17 142255.png");
        }

        .nav-item:nth-child(4) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' fill='%23555'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(5) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' fill='%23555'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(6) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%23555'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(7) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' fill='%23555'/%3E%3C/svg%3E");
        }

        .nav-label {
          font-size: 0.7rem;
          font-weight: 500;
          text-align: center;
        }

        /* Footer Banner */
        .footer-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 5.5px;
          border-radius: 8px;
          margin: 20px 0;
          text-align: center;
        }

        .footer-text {
          color: #666666;
          font-size: 11px;
          line-height: 1.4;
        }
      `}</style>
    </>
  );
}
