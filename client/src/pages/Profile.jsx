import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../utils/supabase.js';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const meta = user?.user_metadata || {};
  const [form, setForm] = useState({ name: meta.name || '', grade: meta.grade || '', school: meta.school || '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const { data, error } = await supabase.auth.updateUser({ data: form });
      if (error) throw error;
      updateUser(data.user);
      setMessage('Profile updated successfully');
    } catch { setMessage('Failed to update'); }
    finally { setSaving(false); setTimeout(() => setMessage(''), 3000); }
  };

  return (
    <div className="page page-sm">
      <Link to="/chat" className="page-back">← Back to Chat</Link>
      <div className="page-header"><h1>Profile</h1><p>Manage your student information</p></div>
      <div className="glass-card">
        <div className="profile-header-info">
          <div className="profile-avatar-large">{meta.name?.charAt(0) || user?.email?.charAt(0) || '?'}</div>
          <div className="profile-header-text">
            <h2>{meta.name || 'Student'}</h2>
            <p>{user?.email}</p>
            <span className="profile-badge">{meta.grade || 'Set your grade'}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
          </div>
          <div className="profile-form-grid">
            <div className="input-group">
              <label>Grade</label>
              <select name="grade" value={form.grade} onChange={handleChange}>
                <option value="">Select</option>
                {Array.from({ length: 12 }, (_, i) => <option key={i+1} value={`Grade ${i+1}`}>Grade {i+1}</option>)}
                <option value="College">College</option>
              </select>
            </div>
            <div className="input-group">
              <label>School</label>
              <input name="school" value={form.school} onChange={handleChange} placeholder="Institution name" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {message && (
              <span className={`profile-msg ${message.includes('success') ? 'success' : 'error'}`}>
                {message}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
