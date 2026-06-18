import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Settings() {
  const { user } = useAuth();
  const meta = user?.user_metadata || {};
  const [notifications, setNotifications] = useState(() => localStorage.getItem('gehlotai_notifications') !== 'false');
  const [autoSave, setAutoSave] = useState(() => localStorage.getItem('gehlotai_autosave') !== 'false');

  const toggleNotifications = () => {
    const next = !notifications;
    setNotifications(next);
    localStorage.setItem('gehlotai_notifications', next);
  };

  const toggleAutoSave = () => {
    const next = !autoSave;
    setAutoSave(next);
    localStorage.setItem('gehlotai_autosave', next);
  };

  return (
    <div className="page page-sm">
      <Link to="/chat" className="page-back">← Back to Chat</Link>
      <div className="page-header"><h1>Settings</h1><p>Customize your experience</p></div>
      <div className="glass-card">
        <div className="settings-section">
          <h3>Account</h3>
          <div className="settings-row">
            <div>
              <div className="settings-row-label">{user?.email}</div>
              <div className="settings-row-desc">
                Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Preferences</h3>
          <div className="settings-row">
            <div>
              <div className="settings-row-label">Notifications</div>
              <div className="settings-row-desc">Study reminders and tips</div>
            </div>
            <button className={`toggle ${notifications ? 'active' : ''}`} onClick={toggleNotifications} />
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-row-label">Auto-save Chats</div>
              <div className="settings-row-desc">Save conversation history automatically</div>
            </div>
            <button className={`toggle ${autoSave ? 'active' : ''}`} onClick={toggleAutoSave} />
          </div>
        </div>

        <div className="settings-section">
          <h3>Learning Profile</h3>
          <div className="settings-row">
            <div>
              <div className="settings-row-label">Grade Level</div>
              <div className="settings-row-desc">{meta.grade || 'Not set'}</div>
            </div>
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-row-label">School</div>
              <div className="settings-row-desc">{meta.school || 'Not set'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
