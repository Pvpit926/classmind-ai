import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  generateWithAI,
  submitAssessment,
  getMyResults
} from '../controllers/assessmentController.js';

const router = Router();

// Apply auth middleware to all assessment routes
router.use(authenticate);

router.get('/', getAssessments);
router.get('/my/results', getMyResults);
router.get('/:id', getAssessmentById);
router.post('/', createAssessment);
router.put('/:id', updateAssessment);
router.post('/generate', generateWithAI);
router.post('/:id/submit', submitAssessment);

export default router;
