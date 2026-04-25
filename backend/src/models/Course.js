import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    credits: { type: Number, default: 3 }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    subjects: [subjectSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
