import { createClient } from '@supabase/supabase-js';
import { createChat, getChatsByUser, getChatById, addMessage, deleteChat, shareChat, getChatByShareId, updateChatTitle } from '../models/chat.js';
import { getMistralStream } from '../mistral.js';

const SUPABASE_URL = 'https://youqjafjfzmapivijroh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXFqYWZqZnptYXBpdmlqcm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MDMxNTEsImV4cCI6MjA5NzI3OTE1MX0.SZTuSoTDywIoLlh0BGLR-EVX5LSG5KBOeR6QM-GzHIU';

const publicSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function listChats(req, res) {
  try {
    const userChats = await getChatsByUser(req.userId, req.supabase);
    res.json({ chats: userChats });
  } catch { res.status(500).json({ error: 'Failed to load chats' }); }
}

export async function newChat(req, res) {
  try {
    const chat = await createChat(req.userId, req.body.title, req.supabase);
    res.json({ chat });
  } catch { res.status(500).json({ error: 'Failed to create chat' }); }
}

export async function getChat(req, res) {
  try {
    const chat = await getChatById(req.params.id, req.supabase);
    if (!chat || chat.userId !== req.userId) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.json({ chat });
  } catch { res.status(500).json({ error: 'Failed to load chat' }); }
}

export async function sendMessage(req, res) {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }
  let chat = await getChatById(req.params.id, req.supabase);
  if (!chat || chat.userId !== req.userId) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  await addMessage(req.params.id, 'user', message, req.supabase);
  if (chat.messages.length === 0 && chat.title === 'New Chat') {
    await updateChatTitle(req.params.id, message.slice(0, 50) + (message.length > 50 ? '...' : ''), req.supabase);
    chat.title = message.slice(0, 50) + (message.length > 50 ? '...' : '');
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    chat = await getChatById(req.params.id, req.supabase);
    const contextMessages = chat.messages.map(m => ({ role: m.role, content: m.content }));
    const fullContent = [];

    for await (const token of getMistralStream(contextMessages)) {
      fullContent.push(token);
      res.write(`data: ${JSON.stringify({ token })}\n\n`);
    }

    await addMessage(req.params.id, 'assistant', fullContent.join(''), req.supabase);
    res.write(`data: ${JSON.stringify({ done: true, chatId: req.params.id })}\n\n`);
  } catch (err) {
    console.error('Mistral streaming error:', err);
    await addMessage(req.params.id, 'assistant', 'Sorry, I had trouble processing that. Please try again.', req.supabase);
    res.write(`data: ${JSON.stringify({ done: true, chatId: req.params.id })}\n\n`);
  }
  res.end();
}

export async function removeChat(req, res) {
  try {
    const deleted = await deleteChat(req.params.id, req.userId, req.supabase);
    if (!deleted) return res.status(404).json({ error: 'Chat not found' });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Failed to delete chat' }); }
}

export async function shareChatHandler(req, res) {
  try {
    const shareId = await shareChat(req.params.id, req.userId, req.supabase);
    if (!shareId) return res.status(404).json({ error: 'Chat not found' });
    res.json({ shareId, shareUrl: `${req.protocol}://${req.get('host')}/api/chat/shared/${shareId}` });
  } catch { res.status(500).json({ error: 'Failed to share chat' }); }
}

export async function getSharedChat(req, res) {
  try {
    const chat = await getChatByShareId(req.params.shareId, publicSupabase);
    if (!chat) return res.status(404).json({ error: 'Shared chat not found' });
    res.json({ chat });
  } catch { res.status(500).json({ error: 'Failed to load shared chat' }); }
}
