import { Router } from 'express';
import {
  createCourse,
  listStudents,
  upsertAttendance,
  upsertGrade
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();
router.use(protect, authorize('admin'));
router.get('/students', listStudents);
router.post('/attendance', upsertAttendance);
router.post('/grades', upsertGrade);
router.post('/courses', createCourse);

export default router;
