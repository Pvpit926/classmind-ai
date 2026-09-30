import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { generateAssessment, generateRecommendations } from '../controllers/aiController.js';

const router = Router();

router.use(authenticate);

router.post('/generate-assessment', generateAssessment);
router.post('/generate-recommendations', generateRecommendations);

export default router;
