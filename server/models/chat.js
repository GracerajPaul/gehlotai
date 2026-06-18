export async function createChat(userId, title, supabase) {
  const { data, error } = await supabase
    .from('chats')
    .insert({ user_id: userId, title: title || 'New Chat', messages: [] })
    .select()
    .single();
  if (error) throw new Error('Failed to create chat');
  return formatChat(data);
}

export async function getChatsByUser(userId, supabase) {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  if (error) return [];
  return data.map(formatChat);
}

export async function getChatById(chatId, supabase) {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('id', chatId)
    .single();
  if (error || !data) return null;
  return formatChat(data);
}

export async function addMessage(chatId, role, content, supabase) {
  const chat = await getChatById(chatId, supabase);
  if (!chat) return null;
  const message = { id: crypto.randomUUID(), role, content, timestamp: new Date().toISOString() };
  const messages = [...chat.messagesRaw, message];
  const { data, error } = await supabase
    .from('chats')
    .update({ messages, updated_at: new Date().toISOString() })
    .eq('id', chatId)
    .select()
    .single();
  if (error) return null;
  return message;
}

export async function deleteChat(chatId, userId, supabase) {
  const { error } = await supabase
    .from('chats')
    .delete()
    .eq('id', chatId)
    .eq('user_id', userId);
  return !error;
}

export async function shareChat(chatId, userId, supabase) {
  const shareId = crypto.randomUUID().slice(0, 8);
  const { data, error } = await supabase
    .from('chats')
    .update({ shared: true, share_id: shareId })
    .eq('id', chatId)
    .eq('user_id', userId)
    .select()
    .single();
  if (error) return null;
  return shareId;
}

export async function getChatByShareId(shareId, supabase) {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('share_id', shareId)
    .eq('shared', true)
    .single();
  if (error || !data) return null;
  return formatChat(data);
}

export async function updateChatTitle(chatId, title, supabase) {
  const { data, error } = await supabase
    .from('chats')
    .update({ title, updated_at: new Date().toISOString() })
    .eq('id', chatId)
    .select()
    .single();
  if (error) return null;
  return formatChat(data);
}

function formatChat(row) {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    messages: (row.messages || []).map(m => ({
      id: m.id,
      role: m.role,
      content: m.content,
      timestamp: m.timestamp,
    })),
    messagesRaw: row.messages || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    shared: row.shared,
    shareId: row.share_id,
  };
}
