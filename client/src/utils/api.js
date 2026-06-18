import { supabase } from './supabase.js';

const BASE = (import.meta.env.VITE_API_URL || '') + '/api';

async function getToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
}

async function request(path, options = {}) {
  const token = await getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function sendMessageStream(chatId, message, onToken, onDone) {
  const token = await getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}/chat/${chatId}/message`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Stream failed' }));
    throw new Error(err.error || 'Stream failed');
  }

  if (!res.body) throw new Error('Response has no body');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.token) onToken(data.token);
            if (data.done) onDone(data);
          } catch { /* skip malformed */ }
        }
      }
    }
  } finally {
    reader.cancel().catch(() => {});
  }
}

export const chatApi = {
  list: () => request('/chat'),
  create: (title) => request('/chat', { method: 'POST', body: JSON.stringify({ title }) }),
  get: (id) => request(`/chat/${id}`),
  delete: (id) => request(`/chat/${id}`, { method: 'DELETE' }),
  share: (id) => request(`/chat/${id}/share`, { method: 'POST' }),
  getShared: (shareId) => request(`/chat/shared/${shareId}`),
};

export const profile = {
  get: () => request('/profile'),
  update: (body) => request('/profile', { method: 'PUT', body: JSON.stringify(body) }),
};
