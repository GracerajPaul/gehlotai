import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">✦</span>
          <span className="brand-text">GehlotAI</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {!user ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/how-it-works" className="nav-link">How It Works</Link>
              <Link to="/gehlot-story" className="nav-link">Our Story</Link>
              <Link to="/terms" className="nav-link">Terms</Link>
              <Link to="/auth" className="nav-link nav-cta">Get Started</Link>
            </>
          ) : (
            <>
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/chat" className="nav-link">Chat</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/settings" className="nav-link">Settings</Link>
              <button onClick={() => setShowLogoutModal(true)} className="nav-link nav-logout">Logout</button>
              <div className="nav-user-badge">
                <div className="nav-avatar">{user.user_metadata?.name?.charAt(0) || user.email?.charAt(0) || '?'}</div>
              </div>
            </>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">⚠</div>
            <h3>Log out of GehlotAI?</h3>
            <p>You'll need to sign in again to access your chats and profile.</p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => { setShowLogoutModal(false); handleLogout(); }}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
