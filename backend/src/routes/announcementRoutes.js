import { Router } from 'express';
import { createAnnouncement, listAnnouncements } from '../controllers/announcementController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();
router.use(protect);
router.get('/', listAnnouncements);
router.post('/', authorize('admin'), createAnnouncement);

export default router;
