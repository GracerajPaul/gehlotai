import { supabase } from '../supabase.js';

export function getMe(req, res) {
  const { user } = req;
  res.json({ user: { id: user.id, email: user.email, ...user.user_metadata } });
}
