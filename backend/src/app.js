import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/admin', adminRoutes);

export default app;
