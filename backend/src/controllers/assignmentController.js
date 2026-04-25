import Assignment from '../models/Assignment.js';

export async function createAssignment(req, res) {
  const assignment = await Assignment.create({
    ...req.body,
    createdBy: req.user._id
  });

  res.status(201).json(assignment);
}

export async function listAssignments(req, res) {
  const assignments = await Assignment.find().sort({ dueDate: 1 });

  const data = assignments.map((a) => {
    const submission = a.submissions.find((s) => s.student.toString() === req.user._id.toString());
    return {
      ...a.toObject(),
      submitted: Boolean(submission),
      submissionStatus: submission?.status || 'pending'
    };
  });

  res.json(data);
}

export async function submitAssignment(req, res) {
  if (!req.file) return res.status(400).json({ message: 'Assignment file required' });

  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

  const existing = assignment.submissions.find(
    (s) => s.student.toString() === req.user._id.toString()
  );

  if (existing) {
    existing.fileUrl = `/uploads/${req.file.filename}`;
    existing.submittedAt = new Date();
    existing.status = 'resubmitted';
  } else {
    assignment.submissions.push({
      student: req.user._id,
      fileUrl: `/uploads/${req.file.filename}`
    });
  }

  await assignment.save();
  res.json({ message: 'Submission uploaded', assignment });
}
