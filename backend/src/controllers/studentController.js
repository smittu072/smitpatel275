import Attendance from '../models/Attendance.js';
import Grade from '../models/Grade.js';
import Announcement from '../models/Announcement.js';
import Course from '../models/Course.js';
import User from '../models/User.js';

function computeAttendanceSummary(records) {
  const summary = records.map((r) => ({
    subjectCode: r.subjectCode,
    attendedClasses: r.attendedClasses,
    totalClasses: r.totalClasses,
    percentage: r.totalClasses ? (r.attendedClasses / r.totalClasses) * 100 : 0
  }));

  const overall =
    summary.reduce((acc, s) => acc + s.percentage, 0) / (summary.length || 1);

  return { summary, overall };
}

function computeGradeSummary(grades) {
  const detailed = grades.map((g) => ({
    subjectCode: g.subjectCode,
    subjectName: g.subjectName,
    marksObtained: g.marksObtained,
    totalMarks: g.totalMarks,
    percentage: (g.marksObtained / g.totalMarks) * 100,
    gradePoint: g.gradePoint ?? Number((((g.marksObtained / g.totalMarks) * 10).toFixed(2)))
  }));

  const gpa =
    detailed.reduce((acc, g) => acc + g.gradePoint, 0) / (detailed.length || 1);
  const percentage =
    detailed.reduce((acc, g) => acc + g.percentage, 0) / (detailed.length || 1);

  return { detailed, gpa: Number(gpa.toFixed(2)), percentage: Number(percentage.toFixed(2)) };
}

export async function getDashboard(req, res) {
  const studentId = req.user._id;
  const [student, attendance, grades, announcements, courses] = await Promise.all([
    User.findById(studentId),
    Attendance.find({ student: studentId }),
    Grade.find({ student: studentId }),
    Announcement.find({ audience: { $in: ['all', 'student'] } }).sort({ createdAt: -1 }).limit(5),
    Course.find({ name: req.user.course, semester: req.user.semester })
  ]);

  return res.json({
    profile: student,
    attendance: computeAttendanceSummary(attendance),
    grades: computeGradeSummary(grades),
    announcements,
    courses
  });
}

export async function updateProfile(req, res) {
  const updates = { ...req.body };
  if (req.file) {
    updates.profilePicture = `/uploads/${req.file.filename}`;
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true
  });

  res.json(user);
}

export async function getAttendance(req, res) {
  const data = await Attendance.find({ student: req.user._id });
  res.json(computeAttendanceSummary(data));
}

export async function getGrades(req, res) {
  const data = await Grade.find({ student: req.user._id });
  res.json(computeGradeSummary(data));
}

export async function getCourses(req, res) {
  const courses = await Course.find({ name: req.user.course, semester: req.user.semester });
  res.json(courses);
}
