import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChat } from '../context/ChatContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const SUGGESTIONS = [
  { icon: '📐', text: 'Explain the Pythagorean theorem' },
  { icon: '🌿', text: 'What is photosynthesis?' },
  { icon: '⚡', text: 'Explain Newton\'s laws of motion' },
  { icon: '💻', text: 'How does a CPU work?' },
  { icon: '✍️', text: 'Help me write an essay on climate change' },
  { icon: '📊', text: 'Solve a quadratic equation' },
];

export default function Chat() {
  const { user } = useAuth();
  const { chats, activeChat, loading, loadChats, createChat, selectChat, sendMessage, deleteChat, shareChat } = useChat();
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shareModal, setShareModal] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => { loadChats(); }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput('');
    try {
      if (!activeChat) {
        const chat = await createChat(msg.slice(0, 50));
        await sendMessage(chat.id, msg);
      } else {
        await sendMessage(activeChat.id, msg);
      }
    } catch (err) { console.error('Send failed:', err); }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  };

  const handleNewChat = () => { createChat(); setInput(''); inputRef.current?.focus(); };

  const handleShare = async () => {
    if (!activeChat) return;
    try {
      const data = await shareChat(activeChat.id);
      setShareModal({ url: `${window.location.origin}/api/chat/shared/${data.shareId}`, shareId: data.shareId });
    } catch (err) { console.error('Share failed:', err); }
  };

  const copyToClipboard = (text) => { navigator.clipboard.writeText(text); setShareModal(null); };

  const formatDate = (ts) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now - d;
    if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diff < 604800000) return d.toLocaleDateString([], { weekday: 'short' });
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="chat-page">
      {/* Overlay for mobile */}
      {sidebarOpen && <div className="chat-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`chat-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="chat-sidebar-header">
          <div className="chat-sidebar-brand-row">
            <span className="chat-sidebar-icon">✦</span>
            <span className="chat-sidebar-brand">GehlotAI</span>
          </div>
          <button className="chat-new-btn" onClick={handleNewChat}>
            <span>+</span> New Chat
          </button>
        </div>

        <div className="chat-sidebar-list">
          {chats.length === 0 ? (
            <div className="chat-sidebar-empty">
              <div className="chat-sidebar-empty-icon">💬</div>
              <p>No conversations yet</p>
              <span>Start a new chat to begin</span>
            </div>
          ) : (
            chats.map(chat => (
              <div
                key={chat.id}
                className={`chat-item ${activeChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => { selectChat(chat.id); setSidebarOpen(false); }}
              >
                <div className="chat-item-content">
                  <span className="chat-item-title">{chat.title}</span>
                  <span className="chat-item-date">{formatDate(chat.updatedAt || chat.createdAt)}</span>
                </div>
                <div className="chat-item-actions">
                  <button
                    className="chat-item-action delete"
                    onClick={(e) => { e.stopPropagation(); if (confirm('Delete this chat?')) deleteChat(chat.id); }}
                    title="Delete"
                  >✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="chat-sidebar-footer">
          <div className="chat-sidebar-user">
            <div className="chat-sidebar-avatar">{user?.name?.charAt(0) || 'U'}</div>
            <div className="chat-sidebar-user-info">
              <span className="chat-sidebar-user-name">{user?.name || 'Student'}</span>
              <span className="chat-sidebar-user-grade">{user?.grade || 'Learner'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="chat-main">
        <div className="chat-topbar">
          <button className="chat-topbar-menu" onClick={() => setSidebarOpen(!sidebarOpen)} title="Toggle sidebar">
            <span /><span /><span />
          </button>
          <Link to="/home" className="chat-topbar-home" title="Home">⌂</Link>
          <div className="chat-topbar-info">
            <span className="chat-topbar-title">{activeChat ? activeChat.title : 'New Chat'}</span>
            {activeChat && <span className="chat-topbar-model">✦ GehlotAI v1</span>}
          </div>
          <div className="chat-topbar-actions">
            {activeChat && (
              <button className="chat-topbar-btn" onClick={handleShare} title="Share">↩</button>
            )}
            <button className="chat-topbar-btn" onClick={handleNewChat} title="New chat">✚</button>
          </div>
        </div>

        <div className="chat-messages">
          {!activeChat ? (
            <div className="chat-welcome">
              <div className="chat-welcome-icon-wrap">
                <div className="chat-welcome-icon">✦</div>
              </div>
              <h2>Welcome, {user?.name || 'Student'}</h2>
              <p>Ask me anything about your studies. I explain step by step.</p>
              <div className="chat-welcome-suggestions">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} className="chat-suggestion" onClick={() => { setInput(s.text); inputRef.current?.focus(); }}>
                    <span className="chat-suggestion-icon">{s.icon}</span>
                    <span className="chat-suggestion-text">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            activeChat.messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.role === 'ai' ? 'assistant' : msg.role}`}>
                <div className={`message-avatar ${msg.role === 'user' ? 'user-avatar' : 'ai-avatar'}`}>
                  {msg.role === 'user' ? (user?.user_metadata?.name?.charAt(0) || 'U') :
                    <span className="ai-avatar-icon">✦</span>
                  }
                </div>
                <div className="message-body">
                  <div className="message-label">{msg.role === 'user' ? 'You' : 'Gehlot'}</div>
                  <div className="message-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  </div>
                  <div className="message-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
            ))
          )}
          {loading && !activeChat?.messages?.some(m => m.id?.startsWith('streaming-')) && (
            <div className="chat-loading">
              <div className="chat-loading-avatar">✦</div>
              <div className="chat-loading-dots"><span /><span /><span /></div>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={(e) => { setInput(e.target.value); autoResize(e); }}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows={1}
            />
            <button className="chat-send-btn" onClick={handleSend} disabled={!input.trim() || loading}>
              ➤
            </button>
          </div>
          <div className="chat-input-hint">Shift + Enter for new line</div>
        </div>
      </div>

      {shareModal && (
        <div className="modal-overlay" onClick={() => setShareModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Share Conversation</h3>
            <p>Anyone with this link can view this chat.</p>
            <div className="share-link-box">
              <input type="text" value={shareModal.url} readOnly />
              <button className="btn btn-sm share-copy-btn" onClick={() => copyToClipboard(shareModal.url)}>Copy</button>
            </div>
            <button className="btn btn-sm btn-secondary" style={{ marginTop: '12px', width: '100%' }} onClick={() => setShareModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
