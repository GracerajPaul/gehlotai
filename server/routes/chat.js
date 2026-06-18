import { Router } from 'express';
import { listChats, newChat, getChat, sendMessage, removeChat, shareChatHandler, getSharedChat } from '../controllers/chatController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, listChats);
router.post('/', authMiddleware, newChat);
router.get('/shared/:shareId', getSharedChat);
router.get('/:id', authMiddleware, getChat);
router.post('/:id/message', authMiddleware, sendMessage);
router.delete('/:id', authMiddleware, removeChat);
router.post('/:id/share', authMiddleware, shareChatHandler);

export default router;
