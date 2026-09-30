import { Router } from 'express';
import { authenticate, authorizeRole } from '../middleware/auth.js';
import { getTeacherAnalytics } from '../controllers/teacherController.js';

const router = Router();

router.use(authenticate);
// Assuming authorizeRole checks for 'teacher' role in token/header
router.use(authorizeRole('teacher'));

router.get('/analytics', getTeacherAnalytics);

export default router;
