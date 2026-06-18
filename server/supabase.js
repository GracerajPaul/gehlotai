import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://youqjafjfzmapivijroh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXFqYWZqZnptYXBpdmlqcm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MDMxNTEsImV4cCI6MjA5NzI3OTE1MX0.SZTuSoTDywIoLlh0BGLR-EVX5LSG5KBOeR6QM-GzHIU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
