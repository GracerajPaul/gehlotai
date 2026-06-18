import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import profileRoutes from './routes/profile.js';

const app = express();
const PORT = 7890;

const allowedOrigins = [
  'http://localhost:5173',
  'https://gehlotai.vercel.app',
  process.env.ORIGIN,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/profile', profileRoutes);

app.listen(PORT, () => {
  console.log(`GehlotAI server running on port ${PORT}`);
});
