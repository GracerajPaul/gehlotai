import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="page">
      <div className="grid-bg" />
      <Link to="/" className="page-back">← Back to Home</Link>
      <div className="page-header"><h1>Terms of Service</h1><p>Please read these terms carefully before using GehlotAI</p></div>
      <div className="glass-card terms-content">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using GehlotAI ("the Service"), you agree to be legally bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use the Service. Continued use of the Service constitutes acceptance of any future modifications to these terms.</p>

        <h2>2. Description of Service</h2>
        <p>GehlotAI is an educational artificial intelligence chatbot designed to provide learning assistance to students. The Service generates AI-powered responses to academic questions across various subjects including mathematics, science, history, languages, and coding.</p>
        <p>AI-generated responses are provided as a learning aid only and should not be used as a sole source of information. Users are encouraged to verify important information from authoritative sources, including textbooks, teachers, and official educational materials.</p>

        <h2>3. User Accounts</h2>
        <p>When creating an account, you agree to provide accurate, current, and complete information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
        <p>You must notify us immediately of any unauthorized use of your account. You must be at least 13 years of age to create an account. Users between 13 and 18 years of age must have parental consent.</p>
        <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in prohibited activities.</p>

        <h2>4. Acceptable Use</h2>
        <p>You agree to use the Service only for lawful educational purposes. Prohibited activities include:</p>
        <ul>
          <li>Using the Service for cheating, plagiarism, or academic dishonesty</li>
          <li>Attempting to manipulate, exploit, or reverse-engineer the AI system</li>
          <li>Uploading or generating harmful, abusive, or illegal content</li>
          <li>Using the Service for commercial purposes without authorization</li>
          <li>Attempting to disrupt or overload the Service infrastructure</li>
          <li>Impersonating others or providing false information</li>
          <li>Violating applicable local, national, or international laws</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>The GehlotAI name, logo, interface design, and underlying technology are owned by GehlotAI. You retain full ownership of any content, questions, and data you submit through the Service.</p>
        <p>By submitting content, you grant GehlotAI a limited license to process, store, and display that content solely for the purpose of providing the Service to you. We do not claim ownership of your educational materials or questions.</p>

        <h2>6. Privacy & Data Security</h2>
        <p>We take your privacy seriously. All chat conversations are encrypted in transit and at rest using industry-standard protocols. Key privacy commitments:</p>
        <ul>
          <li>We do not sell or share your personal information with third parties</li>
          <li>Chat conversations are stored securely and are only accessible to you</li>
          <li>We collect minimal data needed to provide and improve the Service</li>
          <li>You can request deletion of your account and associated data at any time</li>
          <li>We comply with COPPA (Children's Online Privacy Protection Act) requirements</li>
          <li>Anonymized, aggregated data may be used to improve AI accuracy</li>
        </ul>

        <h2>7. AI Accuracy & Limitations</h2>
        <p>While we strive for accuracy, AI-generated content may occasionally contain errors, omissions, or inaccuracies. Important limitations:</p>
        <ul>
          <li>AI responses should be verified with trusted educational sources</li>
          <li>The Service may not cover every topic or question with equal depth</li>
          <li>Complex or ambiguous questions may receive incomplete answers</li>
          <li>The AI does not have access to real-time current events after its training cutoff</li>
          <li>Users should exercise critical thinking when evaluating AI responses</li>
        </ul>
        <p>GehlotAI is a learning aid, not a replacement for teachers, textbooks, or formal education.</p>

        <h2>8. Third-Party Links</h2>
        <p>The Service may contain links to third-party websites or resources. We are not responsible for the content, privacy practices, or availability of these external sites. Use them at your own discretion.</p>

        <h2>9. Limitation of Liability</h2>
        <p>GehlotAI and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. This includes, but is not limited to, academic performance, loss of data, or any other claim related to the Service.</p>
        <p>The Service is provided "as is" without warranty of any kind, either express or implied.</p>

        <h2>10. Termination</h2>
        <p>We reserve the right to modify, suspend, or terminate the Service (or your access to it) at any time, with or without notice, for any reason including violation of these terms. Upon termination, your right to use the Service ceases immediately.</p>

        <h2>11. Modifications to Terms</h2>
        <p>We may update these Terms and Conditions from time to time. Material changes will be notified via email or through the Service. Continued use after changes constitutes acceptance of the new terms. We recommend reviewing this page periodically.</p>

        <h2>12. Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.</p>

        <h2>13. Contact Information</h2>
        <p>For questions, concerns, or requests regarding these terms, please contact us:</p>
        <ul>
          <li>Email: support@GehlotAI.com</li>
          <li>Response time: Within 48 hours</li>
        </ul>

        <div className="terms-date">Last updated: June 17, 2026</div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '32px' }}><Link to="/auth" className="btn btn-primary">I Agree — Start Learning</Link></div>
    </div>
  );
}
