import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

// AI 추천 프로그램
router.post('/recommendations', authenticateJWT, async (req, res) => {
  try {
    const { preferences, location, budget } = req.body;

    // AI 추천 로직 (예시)
    const recommendations = [
      {
        id: '1',
        title: 'Morning Yoga Class',
        score: 0.95,
        reason: 'Based on your preference for wellness activities'
      },
      {
        id: '2',
        title: 'Photography Workshop',
        score: 0.87,
        reason: 'Matches your creative interests'
      }
    ];

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get recommendations' });
  }
});

// 챗봇 대화
router.post('/chat', authenticateJWT, async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // AI 챗봇 응답 로직
    const response = {
      message: `I understand you're asking about: "${message}". How can I help you find the right program?`,
      sessionId: sessionId || `session_${Date.now()}`,
      suggestions: [
        'Show me yoga classes',
        'Find cooking workshops',
        'What\'s available this weekend?'
      ]
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Chat service unavailable' });
  }
});

export default router;
