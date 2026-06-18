import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Auth() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '', grade: '', school: '' });
  const [accepted, setAccepted] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'login') await login(form.email, form.password);
      else await signup(form);
      navigate('/home');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="grid-bg" />
      <div className="ambient-orb" style={{ width: '400px', height: '400px', background: 'rgba(109, 141, 255, 0.04)', top: '20%', left: '30%' }} />

      <div className="auth-container">
        <div className="auth-card glass-card">
          <Link to="/" className="auth-back">← Back to Home</Link>

          <div className="auth-header">
            <h1>{tab === 'login' ? 'Welcome Back' : 'Join GehlotAI'}</h1>
            <p>{tab === 'login' ? 'Sign in to continue learning' : 'Create your student account'}</p>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Sign In</button>
            <button className={`auth-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {tab === 'signup' && (
              <>
                <div className="input-group">
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                </div>
                <div className="profile-form-grid">
                  <div className="input-group">
                    <label>Grade</label>
                    <select name="grade" value={form.grade} onChange={handleChange} required>
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
              </>
            )}

            <div className="input-group">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@example.com" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder={tab === 'login' ? 'Enter your password' : 'Create a password (min 6 chars)'} required minLength={6} />
            </div>

            <label className="auth-checkbox">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
              <span>I agree to the <Link to="/terms" onClick={(e) => e.stopPropagation()}>Terms & Conditions</Link> and Privacy Policy</span>
            </label>

            <button type="submit" className="btn btn-primary" disabled={loading || (tab === 'signup' && !accepted)}>
              {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
