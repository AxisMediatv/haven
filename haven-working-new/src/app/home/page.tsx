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
          width: 20px;
          height: 20px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        .nav-item:nth-child(1) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(2) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(3) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(4) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(5) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(6) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(7) .nav-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
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
          font-size: 9.975px;
          line-height: 1.4;
        }

        @media (max-width: 600px) {
          .container {
            margin: 10px;
          }
          
          .home-header h1 {
            font-size: 2em;
          }
          
          .feature-grid {
            grid-template-columns: 1fr;
            padding: 0 20px 30px;
          }
        }
      `}</style>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-items">
          <a href="/home" className="nav-item active">
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
    </>
  );
}
