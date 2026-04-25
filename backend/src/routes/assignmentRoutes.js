import { Router } from 'express';
import {
  createAssignment,
  listAssignments,
  submitAssignment
} from '../controllers/assignmentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.use(protect);
router.get('/', listAssignments);
router.post('/', authorize('admin'), createAssignment);
router.post('/:id/submit', authorize('student'), upload.single('assignment'), submitAssignment);

export default router;
