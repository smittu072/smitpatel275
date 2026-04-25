import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subjectCode: { type: String, required: true },
    description: String,
    dueDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    submissions: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fileUrl: { type: String, required: true },
        submittedAt: { type: Date, default: Date.now },
        status: { type: String, default: 'submitted' }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Assignment', assignmentSchema);
