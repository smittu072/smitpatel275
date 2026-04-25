import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Course from './models/Course.js';
import Attendance from './models/Attendance.js';
import Grade from './models/Grade.js';
import Announcement from './models/Announcement.js';

dotenv.config();
await connectDB(process.env.MONGO_URI);

await Promise.all([
  User.deleteMany({}),
  Course.deleteMany({}),
  Attendance.deleteMany({}),
  Grade.deleteMany({}),
  Announcement.deleteMany({})
]);

const admin = await User.create({
  name: 'Admin User',
  email: 'admin@studentportal.com',
  password: 'Admin@123',
  role: 'admin'
});

const student = await User.create({
  name: 'John Student',
  email: 'student@studentportal.com',
  password: 'Student@123',
  role: 'student',
  studentId: 'STU2026001',
  course: 'B.Tech Computer Science',
  semester: 6
});

await Course.create({
  name: 'B.Tech Computer Science',
  department: 'Engineering',
  semester: 6,
  subjects: [
    { code: 'CS601', name: 'Machine Learning', instructor: 'Dr. Mehta', credits: 4 },
    { code: 'CS602', name: 'Cloud Computing', instructor: 'Prof. Shah', credits: 3 }
  ]
});

await Attendance.insertMany([
  { student: student._id, subjectCode: 'CS601', totalClasses: 40, attendedClasses: 34 },
  { student: student._id, subjectCode: 'CS602', totalClasses: 38, attendedClasses: 33 }
]);

await Grade.insertMany([
  { student: student._id, subjectCode: 'CS601', subjectName: 'Machine Learning', marksObtained: 86, gradePoint: 8.6 },
  { student: student._id, subjectCode: 'CS602', subjectName: 'Cloud Computing', marksObtained: 91, gradePoint: 9.1 }
]);

await Announcement.create({
  title: 'Mid-Sem Exams',
  message: 'Mid-sem exams start next Monday. Check exam portal for schedule.',
  audience: 'student',
  createdBy: admin._id
});

console.log('Seed data inserted');
process.exit(0);
