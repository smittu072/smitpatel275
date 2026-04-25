import User from '../models/User.js';
import Attendance from '../models/Attendance.js';
import Grade from '../models/Grade.js';
import Course from '../models/Course.js';

export async function listStudents(req, res) {
  const students = await User.find({ role: 'student' }).sort({ createdAt: -1 });
  res.json(students);
}

export async function upsertAttendance(req, res) {
  const { student, subjectCode, totalClasses, attendedClasses } = req.body;
  const record = await Attendance.findOneAndUpdate(
    { student, subjectCode },
    { totalClasses, attendedClasses },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json(record);
}

export async function upsertGrade(req, res) {
  const { student, subjectCode, subjectName, marksObtained, totalMarks, gradePoint } = req.body;
  const grade = await Grade.findOneAndUpdate(
    { student, subjectCode },
    { subjectName, marksObtained, totalMarks, gradePoint },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json(grade);
}

export async function createCourse(req, res) {
  const course = await Course.create(req.body);
  res.status(201).json(course);
}
