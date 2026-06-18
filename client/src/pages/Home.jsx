import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const actions = [
  { to: '/chat', icon: '✦', title: 'Chat with GehlotAI', desc: 'Get help with homework, clear doubts, and learn concepts' },
  { to: '/profile', icon: '◎', title: 'Your Profile', desc: 'Update your name, grade and school' },
  { to: '/settings', icon: '⚙', title: 'Settings', desc: 'Manage notifications and preferences' },
];

export default function Home() {
  const { user } = useAuth();
  const meta = user?.user_metadata || {};

  return (
    <div className="page">
      <div className="home-welcome">
        <div className="home-avatar">{meta.name?.charAt(0) || user?.email?.charAt(0) || '?'}</div>
        <div className="home-welcome-text">
          <h1>Welcome back, {meta.name || 'Student'}</h1>
          <p>{meta.grade ? `${meta.grade} · ` : ''}{meta.school || 'Start learning with AI'}</p>
        </div>
      </div>

      <div className="home-grid">
        {actions.map(a => (
          <Link key={a.to} to={a.to} className="home-card glass-card">
            <div className="home-card-icon">{a.icon}</div>
            <div className="home-card-body">
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
            <span className="home-card-arrow">→</span>
          </Link>
        ))}
      </div>

      <div className="home-section">
        <h2 className="home-section-title">Your Learning Profile</h2>
        <div className="glass-card home-profile-card">
          <div className="home-info-row"><span>Email</span><span>{user?.email}</span></div>
          {meta.grade && <div className="home-info-row"><span>Grade</span><span>{meta.grade}</span></div>}
          {meta.school && <div className="home-info-row"><span>School</span><span>{meta.school}</span></div>}
          {user?.created_at &&
            <div className="home-info-row"><span>Member since</span><span>{new Date(user.created_at).toLocaleDateString()}</span></div>
          }
        </div>
      </div>
    </div>
  );
}
