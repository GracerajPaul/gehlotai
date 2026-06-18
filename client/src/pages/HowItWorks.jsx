import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { icon: '📝', title: 'Create Your Account', desc: 'Sign up in under 30 seconds. Tell us your grade, subjects, and school so the AI can tailor explanations to your level.', time: '30 seconds' },
  { icon: '💬', title: 'Ask Anything', desc: 'Type any question — from "Explain the Pythagorean theorem" to "Help me write a poem about rain." No filters, no limits, just ask.', time: 'Instant' },
  { icon: '🤖', title: 'AI Explains Step by Step', desc: 'GehlotAI doesn\'t just give answers. It walks you through each step, checks your understanding, and adapts to how you learn best.', time: '1-2 seconds' },
  { icon: '📈', title: 'Track Your Progress', desc: 'Review past conversations, revisit explanations, and watch your understanding grow. Your learning history is saved and searchable.', time: 'Ongoing' },
  { icon: '🔄', title: 'Ask Follow-Ups', desc: 'Didn\'t fully understand? Say "Explain it again" or "Give me another example." The AI remembers context and dives deeper.', time: 'Anytime' },
  { icon: '🌟', title: 'Master Any Subject', desc: 'From math to music, biology to coding — GehlotAI helps across every subject. It\'s like having a personal tutor for every class.', time: '24/7' },
];

const examples = [
  { subject: 'Mathematics', question: 'How do I solve quadratic equations?', answer: 'Step 1: Write the equation in standard form: ax² + bx + c = 0\nStep 2: Identify a, b, and c\nStep 3: Use the formula x = (-b ± √(b² - 4ac)) / 2a\nStep 4: Simplify to get your answer\n\nWant me to walk through a real example?' },
  { subject: 'Science', question: 'What causes a rainbow?', answer: 'When sunlight passes through raindrops, three things happen:\n\n1. Refraction — light bends as it enters the water droplet\n2. Dispersion — white light splits into 7 colors (ROYGBIV)\n3. Reflection — light bounces off the back of the droplet\n\nThat\'s why you see an arc of colors in the sky! 🌈' },
  { subject: 'History', question: 'Why did World War II start?', answer: 'The main causes were:\n\n• Treaty of Versailles (1919) — harsh penalties on Germany\n• Rise of fascism in Germany, Italy, and Japan\n• Failed appeasement policies\n• Germany\'s invasion of Poland on Sept 1, 1939\n\nThis triggered declarations of war from France and the UK.' },
  { subject: 'Coding', question: 'What\'s the difference between let and const in JavaScript?', answer: '• let — declares a variable that CAN be reassigned\n  let score = 10; score = 20; ✅ Works\n\n• const — declares a variable that CANNOT be reassigned\n  const max = 100; max = 200; ❌ Error\n\nBoth are block-scoped. Use const by default, let only when you need to reassign.' },
];

const faqs = [
  { q: 'Is GehlotAI really free?', a: 'Yes! The basic version is completely free. You can ask unlimited questions across all subjects with no hidden charges.' },
  { q: 'What grade levels do you support?', a: 'Grades 1 through 12, plus college-level explanations. The AI adjusts its language and depth based on your grade.' },
  { q: 'Can I use it for exam preparation?', a: 'Absolutely. Many students use GehlotAI for JEE, NEET, board exams, and school tests. Ask for practice questions, explanations, and study tips.' },
  { q: 'Is my data private?', a: 'Yes. All conversations are encrypted. We never share your personal information or chat history with third parties.' },
  { q: 'Which subjects are available?', a: 'Mathematics, Physics, Chemistry, Biology, History, Geography, English, Hindi, Computer Science, Economics, Art, and more being added regularly.' },
  { q: 'Does it work on mobile?', a: 'Yes, GehlotAI works perfectly on phones, tablets, and desktops. Study anytime, anywhere.' },
];

export default function HowItWorks() {
  return (
    <div className="page">
      <div className="grid-bg" />
      <div className="ambient-orb" style={{ width: '400px', height: '400px', background: 'rgba(109, 141, 255, 0.025)', top: '10%', right: '5%' }} />

      <Link to="/" className="page-back">← Back to Home</Link>
      <div className="page-header">
        <h1>How It Works</h1>
        <p>Your personal AI tutor — simpler than you think</p>
      </div>

      {/* OVERVIEW */}
      <div className="glass-card hiw-overview">
        <h2>Learn Any Subject, Step by Step</h2>
        <p>
          GehlotAI is an intelligent tutoring system designed for students. Unlike traditional search engines that dump 
          information, GehlotAI <strong>teaches you</strong> — breaking down complex topics into digestible steps, 
          checking your understanding, and adapting to your learning style.
        </p>
        <p>
          Whether you're in Grade 5 learning fractions or in college studying calculus, the AI adjusts its explanations 
          to match your level. Ask once. Understand forever.
        </p>
      </div>

      {/* STEPS */}
      <h2 className="hiw-section-title">Your Learning Journey</h2>
      <div className="hiw-steps">
        {steps.map((step, i) => (
          <div key={i} className="hiw-step-card">
            <div className="hiw-step-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="hiw-step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            <div className="hiw-step-time">{step.time}</div>
          </div>
        ))}
      </div>

      {/* EXAMPLES */}
      <h2 className="hiw-section-title">See It In Action</h2>
      <p className="hiw-section-subtitle">Real questions. Real answers. Real learning.</p>
      <div className="hiw-examples">
        {examples.map((ex, i) => (
          <div key={i} className="hiw-example-card">
            <div className="hiw-example-tag">{ex.subject}</div>
            <div className="hiw-example-qa">
              <div className="hiw-example-q">
                <span className="hiw-label-user">You:</span> {ex.question}
              </div>
              <div className="hiw-example-a">
                <span className="hiw-label-ai">GehlotAI:</span>
                <pre className="hiw-answer">{ex.answer}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="hiw-section-title">Frequently Asked Questions</h2>
      <div className="hiw-faqs">
        {faqs.map((faq, i) => (
          <div key={i} className="hiw-faq">
            <div className="hiw-faq-q">{faq.q}</div>
            <div className="hiw-faq-a">{faq.a}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="hiw-cta">
        <h2>Ready to Start Learning?</h2>
        <p>Join thousands of students who are learning faster with GehlotAI.</p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link to="/auth" className="btn btn-hero btn-hero-primary">Try AI Tutor →</Link>
          <Link to="/terms" className="btn btn-hero btn-hero-secondary">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  );
}
