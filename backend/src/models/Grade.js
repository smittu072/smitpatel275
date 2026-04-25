import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    marksObtained: { type: Number, required: true },
    totalMarks: { type: Number, default: 100 },
    gradePoint: { type: Number, min: 0, max: 10 }
  },
  { timestamps: true }
);

export default mongoose.model('Grade', gradeSchema);
