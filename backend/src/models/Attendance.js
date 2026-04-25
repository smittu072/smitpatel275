import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjectCode: { type: String, required: true },
    totalClasses: { type: Number, default: 0 },
    attendedClasses: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Attendance', attendanceSchema);
