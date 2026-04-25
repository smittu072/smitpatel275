import { Router } from 'express';
import {
  getAttendance,
  getCourses,
  getDashboard,
  getGrades,
  updateProfile
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.use(protect, authorize('student'));
router.get('/dashboard', getDashboard);
router.get('/attendance', getAttendance);
router.get('/grades', getGrades);
router.get('/courses', getCourses);
router.put('/profile', upload.single('profilePicture'), updateProfile);

export default router;
