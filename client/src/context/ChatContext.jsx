import React, { createContext, useContext, useState, useCallback } from 'react';
import { chatApi, sendMessageStream } from '../utils/api.js';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadChats = useCallback(async () => {
    try {
      const data = await chatApi.list();
      setChats(data.chats);
    } catch { /* ignore */ }
  }, []);

  const createChat = useCallback(async (title) => {
    const data = await chatApi.create(title);
    setChats(prev => [data.chat, ...prev]);
    setActiveChat(data.chat);
    return data.chat;
  }, []);

  const selectChat = useCallback(async (id) => {
    const data = await chatApi.get(id);
    setActiveChat(data.chat);
    return data.chat;
  }, []);

  const sendMessage = useCallback(async (chatId, message) => {
    setLoading(true);
    const placeholderId = 'streaming-' + Date.now();
    const ts = new Date().toISOString();
    const assistantMsg = { id: placeholderId, role: 'assistant', content: '', timestamp: ts };

    setActiveChat(prev => {
      if (!prev) return prev;
      const updated = { ...prev, messages: [...prev.messages, { id: crypto.randomUUID(), role: 'user', content: message, timestamp: ts }, assistantMsg] };
      return updated;
    });

    let fullContent = '';

    try {
      await sendMessageStream(chatId, message,
        (token) => {
          fullContent += token;
          setActiveChat(prev => {
            if (!prev) return prev;
            const msgs = [...prev.messages];
            const idx = msgs.findIndex(m => m.id === placeholderId);
            if (idx !== -1) msgs[idx] = { ...msgs[idx], content: fullContent };
            return { ...prev, messages: msgs };
          });
        },
        (data) => {
          setActiveChat(prev => {
            if (!prev) return prev;
            const msgs = prev.messages.filter(m => m.id !== placeholderId);
            return { ...prev, messages: msgs };
          });
          chatApi.get(chatId).then(d => {
            setActiveChat(d.chat);
            setChats(prev => prev.map(c => c.id === chatId ? d.chat : c));
          }).catch(() => {});
        }
      );
    } catch {
      setActiveChat(prev => {
        if (!prev) return prev;
        const msgs = prev.messages.map(m => m.id === placeholderId ? { ...m, content: 'Sorry, I had trouble with that. Please try again.' } : m);
        return { ...prev, messages: msgs };
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteChat = useCallback(async (chatId) => {
    await chatApi.delete(chatId);
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (activeChat?.id === chatId) setActiveChat(null);
  }, [activeChat]);

  const shareChat = useCallback(async (chatId) => {
    const data = await chatApi.share(chatId);
    return data;
  }, []);

  return (
    <ChatContext.Provider value={{
      chats, activeChat, loading,
      setChats, setActiveChat,
      loadChats, createChat, selectChat, sendMessage, deleteChat, shareChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
