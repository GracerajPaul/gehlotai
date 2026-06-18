import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const chatSteps = [
  { role: 'user', text: 'Explain photosynthesis like I\'m 10' },
  { role: 'ai', text: 'Plants make their own food using sunlight! 🌱\n\nThey soak up sunlight through their leaves, drink water through their roots, and breathe in CO₂ from the air. Then — like magic — they turn all that into sugar (their food) and release oxygen for us to breathe.\n\nWant me to break it down step by step?' },
  { role: 'user', text: 'Yes, break it down!' },
  { role: 'ai', text: 'Step 1: Sunlight hits the leaf\nStep 2: Chlorophyll (the green stuff) captures that energy\nStep 3: Water + CO₂ get converted into glucose + O₂\n\nFormula:\n6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\n\nThink of it as plants being solar-powered chefs! 🧑‍🍳☀️' },
];

function ChatPreview() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visible >= chatSteps.length) { setDone(true); return; }
    const step = chatSteps[visible];
    if (step.role === 'ai') {
      setTyping(true);
      const timer = setTimeout(() => { setTyping(false); setVisible(v => v + 1); }, 1800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setVisible(v => v + 1), 1200);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  /* auto-scroll removed */

  return (
    <div className="chat-preview">
      <div className="chat-preview-header">
        <span className="chat-preview-dot" style={{ background: '#ef4444' }} />
        <span className="chat-preview-dot" style={{ background: '#fbbf24' }} />
        <span className="chat-preview-dot" style={{ background: '#22c55e' }} />
        <span className="chat-preview-label">GehlotAI — Live Demo</span>
      </div>
      <div className="chat-preview-body">
        {chatSteps.slice(0, visible).map((msg, i) => (
          <div key={i} className={`chat-preview-msg ${msg.role}`}>
            <div className="chat-preview-bubble">{msg.text}</div>
          </div>
        ))}
        {typing && (
          <div className="chat-preview-msg ai">
            <div className="chat-preview-typing"><span /><span /><span /></div>
          </div>
        )}
        {done && (
          <div className="chat-preview-cta">
            <Link to="/auth" className="chat-preview-start">Ask Your First Question →</Link>
          </div>
        )}
      </div>
    </div>
  );
}

const features = [
  { icon: '✦', title: 'Smart Tutor', num: '01', desc: 'AI adapts to your grade level and explains concepts the way you learn best.' },
  { icon: '◆', title: 'Every Subject', num: '02', desc: 'Math, science, history, languages, coding — get help with any topic instantly.' },
  { icon: '▸', title: 'Step by Step', num: '03', desc: 'No just answers — full explanations broken down so you actually understand.' },
  { icon: '◈', title: 'Always Available', num: '04', desc: 'Study anytime, anywhere. No scheduling, no waiting. 24/7 access.' },
];

const reviews = [
  { name: 'Anu Priya', role: 'Student · India', text: 'GehlotAI explains everything so clearly! I used to struggle with science, but now I actually enjoy studying. Best learning tool ever!' },
  { name: 'Navya', role: 'Student · India', text: 'The step-by-step explanations helped me understand math problems that my teacher couldn\'t explain. I feel so much more confident now.' },
  { name: 'Bandi', role: 'Student · India', text: 'I love how it adapts to my level. When I don\'t understand something, it breaks it down until I get it. Really helpful for exam prep!' },
  { name: 'Mental naa kuduku', role: 'Student · India', text: 'This AI tutor is amazing. I can ask any question and get an instant answer with full explanation. It\'s like having a friend who knows everything!' },
];

export default function Landing() {
  return (
    <div className="landing">
      <div className="grid-bg" />
      <div className="ambient-orb" style={{ width: '500px', height: '500px', background: 'rgba(99, 102, 241, 0.03)', top: '-5%', left: '20%' }} />
      <div className="ambient-orb" style={{ width: '350px', height: '350px', background: 'rgba(56, 189, 248, 0.025)', bottom: '10%', right: '10%' }} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-badge">✦ AI-POWERED TUTOR FOR STUDENTS</div>

            <h1 className="hero-title">
              <span className="line">Your Personal</span>
              <span className="line gradient">AI Tutor</span>
            </h1>

            <p className="hero-subtitle">
              GehlotAI helps you understand any subject — from photosynthesis to calculus — 
              with clear, step-by-step explanations at your level. <strong>Ask anything. Learn everything.</strong>
            </p>

            <div className="hero-actions">
              <Link to="/auth" className="btn btn-hero btn-hero-primary">Try AI Tutor →</Link>
              <Link to="/how-it-works" className="btn btn-hero btn-hero-secondary">See How It Works</Link>
            </div>

            <div className="hero-social">
              <div className="hero-social-item">
                <span className="hero-social-value">10K+</span>
                <span className="hero-social-label">Students</span>
              </div>
              <div className="hero-social-item">
                <span className="hero-social-value">4.9★</span>
                <span className="hero-social-label">Rating</span>
              </div>
              <div className="hero-social-item">
                <span className="hero-social-value">50K+</span>
                <span className="hero-social-label">Questions</span>
              </div>
              <div className="hero-social-item">
                <span className="hero-social-value">98%</span>
                <span className="hero-social-label">Satisfied</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <ChatPreview />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="marquee-content">
              {['Learn Better', 'Every Subject', 'Step by Step', '24/7 Access', 'AI-Powered', 'Study Smarter', 'Learn Better', 'Every Subject'].map((item, i) => (
                <span key={i} className="marquee-item">{item} ●</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="features">
        <div className="section-header">
          <div className="label">✦ HOW IT WORKS</div>
          <h2>Learn Faster, Understand Deeper</h2>
          <p>Built for students who want more than just answers — real understanding.</p>
        </div>

        <div className="features-grid">
          <div className="feature-row">
            {features.slice(0, 2).map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-number">{f.num}</div>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="feature-row">
            {features.slice(2, 4).map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-number">{f.num}</div>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT DEMO */}
      <section className="demo-section">
        <div className="section-header">
          <div className="label">▸ SEE IT IN ACTION</div>
          <h2>Real Homework Help</h2>
          <p>Watch how GehlotAI breaks down a Grade 10 physics problem step by step.</p>
        </div>
        <div className="demo-grid">
          <div className="demo-chat">
            <div className="demo-chat-header">
              <span className="demo-chat-user">You asked:</span>
              <div className="demo-chat-question">"A ball is thrown upwards at 20 m/s. How high will it go? (g = 10 m/s²)"</div>
            </div>
            <div className="demo-chat-body">
              <div className="demo-msg ai">
                <div className="demo-msg-label">GehlotAI</div>
                <div className="demo-msg-content">
                  Let's solve this step by step! 🚀
                  <br /><br />
                  <strong>Step 1: Identify what we know</strong>
                  <br />
                  Initial velocity (u) = 20 m/s (upward)
                  <br />
                  Final velocity (v) = 0 m/s (at the highest point)
                  <br />
                  Acceleration (a) = -10 m/s² (gravity pulls down)
                  <br /><br />
                  <strong>Step 2: Choose the right formula</strong>
                  <br />
                  v² = u² + 2as
                  <br /><br />
                  <strong>Step 3: Plug in values</strong>
                  <br />
                  0 = (20)² + 2(-10)s
                  <br />
                  0 = 400 - 20s
                  <br />
                  20s = 400
                  <br />
                  s = 20 meters
                  <br /><br />
                  <strong>Answer: The ball reaches 20 meters high!</strong>
                  <br /><br />
                  Want me to also calculate how long it takes to reach that height? 😊
                </div>
              </div>
              <div className="demo-msg user">
                <div className="demo-msg-label" style={{ color: 'var(--accent-1)' }}>You</div>
                <div className="demo-msg-content">Yes, calculate time too</div>
              </div>
            </div>
          </div>
          <div className="demo-features">
            <div className="demo-feature">
              <div className="demo-feature-icon">📐</div>
              <h3>Step-by-Step Solutions</h3>
              <p>Not just answers — full worked solutions with formulas, steps, and explanations.</p>
            </div>
            <div className="demo-feature">
              <div className="demo-feature-icon">🎯</div>
              <h3>Adapts to Your Grade</h3>
              <p>Grade 5 student? College prep? The AI adjusts explanations to your level.</p>
            </div>
            <div className="demo-feature">
              <div className="demo-feature-icon">💡</div>
              <h3>Ask Follow-Ups</h3>
              <p>Didn't understand? Say "Explain again" or "Give another example." It remembers context.</p>
            </div>
            <div className="demo-feature">
              <div className="demo-feature-icon">📚</div>
              <h3>All Subjects</h3>
              <p>Math, science, history, coding, languages — get help with anything instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="trust-section">
        <div className="section-header">
          <div className="label">◆ WHAT STUDENTS SAY</div>
          <h2>Trusted by Learners</h2>
          <p>Real feedback from students using GehlotAI daily.</p>
        </div>

        <div className="reviews-scroll">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-author">
                <div className="review-avatar">{r.name.charAt(0)}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="trust-badges">
          <div className="trust-badge-item"><span className="badge-icon">🔒</span><span className="badge-label">AES-256 Encrypted</span></div>
          <div className="trust-badge-item"><span className="badge-icon">✅</span><span className="badge-label">COPPA Certified</span></div>
          <div className="trust-badge-item"><span className="badge-icon">📋</span><span className="badge-label">NCERT & CBSE Aligned</span></div>
          <div className="trust-badge-item"><span className="badge-icon">👩‍🏫</span><span className="badge-label">Teacher Recommended</span></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">✦ GehlotAI</div>
          <div className="landing-footer-links">
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/gehlot-story">Our Story</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/auth">Get Started</Link>
          </div>
          <div className="landing-footer-copy">© 2026 GehlotAI — Empowering students through AI</div>
        </div>
      </footer>
    </div>
  );
}
